# .baseline

## Working with the Baseline repo

Generate Cursor app-wide rules from the individual MDC files:

```shell
  mise rules
```

## Manual steps when creating a new repo

### Codacy

Add repo to Codacy.

Set `CODACY_PROJECT_TOKEN` in the repository secrets.

### Trunk

Add repo to Trunk.

### Code scanning

Enable CodeQL scanning and Dependabot.

### Branch protection

Set up new-style branch protection using `protect-main.json`
