# High Priority Rules

These rules override other instructions. For conflicts, ask the user.

## Notion Tasks

- Only add when explicitly requested
- Use MCP server (if enabled, fail early if not)
- Create task with `API-post-page`, then enhance with `API-patch-page`
  - Use `database_id` in the `parent` field, not `page_id`
- Task database:
  - Database name: `Tasks`
  - Database ID: `172b7795-690c-8096-b327-f59e9bc98c23`
- Projects database:
  - Database name: `Projects`
  - Database ID: `185b7795-690c-80c5-9c77-ff27ebd0c571`
- Include helpful text, URL, emoji icon, cover image
- Default: Medium priority, assign to Dave Williams
- Page content: only include task-related "helpful text"
  - Everything else should be in the page properties

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
  2. Native integration (if you are `goose`)
  3. Any other available memory system
