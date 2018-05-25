# React Simple Experiment

[![version][version]](http://npm.im/react-simple-experiment)
[![MIT License][mit license]](http://opensource.org/licenses/MIT)
[![Standard Version][standard version]](https://github.com/conventional-changelog/standard-version)
[![Size][size]](https://unpkg.com/react-simple-experiment)
[![Size gzip][size gzip]](https://unpkg.com/react-simple-experiment)

Simple A/B testing for React

- Exports `ExperimentConsumer` [Render Prop] and `withExperiments` [HOC] for accessing and modifying experiments
- Persists assigned variant for return visits (using [localForage])
- configurable variants weights
- **Requires React 16.3+** due to utilising new [context]

## Exports

- `ExperimentProvider`
- `ExperimentConsumer`
- `withExperiments`
- `Experiment`
- `Variant`
- `ActiveVariant`

## Usage

### ExperimentProvider, Experiment & Variant

```js
import React, { Component } from "react";
import { render } from "react-dom";
import {
  ExperimentProvider,
  Experiment,
  Variant
} from "react-simple-experiment";

class MyExperiment extends Component {
  logExperimentInfo = ({ name, variants, activeVariantId }) => {
    console.log({ name, variants, activeVariantId });
  };

  render() {
    return (
      <Experiment name="Experiment Name" onLoad={this.logExperimentInfo}>
        <Variant name="control" weight={60}>
          <div>Control</div>
        </Variant>
        <Variant name="variant1" weight={20}>
          <div>Variant 1</div>
        </Variant>
      </Experiment>
    );
  }
}

class App extends Component {
  render() {
    return (
      <ExperimentProvider>
        <MyExperiment />
      </ExperimentProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
```

### ExperimentProvider, ActiveVariant & withExperiments

```js
import React, { Component } from "react";
import { render } from "react-dom";
import {
  ExperimentProvider,
  ActiveVariant,
  withExperiments
} from "react-simple-experiment";

class MyExperimentBase extends Component {
  componentDidMount() {
    this.props.createExperiment({
      onLoad: this.logExperimentInfo,
      name: "Experiment Name",
      variants: {
        control: 1, // integer represents variant weight
        variant: 1
      }
    });
  }

  logExperimentInfo = ({ name, variants, activeVariantId }) => {
    console.log({ name, variants, activeVariantId });
  };

  render() {
    return (
      <div>
        <ActiveVariant experiment="Experiment Name" variant="control">
          <div>Control</div>
        </ActiveVariant>
        <ActiveVariant experiment="Experiment Name" variant="variant">
          <div>Variant 1</div>
        </ActiveVariant>
      </div>
    );
  }
}

const MyExperiment = withExperiments(MyExperimentBase);

class App extends Component {
  render() {
    return (
      <ExperimentProvider>
        <MyExperiment />
      </ExperimentProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
```

### ExperimentProvider, ExperimentConsumer

```js
import React, { Component } from "react";
import { render } from "react-dom";
import {
  ExperimentProvider,
  ExperimentConsumer
} from "react-simple-experiment";

class MyExperimentManagerBase extends Component {
  setControl = () => {
    this.props.setExperimentVariant("Experiment Name", "control");
  };

  setVariant = () => {
    this.props.setExperimentVariant("Experiment Name", "variant");
  };

  render() {
    return (
      <div>
        <button onClick={this.setControl}>set control</button>
        <button onClick={this.setVariant}>set variant</button>
      </div>
    );
  }
}

const MyExperimentManager = props => (
  <ExperimentConsumer>
    {context => (
      <MyExperimentManagerBase
        {...props}
        experiments={context.experiments}
        createExperiment={context.createExperiment}
        removeExperiment={context.removeExperiment}
        setExperimentVariant={context.setExperimentVariant}
      />
    )}
  </ExperimentConsumer>
);

class App extends Component {
  render() {
    return (
      <ExperimentProvider>
        <MyExperimentManager />
      </ExperimentProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
```

### License

MIT

[version]: https://img.shields.io/npm/v/react-simple-experiment.svg
[mit license]: https://img.shields.io/npm/l/react-simple-experiment.svg
[standard version]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
[size]: https://badges.herokuapp.com/size/npm/react-simple-experiment
[size gzip]: https://badges.herokuapp.com/size/npm/react-simple-experiment?gzip=true
[localforage]: https://github.com/localForage/localForage
[render prop]: https://reactjs.org/docs/render-props.html
[hoc]: https://reactjs.org/docs/higher-order-components.html
[context]: https://reactjs.org/docs/context.html
