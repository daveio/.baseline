# Active Notes

## Sample Post

> Blake's 7 (1978): The BBC's criminally underappreciated sci-fi masterpiece that makes Game of Thrones look tame. Created by Terry Nation (Daleks), this series follows convicted criminals stealing an alien ship to fight the totalitarian Federation. What made it revolutionary? Main characters die permanently, heroes aren't heroic, and the politics feel uncomfortably real. Kerr Avon (Paul Darrow) became the breakout star—a brilliant, cynical anti-hero whose emotional detachment masked glimpses of humanity. The show influenced everything from BSG to The Expanse, featuring early representation with diverse casting and fully realized female characters. The series finale remains one of TV's most shocking endings. Available on streaming platforms—give it three episodes. Fair warning: don't get attached to anyone.

## Future Features

### API & Integration Health

- Integrate with social media APIs (Bluesky, Mastodon, Threads, Nostr)
- Connection Health widget (real-time API status, animated indicators)
- Social Media Sync Health dashboard (posting status & compatibility)
- Toast notifications for API connection events

### Platform Compatibility & Preview

- Cross-Platform Preview modal (post rendering across networks)
- Preview Across Platforms visual simulator
- Color-coded platform-compatibility indicator
- Platform Compatibility Wizard (step-by-step guidance)
- Media transcoding for platform requirements
- Dynamic platform-icon hover animation
- Responsive-design breakpoints (mobile / tablet)

### Content Optimization & AI-Assist

- AI-powered Post Optimization Suggestions tooltip
- Intelligent content-preview optimization tool
- Personalized platform-recommendation engine (by content type)
- Thread complexity-score visualization
- Social Media Energy Meter / Energy Dashboard (engagement potential)
- Mood-based content-recommendation system
- Character Count Mood Indicator (emoji changes with remaining chars)
- Content Chameleon (emoji & tone tweaks per platform)
- Playful thread-mood color-coding system

### UI/UX Polish (Animations, Micro-Interactions, A11y)

- Subtle micro-interactions (engagement & thread navigation)
- Playful loading animations with platform mascots
- Animated thread-navigation indicators
- Accessibility-focused keyboard-navigation mode

### Collaboration, Sharing & Export

- Collaborative thread-editing mode
- Thread preview-sharing widget (one-click social share)
- Copy Thread Preview feature
- Shareable config export/import
- Configurable notification system for post-sharing status

### Account & Session Management

- Multi-account management per platform

### Onboarding & Help

- Elegant onboarding tutorial with interactive walkthrough

### Gamification / Fun Stuff

- Achievement badges for successful cross-platform posts
- Secret Synthwave Mode (over-the-top visuals)

### Utilities

- Copy Formatting button with smart clipboard
- Optional progressive web-app (mobile-only UI; desktop unchanged)

## Review and Tests

- Run a review pass over the whole codebase.
  - Look for bugs.
    - Fix any bugs you find.
  - Remove any dead or unreachable code or files.
  - Add extensive documentation in a `README.md`.
    - This should contain detailed information about absolutely everything in the app.
    - An AI model should be able to recreate the app ONLY by reading the `README.md`.
      - It should be able to get information about both the design and the logic.
      - It should only need to read the `README.md` - not have to look at any code.
      - Assume API keys are still provided externally.
      - Do not assume that you will be the model reading it.
- Then, update the Vitest tests for the app.
  - Integrate them with Vite, which we are using already.
  - Run the tests.
  - Refine the tests until they pass.
    - If they surface any problems, fix those problems.
  - Keep the tests updated as we make changes and add features.
  - Document everything you do in `README.md`.
    - Also include how to run the tests.
