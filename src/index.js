import React, { Component } from "react";
import PropTypes from "prop-types";
import Storage from "./storage";
import { pickByWeight } from "./pick-by-weight";
import { formatExperimentData } from "./format-experiment-data";
import { getDisplayName } from "./get-display-name";
import { ExperimentContextProvider, ExperimentConsumer } from "./context";

const storage = Storage({ name: "react-simple-experiment" });
const experimentStoragePrefix = "experiment--";
const variantsStoragePrefix = "variants--";

class ExperimentProvider extends Component {
  static displayName = "ExperimentProvider";
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  getExperiments = () => {
    return storage.getStore().then(data => {
      this.setState(() => ({ experiments: formatExperimentData(data) }));
    });
  };

  createExperiment = ({ name, variants, onLoad = () => {} }) => {
    return this.storePossibleVariants(name, variants).then(() => {
      return this.pickVariant(name, variants).then(activeVariantId => {
        const experimentData = { name, variants, activeVariantId };
        onLoad(experimentData);
        return experimentData;
      });
    });
  };

  storePossibleVariants = (name, variants) => {
    const variantsStorageName = variantsStoragePrefix + name;
    return storage.setItem(variantsStorageName, variants);
  };

  pickVariant = (experimentId, variants) => {
    const experimentStorageName = experimentStoragePrefix + experimentId;
    return storage.getItem(experimentStorageName).then(variantId => {
      if (
        variantId == null ||
        Object.keys(variants).includes(variantId) === false ||
        variants[variantId] < 1
      ) {
        variantId = pickByWeight(variants);
        storage
          .setItem(experimentStorageName, variantId)
          .then(this.getExperiments);
      }
      return variantId;
    });
  };

  removeExperiment = experimentId => {
    return Promise.all([
      storage.removeItem(experimentStoragePrefix + experimentId),
      storage.removeItem(variantsStoragePrefix + experimentId)
    ]).then(this.getExperiments);
  };

  setExperimentVariant = (experimentId, variantId) => {
    return storage
      .setItem(experimentStoragePrefix + experimentId, variantId)
      .then(this.getExperiments);
  };

  state = {
    experiments: {},
    createExperiment: this.createExperiment,
    removeExperiment: this.removeExperiment,
    setExperimentVariant: this.setExperimentVariant
  };

  componentDidMount() {
    this.getExperiments();
  }

  render() {
    return (
      <ExperimentContextProvider value={this.state}>
        {this.props.children}
      </ExperimentContextProvider>
    );
  }
}

class ExperimentBase extends React.Component {
  static displayName = "Experiment";
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    onLoad: PropTypes.func.isRequired,
    createExperiment: PropTypes.func.isRequired,
    experiments: PropTypes.object.isRequired
  };

  state = { activeVariantId: null };

  componentDidMount() {
    const { name, onLoad } = this.props;
    const variants = this.getVariantData();
    this.props.createExperiment({ name, variants, onLoad });
  }

  getVariantData = () => {
    const data = {};
    React.Children.forEach(this.props.children, variant => {
      data[variant.props.name] = parseInt(variant.props.weight, 10);
    });
    return data;
  };

  render() {
    const experiment = this.props.experiments[this.props.name];
    if (!experiment) return null;

    return (
      this.props.children.find(
        variant => variant.props.name === experiment.activeVariant
      ) || null
    );
  }
}

class VariantBase extends Component {
  static displayName = "Variant";
  static propTypes = {
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    children: PropTypes.node
  };

  render() {
    return this.props.children || null;
  }
}

class ActiveVariantBase extends Component {
  static displayName = "ActiveVariant";
  static propTypes = {
    experiments: PropTypes.object.isRequired,
    experiment: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  render() {
    const experiment = this.props.experiments[this.props.experiment];
    if (!experiment) return null;
    const match = experiment.activeVariant === this.props.variant;

    return match ? this.props.children : null;
  }
}

function withExperiments(WrappedComponent) {
  return class ComponentWithExperiments extends Component {
    static displayName = `withExperiments(${getDisplayName(WrappedComponent)})`;
    render() {
      return (
        <ExperimentConsumer>
          {context => (
            <WrappedComponent
              {...this.props}
              experiments={context.experiments}
              createExperiment={context.createExperiment}
              removeExperiment={context.removeExperiment}
              setExperimentVariant={context.setExperimentVariant}
            />
          )}
        </ExperimentConsumer>
      );
    }
  };
}

export { ExperimentProvider };
export { ExperimentConsumer };
export { withExperiments };
export const Experiment = withExperiments(ExperimentBase);
export const Variant = withExperiments(VariantBase);
export const ActiveVariant = withExperiments(ActiveVariantBase);
