import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";
import fs from "fs";
const pkg = JSON.parse(fs.readFileSync("./package.json"));

const name = "react-simple-experiment";
const globals = {
  react: "React",
  "prop-types": "PropTypes",
  "pick-one-by-weight": "pickOneByWeight",
  localforage: "localforage"
};

export default {
  output: {
    name: "ReactSimpleExperiment",
    globals: {
      react: "React",
      "prop-types": "PropTypes",
      "pick-one-by-weight": "pickOneByWeight",
      localforage: "localforage"
    }
  },
  input: "src/react-simple-experiment.js",
  output: [
    { name, globals, format: "es", file: pkg.module },
    { name, globals, format: "cjs", file: pkg.main },
    { name, globals, format: "umd", file: pkg["umd:main"] }
  ],
  external: ["react", "prop-types", "pick-one-by-weight", "localforage"],
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
    uglify({}, minify)
  ]
};
