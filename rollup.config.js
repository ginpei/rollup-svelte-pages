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
