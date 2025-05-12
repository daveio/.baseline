# High Priority Rules

These rules override other instructions. For conflicts, ask the user.

## Shell

- You are operating in the `fish` shell.
- Use `fish` syntax for any shell commands.
- Particularly of note:
  - Any `$` must be escaped
  - `bash`/`zsh` syntax differs heavily from `fish`

## Notion Tasks

- Only add when explicitly requested
- Use MCP server (if enabled, fail early if not)
- Database ID: `172b7795-690c-8096-b327-f59e9bc98c23`
- Create with `API-post-page`, then enhance with `API-patch-page`
  - Use `database_id` in the `parent` field, not `page_id`
- Include helpful text, URL, emoji icon, cover image
- Default: Medium priority, assign to Dave Williams

## Linear Tickets

- Only add when explicitly requested
- Use MCP server (if enabled, fail early if not)
- Set appropriate team, project, estimate based on content
- Default: Medium priority, assign to Dave Williams
- Include helpful information in content

## Memory

- Check memory before asking questions, stop after first answer
- Store important facts for future reference and check for them when answers are needed
- Access in order:
  1. Memory MCP server (if enabled)
  2. Any other available memory system
