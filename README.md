# React Simple Experiment

[![version][version]](http://npm.im/react-simple-experiment)
[![MIT License][MIT License]](http://opensource.org/licenses/MIT)
[![Standard][Standard]](http://standardjs.com)
[![Standard Version][Standard Version]](https://github.com/conventional-changelog/standard-version)
[![Size][Size]](https://unpkg.com/react-simple-experiment)
[![Size gzip][Size gzip]](https://unpkg.com/react-simple-experiment)

Simple A/B testing for React

## Usage

```js
import React from 'react'
import {Experiment, Variant} from 'react-simple-experiment'

export default function MyABTest () {
  return (
    <Experiment
      name='Experiment Name'
      onLoad={(name, variant) => console.log(name, variant)}
    >
      <Variant name='Variant 1 Name' weight={60}>
        <div>
          Variant 1
        </div>
      </Variant>

      <Variant name='Variant 2 Name' weight={20}>
        <div>
          Variant 2
        </div>
      </Variant>

      <Variant name='Variant 3 Name' weight={20}>
        <div>
          Variant 3
        </div>
      </Variant>
    </Experiment>
  )
}
```

Once a variant has been chosen the choice is persisted to browser storage (using [localForage]) to ensure the same variant is shown on return visits

### License

MIT

[version]: https://img.shields.io/npm/v/react-simple-experiment.svg
[MIT License]: https://img.shields.io/npm/l/react-simple-experiment.svg
[Standard]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[Standard Version]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
[Size]: https://badges.herokuapp.com/size/npm/react-simple-experiment
[Size gzip]: https://badges.herokuapp.com/size/npm/react-simple-experiment?gzip=true
[localForage]: https://github.com/localForage/localForage
