# typed: false
# frozen_string_literal: true

# Controller for example pages and UI demonstrations
class ExampleController < ApplicationController
  def daisyui
    render "daisyui"
  end
end
