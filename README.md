# CSS FCP

A lightweight utility to optimize First Contentful Paint (FCP) by managing and prioritizing critical CSS delivery for better Web Vitals.

### Contents

1. [Compatibility](#compatibility)
2. [Installation](#installation)
   1. [NPM](#npm)
3. [Usage](#usage)
   1. [Remove unused CSS](#remove-unused-css)
   2. [Extract critical CSS](#extract-critical-css)
4. [Author](#author)
5. [License](#license)

## Compatibility

Engine | Version
------- | -------
Node | >= 20

## Installation

### NPM

```bash
npm install css-fcp
```

## Usage

```js
// pages.config.js
export default [
  {
    name: 'home',
    url: '/'
  },
  {
    name: 'page',
    url: '/page-name/'
  },
  {
    name: 'blog',
    url: '/blog/'
  },
  {
    name: 'post',
    url: '/blog/post-name/',
    options: {
      css: ['/path/to/custom.css']
    }
  }
]
```

### Remove unused CSS

Under the hood, we use the **purgecss** package, so you can pass the same set of options via the third argument. Page-specific options override general ones.

```js
import { writeFile } from 'node:fs/promises'
import { removeUnused } from 'css-fcp'
import pages from './pages.config.js'

const siteUrl = 'https://example.com'
const cssPath = './assets/css/'
for (const page of pages) {
  const result = await removeUnused(siteUrl, page, {
    css: [
      `${cssPath}style1.css`,
      `${cssPath}style2.css`,
      `${cssPath}style3.css`
    ]
  })
  if (result?.length) {
    const css = result.map(item => item.css).join('')
    await writeFile(`${cssPath}${page.name}.css`, css, { flag: 'w' })
  }
  console.log('Done:', page.name)
}
```

### Extract critical CSS

Under the hood, we use the **critical** package, so you can pass the same set of options via the third argument. Page-specific options override general ones.

```js
import { writeFile } from 'node:fs/promises'
import { extractCritical } from 'css-fcp'
import pages from './pages.config.js'

const siteUrl = 'https://example.com'
const cssPath = './assets/css/'
for (const page of pages) {
  const { css } = await extractCritical(siteUrl, page, {
    css: [
      `${cssPath}style1.css`,
      `${cssPath}style2.css`,
      `${cssPath}style3.css`
    ],
    engine: 'static',
    width: 2000,
    height: 1080
  })
  await writeFile(`${cssPath}critical/${page.name}.css`, css, { flag: 'w' })
  console.log('Done:', page.name)
}
```

## Author

* [Dev](https://dev.to/jivtroy)
* [Medium](https://medium.com/@jivtroy)
* [YouTube](https://www.youtube.com/@jivtroy)

## License

This project is licensed under the **MIT License** - see the `LICENSE` file for details.