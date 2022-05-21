# rollup-svelte-pages

Issue: if you have an array as rollup.js config, and when you modify component style, output CSS files are not updated.

```js
import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";

const pages = ["foo", "bar"];

const plugins = [svelte({ preprocess: autoPreprocess() }), resolve(), css()];

export default pages.map(
  (page) =>
    /** @type {import('rollup').RollupOptions} */ ({
      input: `src/${page}/index.js`,
      output: {
        dir: `public/dest/${page}`,
      },
      plugins,
    })
);
```

## How to see

Preparation:

1. `npm ci`

Try:

1. `npm run clean && npm start`
2. [`http://localhost:3000`](http://localhost:3000)
3. Open `/foo.html` and `/bar.html` there
4. Make sure there are same headers in both pages
5. Modify header style at `Header.svelte` (e.g. change `background-color` from `#000` to `#999`)
6. The header on `/foo.html` changed
7. The header on `/bar.html` looses its whole style
   - Its output file `bundle.css` was actually not output at this time

## How to fix

A plugin `rollup-plugin-css-only` doesn't seem to work for multiple inputs. Generating plugin instance for each input fixes this issue. This might affect bundle time.

```diff
- const plugins = [svelte({ preprocess: autoPreprocess() }), resolve(), css()];
+ const plugins = [svelte({ preprocess: autoPreprocess() }), resolve()];
```

```diff
  /** @type {import('rollup').RollupOptions} */ ({
  …
-   plugins,
+   plugins: [...plugins, css()],
  })
```