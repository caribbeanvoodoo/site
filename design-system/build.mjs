import { build } from "esbuild";

// Bundle the component library to an ESM entry. React/React-DOM stay external —
// the design-sync converter provides them to the runtime bundle (_vendor).
await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.mjs",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2020",
  jsx: "automatic",
  external: ["react", "react-dom", "react/jsx-runtime"],
  logLevel: "info",
});
