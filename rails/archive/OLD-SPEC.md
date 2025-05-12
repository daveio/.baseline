# Multipost

Develop a web application based on the provided specifications. The design should prioritize visual appeal and user experience, with a focus on real-time feedback mechanisms, particularly for character counts in the post entry field. Optimize the application for desktop environments while ensuring full responsiveness for mobile devices. Use Ruby on Rails as the framework for this application, with Stimulus for JavaScript, Tailwind CSS version 4 for styling, and the DaisyUI library for UI components.

---

## Specifications

Multipost is a web app which allows a user to crosspost to multiple social networks at the same time, and adjusts the post for each network.

The frontend will not talk to social networks or AI services directly. Instead, it will use the API provided by the backend, which will handle all communication with third-party endpoints.

## Platform

- Ruby on Rails 8.
- Stimulus for JavaScript.
- Tailwind CSS version 4.
- DaisyUI for UI components.

## Dependencies

- All dependencies should be their latest version where possible, or the most recent version possible.

## Social Networks

Priority 1 is the highest priority. Priority 2 is less important than priority 1 and more important than priority 3, and so on.

## Networks

- Bluesky
- Mastodon (with custom instance)
- Threads
- Nostr

## Features

- Crosspost to multiple social networks at the same time.
  - Also allow multiple accounts per social network.
  - Also allow multiple instances for Mastodon, with the option for multiple accounts per instance.
- Allow photos to be attached.
  - Adjust and convert the photos according to the requirements of the social networks.
  - Adjust and convert for each network separately unless the requirements are the same.
  - Require photos for **Photo Sharing** networks.
- Allow videos to be attached.
  - Transcode the videos according to the requirements of the social networks.
    - Transcode for each network separately unless the requirements are the same.

### Character Count

This is an important feature.

- Find the maximum character count for each social network.
  - On Mastodon this varies by instance. Fetch the character count from the instance(s) in use.
- Use AI to split the text into multiple posts while keeping the meaning of the post.
  - Use the OpenAI API to access the GPT-4.1 model. There may be a gem for this.
  - Configure both and allow them to be switched between in the config file and/or environment variables.
- Add threading information (`🧵 x/y` where `x` is the current post and `y` is the total number of posts).
- Give a display of the character count for the post, updated as the user types.
  - Also break the character count down by network, again with real-time updates.

## Design

### Styles and Components

Follow the [Tailwind CSS Style Guide](https://tailwindcss.com/docs/content-configuration).

Use the [DaisyUI Components](https://daisyui.com/components/) for UI components.

### Layout

- Layout: Clean, organized posting interface with clear platform selection and preview capabilities
- Components: Modern form elements, platform-specific preview cards, media upload area with conversion status indicators
