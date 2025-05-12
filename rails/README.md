# Multipost

Multipost is a Rails application for intelligent content sharing across multiple social media platforms. It provides AI-powered post optimization, thread creation, and content splitting capabilities to help users create the perfect content for different social platforms.

## Features

- Cross-platform posting to Bluesky, Mastodon, Threads, and more
- AI-powered content optimization for each platform
- Thread creation and management
- Media uploads with preview
- Draft management with auto-save
- User authentication and platform account management
- Content splitting for long posts
- Platform-specific character counting and previews
- Theme switching with Catppuccin colors

## Technology Stack

- **Backend**: Ruby on Rails 8.0 with SQLite database
- **Frontend**: Stimulus.js, Tailwind CSS 4.x, and Turbo
- **Asset Bundling**: Bun.js for JS and CSS bundling
- **Background Processing**: SolidQueue for job processing
- **Caching**: SolidCache for database-backed caching
- **WebSockets**: SolidCable for ActionCable implementation
- **Authentication**: Devise

## Development Setup

### Prerequisites

- Ruby 3.3+
- Node.js 18+ and Bun
- SQLite3

### Installation

```bash
# Clone the repository
git clone https://github.com/daveio/multipost-rails.git
cd multipost-rails

# Install dependencies and set up the application
bin/setup
```

### Running the Application

```bash
# Start all development processes (Rails server, JS watcher, CSS watcher)
bin/dev
```

This starts the server on port 3000 by default. You can change the port by setting the PORT environment variable:

```bash
PORT=4000 bin/dev
```

## Testing

The application includes a comprehensive test suite with unit tests, integration tests, and system tests.

### Running Tests

```bash
# Run all tests
bin/rails test

# Run specific test file
bin/rails test test/models/user_test.rb

# Run specific test
bin/rails test test/models/user_test.rb:10

# Run system tests
bin/rails test:system

# Run tests with coverage report
bin/rails test:coverage

# Run visual regression tests with Percy
bin/rails test:visual

# Run visual regression tests locally (saves screenshots to tmp/screenshots)
bin/rails test:visual_local
```

### Test Coverage

The application uses SimpleCov to generate test coverage reports. When you run `bin/rails test:coverage`, a detailed HTML report will be generated and automatically opened in your browser, showing:

- Overall code coverage percentage
- File-by-file coverage breakdown
- Line-by-line coverage highlighting
- Coverage grouped by controllers, models, services, etc.

The coverage report is stored in the `coverage/` directory (which is git-ignored).

### Visual Regression Testing

The application uses Percy for visual regression testing. Visual regression tests capture screenshots of the UI and compare them against baseline images to detect unintended visual changes. When you run `bin/rails test:visual`, screenshots will be uploaded to Percy (requires a Percy API token).

You can also run visual regression tests locally with `bin/rails test:visual_local`, which saves screenshots to the `tmp/screenshots` directory without requiring a Percy account.

Visual regression tests check:

- Different themes (Catppuccin variants)
- Responsive design across screen sizes
- UI components like forms, modals, and lists
- Core user flows and interactions

### Database Cleanliness

The application uses DatabaseCleaner to ensure tests run in isolation. Different strategies are used based on the test type:

- **Unit and Model Tests**: Use transactional strategy for speed
- **System Tests**: Use truncation strategy to handle JavaScript testing
- **Parallel Tests**: Use optimized truncation with pre-counting for parallel execution

This ensures consistent test environments and prevents test pollution.

### Test Organization

The test suite uses contexts and shared examples to organize tests:

- **Contexts**: Group related tests with shared setup and teardown code
- **Shared Examples**: Reuse test behaviors across multiple test classes
- **Test Helpers**: Provide common functionality for all tests

This organization improves readability, reduces duplication, and makes tests more maintainable.

### Test Suite Structure

- **Model Tests**: Test the validations, associations, and methods on models
- **Controller Tests**: Test the HTTP responses, redirects, and authentication
- **System Tests**: Test the full application flow with browser simulation

#### Model Tests

- User model tests
- Post model tests
- MediaFile model tests
- Platform model tests
- Account model tests
- Draft model tests
- SplittingConfiguration model tests

#### Controller Tests

- Posts controller
- Drafts controller
- MediaFiles controller
- Platforms controller
- Accounts controller
- SplittingConfigurations controller

#### System Tests

- Authentication workflow
- Post creation and threading
- Media uploads
- Platform configuration
- Dashboard interface
- Drafts workflow

## Linting and Static Analysis

```bash
# Run RuboCop for code style checking
bin/rubocop

# Run Brakeman for security analysis
bin/brakeman
```

## Deployment

The application can be deployed using Kamal, a tool for deploying Rails applications as Docker containers.

```bash
# Deploy using Kamal
bin/kamal deploy
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Rails 8 team for the amazing framework
- Catppuccin color theme for the pleasant UI colors
- OpenAI for the content optimization API
