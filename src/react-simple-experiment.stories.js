import React from 'react'
import {storiesOf} from '@storybook/react'
import {Experiment, Variant} from './react-simple-experiment'

storiesOf('React Simple Experiment', module).add('Default variation', () => (
  <Experiment
    name="storybook-test"
    onLoad={(name, variant) => console.log(name, variant)}
  >
    <Variant name="variant1" weight={60}>
      <div>Variant1</div>
    </Variant>

    <Variant name="variant2" weight={20}>
      <div>Variant2</div>
    </Variant>

    <Variant name="variant3" weight={20}>
      <div>Variant3</div>
    </Variant>
  </Experiment>
))
