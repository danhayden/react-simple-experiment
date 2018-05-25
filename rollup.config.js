import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import { minify } from "uglify-es";
import fs from "fs";
const pkg = JSON.parse(fs.readFileSync("./package.json"));

const name = "react-simple-experiment";
const globals = {
  react: "React",
  "prop-types": "PropTypes",
  localforage: "localforage"
};

export default {
  input: "src/react-simple-experiment.js",
  output: [
    { name, globals, format: "es", file: pkg.module },
    { name, globals, format: "cjs", file: pkg.main },
    { name, globals, format: "umd", file: pkg["umd:main"] }
  ],
  external: Object.keys(globals),
  plugins: [
    resolve(),
    commonjs({ exclude: "src/**" }),
    babel({
      babelrc: false,
      exclude: "node_modules/**",
      presets: [
        [
          "babel-preset-env",
          {
            modules: false,
            loose: true,
            targets: {
              browsers: [
                "last 2 Chrome versions",
                "last 2 Edge versions",
                "last 2 Firefox versions",
                "last 2 Safari versions",
                "Explorer 11"
              ]
            }
          }
        ],
        "babel-preset-react",
        "babel-preset-stage-2"
      ],
      plugins: ["external-helpers"]
    }),
    terser({}, minify)
  ]
};
