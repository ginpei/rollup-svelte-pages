import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import autoPreprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";

const pages = ["foo", "bar"];

const plugins = [svelte({ preprocess: autoPreprocess() }), css(), resolve()];

export default pages.map(
  (key) =>
    /** @type {import('rollup').RollupOptions} */ ({
      input: `src/${key}/index.js`,
      output: {
        dir: `public/dest/${key}`,
      },
      plugins,
    })
);
