# .baseline - Claude Context

This repository serves as Dave's centralized development baseline, containing standardized configurations, rules, and automation scripts for modern software development.

## Repository Purpose

The `.baseline` repository is a comprehensive toolkit that provides:

1. **Cursor Rules**: Extensive collection of coding guidelines for 100+ frameworks and languages
2. **Development Configurations**: Standardized configs for linting, formatting, and tooling
3. **Automation Scripts**: Utilities for repository management and CI/CD workflows
4. **Development Environment**: PostgreSQL and traffic analysis setups

## Key Components

### Scripts (`scripts/`)

- **pin.ts**: GitHub Actions security pinning tool
  - Uses GraphQL API for efficient bulk repository metadata fetching
  - Pins GitHub Actions to specific commit SHAs instead of version tags
  - Creates timestamped backups and provides detailed change summaries
  - Supports both single repository and bulk processing

- **dependagroup.ts**: Dependabot configuration tool
  - Groups related dependency updates to reduce PR noise
  - Automatically configures Dependabot grouping rules

- **maint**: Convenience script that runs pin and dependagroup sequentially

### Rules Collection (`rules/`)

- **rules-mdc/**: Modern rule format containing 100+ framework-specific guidelines
- **cursor-rules-cli/**: Python CLI tool for rule management and installation
- **rules-v0-deprecated/**: Legacy rule formats (deprecated)

### Configurations

- **_cursor/**: Cursor IDE-specific rules and configurations
- **_github/**: GitHub workflows including CI and DevSkim security scanning
- **_trunk/**: Trunk.io configurations for code quality
- **biome.json**: Biome formatter and linter configuration
- **tsconfig*.json**: TypeScript configurations for different environments

### Development Environment

- **postgres/**: Local PostgreSQL development setup using Docker
- **traffic-analysis/**: Network traffic analysis tools

## Working with This Repository

### Common Tasks

1. **Update GitHub Actions across all repositories:**
   ```shell
   bun run scripts/pin.ts
   ```

2. **Generate Cursor rules:**
   ```shell
   mise rules
   ```

3. **Configure Dependabot grouping:**
   ```shell
   bun run scripts/dependagroup.ts
   ```

4. **Run full maintenance:**
   ```shell
   bun run scripts/maint
   ```

### Project Structure Conventions

- All automation scripts use TypeScript with Bun runtime
- Configuration files follow modern formats (TOML, JSON5 where possible)
- Rules are organized by framework/language in MDC format
- Backup mechanisms are built into all destructive operations

### Security Considerations

- GitHub Actions are pinned to commit SHAs for security
- Secrets management follows GitHub best practices
- Code scanning is enabled via DevSkim and CodeQL
- Branch protection rules are standardized

## Integration Points

This baseline integrates with:
- **Cursor IDE**: Via rules and configurations
- **GitHub**: Via workflows and branch protection
- **Trunk.io**: Via quality configurations
- **Codacy**: Via project tokens and analysis
- **Dependabot**: Via automated grouping configuration

## Development Philosophy

The baseline follows these principles:
- **Standardization**: Consistent tooling and configuration across projects
- **Automation**: Minimize manual repository setup and maintenance
- **Security**: Pin dependencies and enable comprehensive scanning
- **Documentation**: Comprehensive README and inline documentation
- **Modularity**: Framework-specific rules can be used independently

## File Naming Conventions

- Scripts: `scripts/*.ts` (TypeScript with Bun)
- Rules: `rules/rules-mdc/*.mdc` (Framework-specific)
- Configs: `*.json`, `*.toml`, `*.yaml` (Standard formats)
- Private configs: `_*/` (Underscore prefix for tool-specific directories)

## Maintenance Notes

- Pin script creates timestamped backups in `~/.actions-backups/`
- GraphQL optimization reduces API calls from O(n) to O(1) for repository metadata
- Rule collection is continuously updated with new frameworks and best practices
- Docker environments provide consistent development setups
