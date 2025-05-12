# Multipost Scratchpad

## Catppuccin prompt

I have installed some packages.

Bun (`npm`):

- `@catppuccin/tailwindcss`: [catppuccin/tailwindcss](https://github.com/catppuccin/tailwindcss)
- `@catppuccin/daisyui`: [catppuccin/daisyui](https://github.com/catppuccin/daisyui)
- `@catppuccin/palette`: [catppuccin/palette](https://github.com/catppuccin/palette)
  - Also see [css.md](https://github.com/catppuccin/palette/blob/main/docs/css.md)

Ruby (`gem`):

- `catppuccin`: [catppuccin/ruby](https://github.com/catppuccin/ruby)

Now that we have Tailwind 4 and DaisyUI via PostCSS, I want you to configure Tailwind 4 and DaisyUI to use the Catppuccin theme.

Use whichever packages make the most sense. I initially suspect that using `@catppuccin/daisyui` for DaisyUI and `@catppuccin/tailwindcss` for all other Tailwind theming might be a good idea, but you can decide on your approach.

Any CSS changes should involve PostCSS where appropriate.

Also configure Ruby tooling and backend to use the theme where possible.

Use `frappe` as the default dark mode theme, and `latte` as the default light mode theme.

Default to dark mode; making `frappe` the default

## Synthwave prompt

I would also like to add another theme option for the site, ie DaisyUI and Tailwind 4.

I don't want you to use the DaisyUI `synthwave` theme as it doesn't have all the nice effects, and makes other design decisions I don't like.

The theme is `Synthwave '84`, available at [robb0wen/synthwave-vscode](https://github.com/robb0wen/synthwave-vscode).

It is more than just colours: it includes effects like glow and (maybe) scanlines, and possibly more. I want them implemented too.

You will have to read and interpret the theme and then reimplement it for CSS, JavaScript, and Ruby. The theme is presented as the source code for a Visual Studio Code plugin.

I have checked out the repository and it can be found at `/Users/dave/src/github.com/robb0wen/synthwave-vscode`.

Remember to involve PostCSS where appropriate in any CSS changes.

Don't change the default theme: it should say as Catppuccin Frappé.

Eventually, this theme will be added as available through a 'cheat code' as an easter egg. For now, it should appear as an option in any theme switchers.

We also have some theming infrastructure for Ruby: add it to that, too, if you can.
