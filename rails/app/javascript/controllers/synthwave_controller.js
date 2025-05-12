import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    active: { type: Boolean, default: false }
  }

  connect() {
    // Check for saved easter egg activation
    const synthwaveActivated = localStorage.getItem("synthwave84Activated") === "true"
    if (synthwaveActivated) {
      this.activateTheme()
    }

    // Listen for the konami code or other "cheat codes" to activate
    this.initializeKonamiCode()
  }

  // Konami code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
  initializeKonamiCode() {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a"
    ]
    let konamiIndex = 0

    document.addEventListener("keydown", (e) => {
      // Reset if the key doesn't match the expected key in sequence
      if (e.key.toLowerCase() !== konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex = 0
        return
      }

      // Move to the next key in the sequence
      konamiIndex++

      // If the full sequence is entered, activate Synthwave
      if (konamiIndex === konamiCode.length) {
        this.toggleTheme()
        konamiIndex = 0
      }
    })
  }

  toggleTheme() {
    if (this.activeValue) {
      this.deactivateTheme()
    } else {
      this.activateTheme()
    }
  }

  activateTheme() {
    // Apply theme
    document.documentElement.setAttribute("data-theme", "synthwave84")

    // Add wrapper for scanlines effect if not already present
    if (!document.querySelector(".synthwave-scanlines-wrapper")) {
      const wrapper = document.createElement("div")
      wrapper.className =
        "synthwave-scanlines-wrapper synthwave-scanlines fixed inset-0 pointer-events-none z-50 opacity-10"
      document.body.appendChild(wrapper)
    }

    // Add glow classes to various UI elements
    this.applyGlowEffects()

    // Store preference
    localStorage.setItem("synthwave84Activated", "true")
    localStorage.setItem("theme", "synthwave84")

    this.activeValue = true
  }

  deactivateTheme() {
    // Restore previous theme (if stored, otherwise default to frappe)
    const previousTheme = localStorage.getItem("previousTheme") || "frappe"
    document.documentElement.setAttribute("data-theme", previousTheme)

    // Remove scanlines effect
    const wrapper = document.querySelector(".synthwave-scanlines-wrapper")
    if (wrapper) {
      wrapper.remove()
    }

    // Remove glow classes
    this.removeGlowEffects()

    // Store preference
    localStorage.setItem("synthwave84Activated", "false")
    localStorage.setItem("theme", previousTheme)

    this.activeValue = false
  }

  applyGlowEffects() {
    // Apply glow to headings
    document.querySelectorAll("h1, h2, h3").forEach((heading) => {
      heading.classList.add("synthwave-glow-text")
    })

    // Apply glow to buttons based on their type
    document.querySelectorAll(".btn-primary").forEach((btn) => {
      btn.classList.add("synthwave-glow-text")
    })

    document.querySelectorAll(".btn-secondary").forEach((btn) => {
      btn.classList.add("synthwave-glow-blue")
    })

    document.querySelectorAll(".btn-accent").forEach((btn) => {
      btn.classList.add("synthwave-glow-green")
    })

    // Apply active borders to various active elements
    document.querySelectorAll(".active, .selected").forEach((element) => {
      element.classList.add("active-border")
    })
  }

  removeGlowEffects() {
    // Remove all synthwave specific classes
    const synthwaveClasses = ["synthwave-glow-text", "synthwave-glow-blue", "synthwave-glow-green", "active-border"]

    synthwaveClasses.forEach((className) => {
      document.querySelectorAll(`.${className}`).forEach((element) => {
        element.classList.remove(className)
      })
    })
  }
}
