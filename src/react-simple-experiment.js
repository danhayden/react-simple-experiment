import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import pickByWeight from './pick-by-weight'
import Storage from './storage'

const storage = Storage({name: 'react-simple-experiment'})

export class Experiment extends React.Component {
  static displayName = 'Experiment'
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    onLoad: PropTypes.func.isRequired,
    querystringName: PropTypes.string
  }

  static defaultProps = {
    onLoad: () => {},
    querystringName: 'experiment-variant'
  }

  state = {variant: null}

  componentWillMount() {
    this.storageName = `experiment--${this.props.name}`
    this.pickVariant()
  }

  pickVariant = () => {
    const querystring = queryString.parse(window.location.search)
    const queryVariant = querystring[this.props.querystringName]
    if (queryVariant) {
      this.setVariant(queryVariant)
    } else {
      storage.getItem(this.storageName).then(this.setVariant)
    }
  }

  getVariantData = () => {
    const variantNames = []
    const data = {}
    React.Children.forEach(this.props.children, variant => {
      variantNames.push(variant.props.name)
      data[variant.props.name] = parseInt(variant.props.weight, 10)
    })
    return {data, variantNames}
  }

  setVariant = variant => {
    const {data, variantNames} = this.getVariantData()
    if (!variant || !variantNames.includes(variant) || data[variant] < 1) {
      variant = pickByWeight(data)
    }
    storage.setItem(this.storageName, variant).then(() => {
      this.activateVariant(variant)
    })
  }

  activateVariant = variant => {
    this.setState({variant}, () => {
      this.props.onLoad(this.props.name, variant)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  getVariant = () => {
    return this.props.children.find(
      child => child.props.name === this.state.variant
    )
  }

  render() {
    if (!this.state.variant) {
      return null
    } else {
      return this.getVariant() || null
    }
  }
}

export class Variant extends React.Component {
  static displayName = 'Variant'
  static propTypes = {
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    children: PropTypes.node
  }

  render() {
    return this.props.children
  }
}
