#!/usr/bin/env -S bun --enable-source-maps

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Function to generate timestamp string in YYYY-MM-DD_HH-MM-SS format
function getTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}
const MAX_CONCURRENCY = 5;

// Type definitions
interface ActionUpdate {
  actionPath: string;
  oldRef: string;
  newRef: string;
}

interface WorkflowUpdate {
  filePath: string;
  relativePath: string;
  updates: ActionUpdate[];
}

interface RepoUpdate {
  repoName: string;
  workflowUpdates: WorkflowUpdate[];
}

interface ProcessingSummary {
  repoUpdates: RepoUpdate[];
  errors: string[];
  totalReposProcessed: number;
  totalFilesProcessed: number;
  totalActionsUpdated: number;
}

// Concurrency limiter
class Semaphore {
  private permits: number;
  private waiting: Array<() => void> = [];

  constructor(count: number) {
    this.permits = count;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve();
    }
    return new Promise<void>(resolve => {
      this.waiting.push(resolve);
    });
  }

  release(): void {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift()!;
      resolve();
    } else {
      this.permits++;
    }
  }
}

// Main function to coordinate the entire process
async function main() {
  console.log('🔍 Finding repositories and updating GitHub Action workflows...');
  
  const currentDir = process.cwd();
  const homeDir = process.env.HOME || '~';
  const backupRoot = path.join(homeDir, '.actions-backups');
  
  // Ensure backup root directory exists
  if (!fs.existsSync(backupRoot)) {
    fs.mkdirSync(backupRoot, { recursive: true });
  }

  // Create timestamped directory for this run
  const timestamp = getTimestamp();
  const backupDir = path.join(backupRoot, timestamp);
  fs.mkdirSync(backupDir, { recursive: true });
  
  console.log(`🕒 Creating backups in timestamped directory: ${backupDir}`);
  
  const summary: ProcessingSummary = {
    repoUpdates: [],
    errors: [],
    totalReposProcessed: 0,
    totalFilesProcessed: 0,
    totalActionsUpdated: 0
  };
  
  // Find all repositories (directories with a .git folder)
  const dirEntries = fs.readdirSync(currentDir, { withFileTypes: true });
  const repoDirs = dirEntries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.') && 
             fs.existsSync(path.join(currentDir, entry.name, '.git')))
    .map(entry => entry.name);
  
  console.log(`Found ${repoDirs.length} repositories to process`);
  
  // Process each repository
  for (const repoName of repoDirs) {
    try {
      const repoPath = path.join(currentDir, repoName);
      const repoUpdate = await processRepository(repoName, repoPath, backupDir, summary);
      if (repoUpdate.workflowUpdates.length > 0) {
        summary.repoUpdates.push(repoUpdate);
      }
      summary.totalReposProcessed++;
    } catch (error) {
      summary.errors.push(`Error processing repository ${repoName}: ${error}`);
      console.error(`❌ Error processing repository ${repoName}:`, error);
    }
  }
  
  // Print summary
  printSummary(summary, backupDir);
}

// Process a single repository
async function processRepository(
  repoName: string, 
  repoPath: string, 
  backupDir: string, 
  summary: ProcessingSummary
): Promise<RepoUpdate> {
  console.log(`\n📁 Processing repository: ${repoName}`);
  console.log(`  🔄 Backups will be stored in: ${path.join(backupDir, repoName)}`);
  
  const repoUpdate: RepoUpdate = {
    repoName,
    workflowUpdates: []
  };
  
  // Find workflow files
  const workflowsDir = path.join(repoPath, '.github', 'workflows');
  if (!fs.existsSync(workflowsDir)) {
    console.log(`  No workflows directory found in ${repoName}`);
    return repoUpdate;
  }
  
  const workflowFiles: string[] = [];
  const dirEntries = fs.readdirSync(workflowsDir, { withFileTypes: true });
  
  for (const entry of dirEntries) {
    if (entry.isFile() && (entry.name.endsWith('.yml') || entry.name.endsWith('.yaml'))) {
      workflowFiles.push(path.join(workflowsDir, entry.name));
    }
  }
  
  if (workflowFiles.length === 0) {
    console.log(`  No workflow files found in ${repoName}`);
    return repoUpdate;
  }
  
  console.log(`  Found ${workflowFiles.length} workflow files`);
  
  // Create backup directory for this repository
  const repoBackupDir = path.join(backupDir, repoName, '.github', 'workflows');
  fs.mkdirSync(repoBackupDir, { recursive: true });
  
  // Process each workflow file
  const semaphore = new Semaphore(MAX_CONCURRENCY);
  const filePromises = workflowFiles.map(filePath => 
    processWorkflowFile(filePath, repoPath, backupDir, semaphore)
  );
  
  const workflowUpdates = await Promise.all(filePromises);
  const validUpdates = workflowUpdates.filter(update => update !== null) as WorkflowUpdate[];
  
  repoUpdate.workflowUpdates = validUpdates;
  summary.totalFilesProcessed += workflowFiles.length;
  summary.totalActionsUpdated += validUpdates.reduce((total, update) => total + update.updates.length, 0);
  
  return repoUpdate;
}

