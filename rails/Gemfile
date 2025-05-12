# frozen_string_literal: true

source "https://rubygems.org"

ruby "3.4.3"

gem "bcrypt", "~> 3.1.20" # https://guides.rubyonrails.org/active_model_basics.html#securepassword
gem "bootsnap", "~> 1.18.4", require: false
gem "catppuccin", "~> 0.1.2"
gem "cssbundling-rails", "~> 1.4.3" # https://github.com/rails/cssbundling-rails
gem "image_processing", "~> 1.14.0" # https://guides.rubyonrails.org/active_storage_overview.html#transforming-images
gem "jbuilder", "~> 2.13.0" # https://github.com/rails/jbuilder
gem "jsbundling-rails", "~> 1.3.1" # https://github.com/rails/jsbundling-rails
gem "kamal", "~> 2.5.3", require: false # https://kamal-deploy.org
gem "propshaft", "~> 1.1.0" # https://github.com/rails/propshaft
gem "puma", "~> 6.6.0" # https://github.com/puma/puma
gem "rails", "~> 8.0.2" # https://github.com/rails/rails
gem "solid_cable", "~> 3.0.8"
gem "solid_cache", "~> 1.0.7"
gem "solid_queue", "~> 1.1.5"
gem "sqlite3", "~> 2.6.0"
gem "stimulus-rails", "~> 1.3.4" # https://stimulus.hotwired.dev
gem "thruster", "~> 0.1.13", require: false # https://github.com/basecamp/thruster
gem "turbo-rails", "~> 2.0.13" # https://turbo.hotwired.dev
gem "tzinfo-data", "~> 1.2025.2", platforms: %i[windows jruby]

group :development, :test do
  gem "brakeman", "~> 7.0.2", require: false # https://brakemanscanner.org
  gem "debug", "~> 1.10.0", platforms: %i[mri windows], require: "debug/prelude" # https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "devise", "~> 4.9.4"
  gem "devise-argon2", "~> 2.0.3"
  gem "devise_zxcvbn", "~> 6.0.0"
  gem "dotenv-rails", "~> 3.1.8"
  gem "rubocop", "~> 1.75.5"
  gem "rubocop-capybara", "~> 2.22.1"
  gem "rubocop-minitest", "~> 0.38.0"
  gem "rubocop-performance", "~> 1.25.0"
  gem "rubocop-rails", "~> 2.31.0"
  gem "rubocop-rails-omakase", "~> 1.1.0", require: false # https://github.com/rails/rubocop-rails-omakase
  gem "rubocop-rake", "~> 0.7.1"
  gem "rubocop-rspec", "~> 3.6.0"
  gem "rubocop-sorbet", "~> 0.10.0"
  gem "rubocop-thread_safety", "~> 0.7.2"
  gem "sorbet-static-and-runtime", "~> 0.5.12087"
end

group :development do
  gem "web-console", "~> 4.2.1" # https://github.com/rails/web-console
end

group :test do
  gem "capybara", "~> 3.40.0" # https://guides.rubyonrails.org/testing.html#system-testing
  gem "selenium-webdriver", "~> 4.32.0"
end
