import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import {minify} from 'uglify-es'
import fs from 'fs'
const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  entry: 'src/react-simple-experiment.js',
  moduleName: 'ReactSimpleExperiment',
  external: ['react', 'prop-types', 'pick-one-by-weight', 'localforage'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
    'pick-one-by-weight': 'pickOneByWeight',
    localforage: 'localforage'
  },
  targets: [
    {dest: pkg.main, format: 'cjs'},
    {dest: pkg.module, format: 'es'},
    {dest: pkg['umd:main'], format: 'umd'}
  ],
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          'babel-preset-env',
          {
            modules: false,
            loose: true,
            targets: {browsers: ['last 2 versions', '> 1%']}
          }
        ],
        'babel-preset-react',
        'babel-preset-stage-2'
      ]
    }),
    uglify({}, minify)
  ]
}
