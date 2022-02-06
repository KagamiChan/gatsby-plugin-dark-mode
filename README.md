# gatsby-plugin-dark-mode

A Gatsby plugin which handles some of the details of implementing a dark mode theme.

It provides:

- Browser code for toggling and persisting the theme (from [Dan Abramov](https://twitter.com/dan_abramov)'s [overreacted.io](https://overreacted.io) implementation)
- Automatic use of a dark mode theme (via the `prefers-color-scheme` [CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)) if you've configured your system to use dark colour themes when available.
- A [React](https://reactjs.org) hook for implementing theme toggling UI in your site.

## Install

```sh
npm install @skagami/gatsby-plugin-dark-mode
```

```js
// gatsby-config.js

module.exports = {
  plugins: ['@skagami/gatsby-plugin-dark-mode'],
}
```

## How to use

### options

#### `rootElement`: string = 'document.body'

The root element to add `.dark` class to, for example, tailwind.css users could set it to `document.documentElement`. it is also possible to use `document.querySelector('foo')` because this will be inserted into the literal template for the `<script />` tag.

#### `script`: string | null

The customized script implementation instead of the default one, using this means you might also need to handle the theme and theme changes yourself. This could be helpful if the theme persistense is from somewhere else than `localstorage`

Another option is feeding `null`, which means the `<script />` tag won't be inserted.

### Implement theme toggling UI

The plugin module exports a `useTheme` hook

Here's an example of using `useTheme` with a checkbox to toggle the theme:

```jsx
import React from 'react'
import { useTheme } from '@skagami/gatsby-plugin-dark-mode'

const ThemeCheckbox = () => {
  const [theme, toggleTheme] = useTheme()

  // Don't render anything at compile time. Deferring rendering until we
  // know which theme to use on the client avoids incorrect initial
  // state being displayed.
  if (theme === null) {
    return null
  }

  return (
    <label>
      <input
        type="checkbox"
        onChange={(e) => toggleTheme(e.target.checked ? 'dark' : 'light')}
        checked={theme === 'dark'}
      />
      Dark mode
    </label>
  )
}
```

The toggled theme will be persisted across visits in `localStorage.theme`.

### Implement theming

The default theme names are `'light'` and `'dark'` - the plugin adds the current theme name to the `<body>` element's `className`, so you can use [global styles](https://www.gatsbyjs.org/docs/creating-global-styles) to implement theming.

A nice option is to use CSS variables like so:

```css
/* global.css */

body {
  --bg: white;
  --textNormal: #222;
  --textTitle: #222;
  --textLink: blue;
  --hr: hsla(0, 0%, 0%, 0.2);

  background-color: var(--bg);
}

body.dark {
  -webkit-font-smoothing: antialiased;

  --bg: darkslategray;
  --textNormal: rgba(255, 255, 255, 0.88);
  --textTitle: white;
  --textLink: yellow;
  --hr: hsla(0, 0%, 100%, 0.2);
}
```

You can then use these variables in your site's components...

```js
class Layout extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--textNormal)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
        }}
      >
        ...
      </div>
    )
  }
}
```

...and in your [Typography config](https://www.gatsbyjs.org/docs/typography-js/#creating-the-typography-configuration) if you're using `gatsby-plugin-typography`, which is included in the [Gatsby Starter Blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/):

```js
// typography.js

import './global.css'

import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  a: {
    color: 'var(--textLink)',
  },
  // gatsby-remark-autolink-headers - don't underline when hidden
  'a.anchor': {
    boxShadow: 'none',
  },
  // gatsby-remark-autolink-headers - use theme colours for the link icon
  'a.anchor svg[aria-hidden="true"]': {
    stroke: 'var(--textLink)',
  },
  hr: {
    background: 'var(--hr)',
  },
})
```

## Acknowledgements

The theme detecting/switching/persistence code and the suggested theming implementation are entirely from the [implementation of overreacted.io](https://github.com/gaearon/overreacted.io) by [Dan Abramov](https://twitter.com/dan_abramov) - I'm just publishing them as a plugin to make them easier to use in my own blog, and for reuse by others.

## MIT Licensed
