import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import pickByWeight from "./pick-by-weight";
import Storage from "./storage";

const storage = Storage({ name: "react-simple-experiment" });
const experimentStoragePrefix = "experiment--";
const variantsStoragePrefix = "variants--";

export class Experiment extends React.Component {
  static displayName = "Experiment";
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    onLoad: PropTypes.func.isRequired
  };

  static defaultProps = {
    onLoad: () => {}
  };

  state = { variant: null };

  componentDidMount() {
    this.experimentStorageName = experimentStoragePrefix + this.props.name;
    this.variantsStorageName = variantsStoragePrefix + this.props.name;
    this.variants = this.getVariantData();
    this.storePossibleVariants();
    this.pickVariant();
  }

  pickVariant = () => {
    storage.getItem(this.experimentStorageName).then(this.setActiveVariant);
  };

  getVariantData = () => {
    const ids = [];
    const weightsById = {};
    React.Children.forEach(this.props.children, variant => {
      ids.push(variant.props.name);
      weightsById[variant.props.name] = parseInt(variant.props.weight, 10);
    });
    return { weightsById, ids };
  };

  setActiveVariant = variant => {
    const { weightsById, ids } = this.variants;
    if (!variant || !ids.includes(variant) || weightsById[variant] < 1) {
      variant = pickByWeight(weightsById);
    }
    storage.setItem(this.experimentStorageName, variant).then(() => {
      this.activateVariant(variant);
    });
  };

  storePossibleVariants = variant => {
    storage.setItem(this.variantsStorageName, this.variants.weightsById);
  };

  activateVariant = variant => {
    this.setState({ variant }, () => {
      this.props.onLoad(this.props.name, variant);
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  getVariant = () => {
    return this.props.children.find(
      child => child.props.name === this.state.variant
    );
  };

  render() {
    if (!this.state.variant) {
      return null;
    } else {
      return this.getVariant() || null;
    }
  }
}

export class Variant extends React.Component {
  static displayName = "Variant";
  static propTypes = {
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    children: PropTypes.node
  };

  render() {
    return this.props.children;
  }
}

export class ExperimentQueryString extends Component {
  static displayName = "ExperimentQueryString";

  static defaultProps = {
    querystringName: "exp",
    querystringDivider: "||"
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
    querystringName: PropTypes.string.isRequired,
    querystringDivider: PropTypes.string.isRequired
  };

  componentDidMount() {
    const params = this.getExperimentparams();
    this.setActiveExperiments(params);
  }

  getExperimentparams = () => {
    const { location, querystringName } = this.props;
    const params = queryString.parse(location.search)[querystringName] || [];
    return Array.isArray(params) ? params : [params];
  };

  setActiveExperiments = params => {
    const { querystringDivider } = this.props;
    for (const param in params) {
      const [experimentId, variantId] = params[param].split(querystringDivider);
      storage.setItem(experimentStoragePrefix + experimentId, variantId);
    }
  };

  render() {
    return null;
  }
}

export class ExperimentManager extends Component {
  static displayName = "ExperimentManager";

  static propTypes = {
    location: PropTypes.object.isRequired,
    querystringName: PropTypes.string,
    component: PropTypes.func,
    render: PropTypes.func,
    show: PropTypes.bool,
    children: (props, propName, componentName) => {
      if (
        typeof props[propName] !== "function" &&
        typeof props["component"] !== "function" &&
        typeof props["render"] !== "function"
      ) {
        return new Error(
          `Please provide either a render function as the \`children\` or \`render\` prop of ${componentName} or a component as the \`component\` prop`
        );
      }
    }
  };

  static defaultProps = {
    querystringName: "exps"
  };

  getExperiments = () => {
    return storage.getStore().then(data => {
      const experiments = {};
      for (const item in data) {
        const { type, experimentId } = getStoredItemTypeExperimentId(item);
        experiments[experimentId] = experiments[experimentId] || {
          activeVariant: null,
          variants: []
        };
        if (type === "experiment") {
          experiments[experimentId].activeVariant = data[item];
        } else if (type === "variants") {
          experiments[experimentId].variants = data[item];
        }
      }
      return experiments;
    });
  };

  getExperiment = experimentId => {
    return storage.getItem(experimentStoragePrefix + experimentId);
  };

  setExperiment = (experimentId, variantId) => {
    return storage.setItem(experimentStoragePrefix + experimentId, variantId);
  };

  removeExperiment = experimentId => {
    return storage.removeItem(experimentStoragePrefix + experimentId);
  };

  shouldShowManager = () => {
    const { show, location, querystringName } = this.props;
    return show || queryString.parse(location.search)[querystringName] || false;
  };

  render() {
    const { children, render, component } = this.props;
    const renderProp = children || render;
    const props = {
      getExperiments: this.getExperiments,
      getExperiment: this.getExperiment,
      setExperiment: this.setExperiment,
      removeExperiment: this.removeExperiment
    };

    const shouldShowManager = this.shouldShowManager();

    if (!shouldShowManager) return null;
    if (typeof renderProp === "function") return renderProp(props);
    if (component) return React.createElement(component, props);
    return null;
  }
}

function getStoredItemTypeExperimentId(item) {
  const splitter = "--";
  const splitterIndex = item.indexOf(splitter);
  const type = item.substring(0, splitterIndex);
  const experimentId = item.substring(splitterIndex + splitter.length);
  return { type, experimentId };
}
