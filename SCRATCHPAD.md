# Scratchpad

Commit test.

## `bumpinator`

Give me a Python project.

- We are in an empty directory which you can use for this project.
- It should use `uv` for package management.
- It should have attractive output using `rich`.
- Run `git init` at the beginning to set up a Git repo.
- Commit to `git` after each significant block of work.
  - Prefer to commit more often than less often.
- There are rules you can consult for more information and best practices.
  - They are available in `~/rules`.
  - I would suggest consulting `python.mdc` and `rich.mdc` up front.
  - Consult any others as you want or need.
  - Copy them into `$REPO/.cursor/rules/` for future use.
  - Cursor also provides you a native rules system, use that too.
- You can add any libraries you want.
  - I would prefer you added a library and used it, than did something manually.
  - You can use the `context7` MCP tool and the rules mentioned previously to find helpful packages, as well as any other source you know of.
- Before you start coding, set the project up according to my requests and the rules.
- Split this project into multiple files. I don't want any individual file gettings too big.
  - 50 lines is a good soft maximum to aim for.
  - There is no hard maximum.
- Set up the project with a library to give us a full CLI framework.
  - Use this library.

The script at the core of this project should do the following:

- Find out what version of languages (core packages, no colon, and asdf packages, prefix asdf:) I have installed with [mise](https://github.com/jdx/mise).
  - Read the `mise` documentation to understand how to use `mise`.
- Go through each subdirectory.
  - Find `mise.toml` files.
  - Find `package.json` files.
  - Find `Gemfile` files.
  - Find `pyproject.toml` files.
  - Find `.[language]-version` files.
  - Find `.tool-versions` files.
  - Find other package manager files.
    - You can scan my repos in `~/src/github.com/daveio` to get ideas.
- Update the package versions to the installed `mise` versions, using the syntax of the file.
  - Importantly, consider the `packageManager` and `engines` fields in `package.json` too.
  - Don't change the language specifier, just the version.
- Run associated regeneration tasks:
  - For `package.json`; use the `packageManager` to install, for example `bun install`.
  - For `Gemfile`; `bundle install && bundle update`
  - For `pyproject.toml`; `uv sync`
  - `.[language]-version` and `.tool-versions` files do not need a command.
  - Come up with a command along these lines for any other ecosystems you add.
- Find GitHub workflows:
  - `$REPO_ROOT/.github/workflows/*.yml` and `$REPO_ROOT/.github/workflows/*.yaml`
  - Fetch the hash of the latest commit on `main` (or `master` if `main` does not exist) for each of the actions used.
  - Update the action specifier to use this latest commit hash.
  - Replace any tag or existing commit hash.
- Update `dependabot` config:
  - Read `.github/dependabot.yml` if it exists
  - Scan the repository to get an idea of the ecosystems in use
  - Add any which are missing to `.github/dependabot.yml`
  - The ecosystems supported are listed at `https://docs.github.com/en/code-security/dependabot/ecosystems-supported-by-dependabot/supported-ecosystems-and-repositories`
  - If `node` and `bun` are in use on a repo, add `npm` **and** `bun`.
- Add a `--dry-run` / `-d` argument:
  - This should print all changes which will be made.
  - If `--verbose` / `-v` is specified, also print diffs.
- Add an `--info` / `-i` argument:
  - This should just tell me about changes which should be made.
  - If `--verbose` / `-v` is specified, also print diffs.
  - If `--ai` / `-a` is specified, format the output of `--info-only` as a prompt to AI to make the changes, in Markdown format.
- Add an `--output` / `-o` argument:
  - This should allow us to redirect output from `--info` to a file instead of the terminal.
- Add a full `--help` / `-h` argument.
- Add a full `--version` / `-V` argument.
  - Make it a capital `V` so we don't clash with verbose mode.
- Split the functionality into subcommands:
  - We should probably use a file per subcommand, unless the file gets too big.
  - For example, `SCRIPTNAME.py packages node` to process only NodeJS package data.
  - For example, `SCRIPTNAME.py packages` to process only packages (and not GitHub actions, etc.)
  - For example, `SCRIPTNAME.py actions` to process only GitHub actions.
  - For example, `SCRIPTNAME.py help` to display the same output as `--help` / `-h`.
  - For example, `SCRIPTNAME.py version` to display the same output as `--version` / `-v`.
  - For example, `SCRIPTNAME.py` to run everything.
- If you have any ideas, implement them as subcommands - we can always remove them later.
- Write documentation:
  - `README.md` for human reading.
  - `CLAUDE.md` for AI consumption to understand the project.
  - `PROMPT.md` for the prompt used to create this project, including:
    - The full prompt.
    - How it was interpreted.
    - Links to the implementation of each part of it.
    - Now you've written the code, is there anything you know now which would have been better to state up front?
      - Use that information to suggest a better prompt which would have helped you more up front.
    - I've included the full prompt below in case you don't have direct access to it.
- Set up metadata to prepare for publication to PyPI.
  - Do not publish.

Example `dependabot.yml` with two entries:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: daily
    assignees:
      - daveio
  - package-ecosystem: bun
    directory: /
    schedule:
      interval: daily
    assignees:
      - daveio
```

Full prompt which you were given:

```plaintext
Give me a Python project.

- We are in an empty directory which you can use for this project.
- It should use `uv` for package management.
- It should have attractive output using `rich`.
- Run `git init` at the beginning to set up a Git repo.
- Commit to `git` after each significant block of work.
  - Prefer to commit more often than less often.
- There are rules you can consult for more information and best practices.
  - They are available in `~/rules`.
  - I would suggest consulting `python.mdc` and `rich.mdc` up front.
  - Consult any others as you want or need.
  - Copy them into `$REPO/.cursor/rules/` for future use.
  - Cursor also provides you a native rules system, use that too.
- You can add any libraries you want.
  - I would prefer you added a library and used it, than did something manually.
  - You can use the `context7` MCP tool and the rules mentioned previously to find helpful packages, as well as any other source you know of.
- Before you start coding, set the project up according to my requests and the rules.
- Split this project into multiple files. I don't want any individual file gettings too big.
  - 50 lines is a good soft maximum to aim for.
  - There is no hard maximum.
- Set up the project with a library to give us a full CLI framework.
  - Use this library.

The script at the core of this project should do the following:

- Find out what version of languages (core packages, no colon, and asdf packages, prefix asdf:) I have installed with [mise](https://github.com/jdx/mise).
  - Read the `mise` documentation to understand how to use `mise`.
- Go through each subdirectory.
  - Find `mise.toml` files.
  - Find `package.json` files.
  - Find `Gemfile` files.
  - Find `pyproject.toml` files.
  - Find `.[language]-version` files.
  - Find `.tool-versions` files.
  - Find other package manager files.
    - You can scan my repos in `~/src/github.com/daveio` to get ideas.
- Update the package versions to the installed `mise` versions, using the syntax of the file.
  - Importantly, consider the `packageManager` and `engines` fields in `package.json` too.
  - Don't change the language specifier, just the version.
- Run associated regeneration tasks:
  - For `package.json`; use the `packageManager` to install, for example `bun install`.
  - For `Gemfile`; `bundle install && bundle update`
  - For `pyproject.toml`; `uv sync`
  - `.[language]-version` and `.tool-versions` files do not need a command.
  - Come up with a command along these lines for any other ecosystems you add.
- Find GitHub workflows:
  - `$REPO_ROOT/.github/workflows/*.yml` and `$REPO_ROOT/.github/workflows/*.yaml`
  - Fetch the hash of the latest commit on `main` (or `master` if `main` does not exist) for each of the actions used.
  - Update the action specifier to use this latest commit hash.
  - Replace any tag or existing commit hash.
- Update `dependabot` config:
  - Read `.github/dependabot.yml` if it exists
  - Scan the repository to get an idea of the ecosystems in use
  - Add any which are missing to `.github/dependabot.yml`
  - The ecosystems supported are listed at `https://docs.github.com/en/code-security/dependabot/ecosystems-supported-by-dependabot/supported-ecosystems-and-repositories`
  - If `node` and `bun` are in use on a repo, add `npm` **and** `bun`.
- Add a `--dry-run` / `-d` argument:
  - This should print all changes which will be made.
  - If `--verbose` / `-v` is specified, also print diffs.
- Add an `--info` / `-i` argument:
  - This should just tell me about changes which should be made.
  - If `--verbose` / `-v` is specified, also print diffs.
  - If `--ai` / `-a` is specified, format the output of `--info-only` as a prompt to AI to make the changes, in Markdown format.
- Add an `--output` / `-o` argument:
  - This should allow us to redirect output from `--info` to a file instead of the terminal.
- Add a full `--help` / `-h` argument.
- Add a full `--version` / `-V` argument.
  - Make it a capital `V` so we don't clash with verbose mode.
- Split the functionality into subcommands:
  - We should probably use a file per subcommand, unless the file gets too big.
  - For example, `SCRIPTNAME.py packages node` to process only NodeJS package data.
  - For example, `SCRIPTNAME.py packages` to process only packages (and not GitHub actions, etc.)
  - For example, `SCRIPTNAME.py actions` to process only GitHub actions.
  - For example, `SCRIPTNAME.py help` to display the same output as `--help` / `-h`.
  - For example, `SCRIPTNAME.py version` to display the same output as `--version` / `-v`.
  - For example, `SCRIPTNAME.py` to run everything.
- If you have any ideas, implement them as subcommands - we can always remove them later.
- Write documentation:
  - `README.md` for human reading.
  - `CLAUDE.md` for AI consumption to understand the project.
  - `PROMPT.md` for the prompt used to create this project, including:
    - The full prompt.
    - How it was interpreted.
    - Links to the implementation of each part of it.
    - Now you've written the code, is there anything you know now which would have been better to state up front?
      - Use that information to suggest a better prompt which would have helped you more up front.
    - I've included the full prompt below in case you don't have direct access to it.
- Set up metadata to prepare for publication to PyPI.
  - Do not publish.

Example `dependabot.yml` with two entries:

[snipped from here due to nested Markdown]

Full prompt which you were given:

[snipped from here due to recursion]

```

Give the project a validation pass. Explore the codebase thoroughly from base principles. Read any applicable rules. If anything should be changed, fixed, or improve, handle it.

- Create a `mise.toml` based on the other `mise.toml` files in `~/src/github.com/daveio`.
- Sync the configuration in `pyproject.toml` to configuration files in `.trunk/configs`.
  - Create them if they don't exist.
- I have upgraded `rich` to version `14.0.0` - if there are any breaking changes, fix them.
- The virtual environment is up to date.
  - Make sure you're using it; the prompt should contain `#bumpinator`.
  - If you need to activate it, run `source .venv/bin/activate.fish`.
- When done, run `trunk check -a --show-existing` and get fixing.
- Finally, ensure the documentation in `README.md`, `CLAUDE.md`, and `PROMPT.md` is all up to date and extensive.
