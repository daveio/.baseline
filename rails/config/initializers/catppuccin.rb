# typed: false
# frozen_string_literal: true

require "catppuccin"

# Configure Catppuccin for Ruby
Catppuccin.configure do |config|
  config.default_flavor = :frappe # Default to dark mode (frappe)
  config.light_flavor = :latte    # Light mode flavor
  config.dark_flavor = :frappe    # Dark mode flavor
end

# Make Catppuccin colors available in Ruby
# This can be used in Rails views and helpers
module CatppuccinColors
  FLAVORS = %i[latte frappe macchiato mocha].freeze

  def self.colors(flavor = nil)
    flavor ? Catppuccin.colors(flavor) : Catppuccin.colors
  end

  def self.current_flavor
    Catppuccin.current_flavor
  end

  # Helper to get a color by name
  def self.color(name, flavor = nil)
    if flavor
      Catppuccin.color(name, flavor)
    else
      Catppuccin.color(name)
    end
  end

  # Get a list of all available flavors
  def self.flavors
    FLAVORS
  end
end