// Process a single workflow file
async function processWorkflowFile(
  filePath: string, 
  repoPath: string, 
  backupDir: string, 
  semaphore: Semaphore
): Promise<WorkflowUpdate | null> {
  const relativePath = path.relative(repoPath, filePath);
  const backupPath = path.join(backupDir, path.basename(repoPath), relativePath);
  
  try {
    // Create backup of the file
    const backupDir = path.dirname(backupPath);
    fs.mkdirSync(backupDir, { recursive: true });
    fs.copyFileSync(filePath, backupPath);
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Find and process action references
    const updates: ActionUpdate[] = [];
    let updatedContent = content;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const usesMatch = line.match(/^\s*uses:\s*([^#]+)/);
      
      if (usesMatch) {
        let actionRef = usesMatch[1].trim();
        
        // Skip Docker references and local references
        if (actionRef.startsWith('./') || actionRef.startsWith('docker://')) {
          continue;
        }
        
        // Check if reference contains a version/commit
        if (actionRef.includes('@')) {
          const [actionPath, oldRef] = actionRef.split('@');
          
          try {
            // Extract repo from action path (could be owner/repo or owner/repo/path)
            const repoPathParts = actionPath.split('/');
            if (repoPathParts.length < 2) continue; // Invalid reference
            
            const owner = repoPathParts[0];
            const repo = repoPathParts[1];
            const fullRepo = `${owner}/${repo}`;
            
            // Acquire semaphore before making GitHub API calls
            await semaphore.acquire();
            
            try {
              // Determine default branch
              let defaultBranch;
              try {
                const { stdout } = await execAsync(
                  `gh repo view ${fullRepo} --json defaultBranchRef -q .defaultBranchRef.name`
                );
                defaultBranch = stdout.trim();
              } catch (error) {
                // Fallback to 'main' or 'master'
                try {
                  const { stdout } = await execAsync(`gh api repos/${fullRepo}/branches/main`);
                  defaultBranch = 'main';
                } catch {
                  defaultBranch = 'master';
                }
              }
              
              // Get latest commit on default branch
              const { stdout } = await execAsync(
                `gh api repos/${fullRepo}/commits/${defaultBranch} --jq .sha`
              );
              const latestCommit = stdout.trim();
              
              // Update the action reference in the content
              const oldActionRef = `${actionPath}@${oldRef}`;
              const newActionRef = `${actionPath}@${latestCommit}`;
              updatedContent = updatedContent.replace(oldActionRef, newActionRef);
              
              updates.push({
                actionPath,
                oldRef,
                newRef: latestCommit
              });
              
              console.log(`  📌 Pinned ${actionPath} from ${oldRef} to ${latestCommit.substring(0, 8)}...`);
            } finally {
              // Release semaphore
              semaphore.release();
            }
          } catch (error) {
            semaphore.release();
            console.error(`  ❌ Failed to update ${actionPath}@${oldRef}:`, error);
          }
        }
      }
    }
    
    // Write updated content if there were changes
    if (updates.length > 0) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`  ✅ Updated ${relativePath} with ${updates.length} action references`);
      
      return {
        filePath,
        relativePath,
        updates
      };
    }
    
    return null;
  } catch (error) {
    console.error(`  ❌ Error processing ${relativePath}:`, error);
    return null;
  }
}

// Print summary of all changes
function printSummary(summary: ProcessingSummary, backupDir: string) {
  console.log('\n📊 Summary of GitHub Action Updates');
  console.log('===============================');
  console.log(`Repositories processed: ${summary.totalReposProcessed}`);
  console.log(`Workflow files processed: ${summary.totalFilesProcessed}`);
  console.log(`Action references updated: ${summary.totalActionsUpdated}`);
  console.log(`Backup location: ${backupDir}`);
  
  if (summary.repoUpdates.length > 0) {
    console.log('\n🔄 Changes made:');
    
    for (const repoUpdate of summary.repoUpdates) {
      console.log(`\n📁 Repository: ${repoUpdate.repoName}`);
      
      for (const workflowUpdate of repoUpdate.workflowUpdates) {
        console.log(`  📄 ${workflowUpdate.relativePath}`);
        
        for (const actionUpdate of workflowUpdate.updates) {
          console.log(`    - ${actionUpdate.actionPath}`);
          console.log(`      From: ${actionUpdate.oldRef}`);
          console.log(`      To:   ${actionUpdate.newRef}`);
        }
      }
    }
  } else {
    console.log('\n📝 No changes were made.');
  }
  
  if (summary.errors.length > 0) {
    console.log('\n❌ Errors:');
    for (const error of summary.errors) {
      console.log(`  - ${error}`);
    }
  }
}

// Run the main function
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

