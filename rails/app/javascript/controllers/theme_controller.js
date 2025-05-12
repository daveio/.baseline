import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["toggle", "selector"]

  connect() {
    this.loadThemePreference()
  }

  toggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme")

    // Skip toggle if we're in synthwave mode - that's handled by synthwave controller
    if (currentTheme === "synthwave84") {
      return
    }

    const newTheme = currentTheme === "frappe" ? "latte" : "frappe"

    this.applyTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  select(event) {
    const selectedTheme = event.target.value
    if (selectedTheme) {
      const currentTheme = document.documentElement.getAttribute("data-theme")

      // Store the previous theme when switching to synthwave84
      if (selectedTheme === "synthwave84" && currentTheme !== "synthwave84") {
        localStorage.setItem("previousTheme", currentTheme)
      }

      this.applyTheme(selectedTheme)
      localStorage.setItem("theme", selectedTheme)

      // If switching to synthwave84, dispatch an event for the synthwave controller
      if (selectedTheme === "synthwave84") {
        const event = new CustomEvent("synthwave:activate")
        window.dispatchEvent(event)
      }
    }
  }

  loadThemePreference() {
    // Default to frappe (dark) unless explicitly set to light
    const savedTheme = localStorage.getItem("theme") || "frappe"
    this.applyTheme(savedTheme)

    // Update selector if it exists
    if (this.hasSelectorTarget) {
      this.selectorTarget.value = savedTheme
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)

    // Update any toggle buttons
    if (this.hasToggleTarget) {
      const isDark = theme === "frappe" || theme === "macchiato" || theme === "mocha" || theme === "synthwave84"
      this.toggleTargets.forEach((target) => {
        target.setAttribute("aria-checked", isDark.toString())
      })
    }

    // Update selector if it exists
    if (this.hasSelectorTarget) {
      this.selectorTarget.value = theme
    }
  }
}
