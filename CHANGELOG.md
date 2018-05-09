# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.1.0"></a>
# [2.1.0](https://github.com/danhayden/react-simple-experiment/compare/v2.0.0...v2.1.0) (2018-05-09)


### Features

* add ability to pass a component to ExperimentManager ([9cbdf51](https://github.com/danhayden/react-simple-experiment/commit/9cbdf51))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/danhayden/react-simple-experiment/compare/v1.2.3...v2.0.0) (2018-05-08)


### Features

* implement components for managing active experiments ([b290383](https://github.com/danhayden/react-simple-experiment/commit/b290383))


### BREAKING CHANGES

* drop ability to set variant using <Experiment />



<a name="1.2.3"></a>
## [1.2.3](https://github.com/danhayden/react-simple-experiment/compare/v1.2.2...v1.2.3) (2017-12-09)



<a name="1.2.2"></a>
## [1.2.2](https://github.com/danhayden/react-simple-experiment/compare/v1.2.1...v1.2.2) (2017-09-04)


### Bug Fixes

* correctly set variant in browser storage when set using query string ([7131f48](https://github.com/danhayden/react-simple-experiment/commit/7131f48))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/danhayden/react-simple-experiment/compare/v1.2.0...v1.2.1) (2017-09-04)


### Bug Fixes

* always rerender when props change ([9ade179](https://github.com/danhayden/react-simple-experiment/commit/9ade179))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/danhayden/react-simple-experiment/compare/v1.1.3...v1.2.0) (2017-08-16)


### Features

* enable picking variant using query-string ([ca11d9c](https://github.com/danhayden/react-simple-experiment/commit/ca11d9c))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/danhayden/react-simple-experiment/compare/v1.1.2...v1.1.3) (2017-07-26)


### Bug Fixes

* update build to work with commonjs dependencies ([117d6f8](https://github.com/danhayden/react-simple-experiment/commit/117d6f8))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/danhayden/react-simple-experiment/compare/v1.1.1...v1.1.2) (2017-07-26)


### Bug Fixes

* use Number.isFinite polyfill to fix IE11 compatibility ([e7fa0ea](https://github.com/danhayden/react-simple-experiment/commit/e7fa0ea))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/danhayden/react-simple-experiment/compare/v1.1.0...v1.1.1) (2017-07-25)


### Bug Fixes

* select new variant if one returned from storage has weight of 0 ([c0522ae](https://github.com/danhayden/react-simple-experiment/commit/c0522ae))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/danhayden/react-simple-experiment/compare/v1.0.1...v1.1.0) (2017-07-20)


### Features

* make `onLoad` a required prop for `Experiment` component, add default `onLoad` function ([8339664](https://github.com/danhayden/react-simple-experiment/commit/8339664))
* only update if variant changes ([1fda059](https://github.com/danhayden/react-simple-experiment/commit/1fda059))
* pick variant before mount to avoid unnecessary render call ([ace0249](https://github.com/danhayden/react-simple-experiment/commit/ace0249))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/danhayden/react-simple-experiment/compare/v1.0.0...v1.0.1) (2017-07-19)


### Bug Fixes

* use localforage instance but avoid conflicting with any existing localforage usage ([d918ab3](https://github.com/danhayden/react-simple-experiment/commit/d918ab3))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/danhayden/react-simple-experiment/compare/v0.0.0...v1.0.0) (2017-07-19)



<a name="0.0.0"></a>
# 0.0.0 (2017-07-19)


### Features

* build prototype ([f350db3](https://github.com/danhayden/react-simple-experiment/commit/f350db3))
