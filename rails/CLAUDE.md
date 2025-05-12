# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multipost is a Rails application for intelligent content sharing across multiple social media platforms. It provides AI-powered post optimization, thread creation, and content splitting capabilities to help users create the perfect content for different social platforms.

### Key Features

- Cross-platform posting to Bluesky, Mastodon, Threads, and more
- AI-powered content optimization for each platform
- Thread creation and management
- Media uploads with preview
- Draft management with auto-save
- User authentication and platform account management
- Content splitting for long posts
- Platform-specific character counting and previews
- Theme switching with Catppuccin colors

### Technology Stack

- **Backend**: Ruby on Rails 8.0 with SQLite database
- **Frontend**: Stimulus.js, Tailwind CSS 4.x, DaisyUI, and Turbo
- **Asset Bundling**: Bun.js for JS and CSS bundling
- **Background Processing**: SolidQueue for job processing
- **Caching**: SolidCache for database-backed caching
- **WebSockets**: SolidCable for ActionCable implementation
- **Authentication**: Devise with Argon2 and ZXCVBN password strength validation
- **Theming**: Catppuccin (Frappe for dark mode, Latte for light mode)

### Prerequisites

- Ruby 3.4.3
- Node.js 18+ and Bun
- SQLite3

## Common Commands

### Development

```bash
# Set up the development environment (installs dependencies and starts the server)
bin/setup

# Set up without starting the server
bin/setup --skip-server

# Start the development server (Rails, JS watcher, CSS watcher)
bin/dev

# Start with a custom port
PORT=4000 bin/dev

# Build JavaScript
bun run build:js

# Build CSS
bun run build:css

# Watch and rebuild JavaScript
bun run build:js --watch

# Watch and rebuild CSS
bun run build:css --watch
```

### Testing

```bash
# Run all tests
bin/rails test

# Run a specific test file
bin/rails test test/models/user_test.rb

# Run a specific test (by line number)
bin/rails test test/models/user_test.rb:10

# Run system tests
bin/rails test:system

# Run tests with coverage report (generates HTML report in coverage/)
bin/rails test:coverage

# Run visual regression tests with Percy
bin/rails test:visual

# Run visual regression tests locally (saves screenshots to tmp/screenshots)
bin/rails test:visual_local
```

### Linting and Static Analysis

```bash
# Run RuboCop for Ruby code style checking
bin/rubocop

# Run Brakeman for security analysis
bin/brakeman

# Run Biome for JavaScript linting
npx @biomejs/biome check app/javascript
```

### Deployment

```bash
# Deploy using Kamal
bin/kamal deploy
```

## Architecture

### Backend

The application follows the standard Rails MVC architecture:

- **Models**: Represent database tables and business logic
- **Controllers**: Handle HTTP requests and responses
- **Views**: Render HTML using ERB templates

### Key Models

The application has these key models:

- **User**: Authentication and user data
- **Post**: Content to be shared across platforms
- **Platform**: Supported social media platforms
- **Account**: User's credentials for each platform
- **MediaFile**: Images and other media attached to posts
- **Draft**: Saved but not published content
- **SplittingConfiguration**: Rules for splitting posts across platforms

### Frontend

- Uses Rails' Hotwire stack with Turbo and Stimulus
- CSS is handled with Tailwind CSS 4.x, PostCSS, and DaisyUI
- JavaScript is bundled with Bun
- Implements Catppuccin theming (Frappe for dark mode, Latte for light mode)

### Database

- Uses SQLite database
- Leverages SolidQueue for background job processing
- SolidCache for database-backed caching
- SolidCable for ActionCable implementation with database storage

### Test Organization

- **Model Tests**: Test validations, associations, and methods
- **Controller Tests**: Test HTTP responses, redirects, and authentication
- **System Tests**: Test the full application flow with browser simulation
- Uses DatabaseCleaner for test isolation
- SimpleCov for test coverage reporting
- Percy for visual regression testing

### Dependencies

- See Gemfile for Ruby dependencies
- See package.json for JavaScript dependencies

## Code Style Guidelines

- Ruby code follows RuboCop guidelines defined in .rubocop.yml
- JavaScript code follows Biome linting rules
- Ruby version: 3.4.3
- Use double quotes for string literals
- Follow Rails naming conventions
- Sorbet is used for Ruby type checking
