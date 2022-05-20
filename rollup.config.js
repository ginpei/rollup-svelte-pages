import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import autoPreprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";

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
