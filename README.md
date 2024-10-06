# vite-plugin-desmos

Render desmos-graph codeblocks as embed graphs.

**This project is unfinished and is under development. Do not use this in your production!**

Credit [@Nigecat/obsidian-desmos](https://github.com/Nigecat/obsidian-desmos), most codes come from them, also check their [documentation on the syntax](https://github.com/Nigecat/obsidian-desmos?tab=readme-ov-file#obsidian-desmos).


## Quickstart

```sh
npm i markdown-it
# There're currently no package release
npm link path/to/project
npm install
```

```ts
// example: .vitepress/config.mts
import { defineConfig } from 'vite'
import MarkdownItDesmos from 'markdown-it-desmos'
import MarkdownIt from 'markdown-it'

export default defineConfig({
  // ...
  markdown: {
    config: (md) => {
      md.use(MarkdownItDesmos)
    }
  },

  vite: {
    plugins: [MarkdownItDesmos(new MarkdownIt())],
  },

  // ...
})
```

