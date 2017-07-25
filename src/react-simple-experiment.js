import React from 'react'
import PropTypes from 'prop-types'
import pickOneByWeight from 'pick-one-by-weight'
import Storage from './storage'

const storage = Storage({name: 'react-simple-experiment'})

export class Experiment extends React.Component {
  static displayName = 'Experiment'
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    onLoad: PropTypes.func.isRequired
  }

  static defaultProps = {
    onLoad: () => {}
  }

  state = {variant: null}

  componentWillMount () {
    const storageName = `experiment--${this.props.name}`
    const variantNames = []
    const data = {}

    React.Children.forEach(this.props.children, variant => {
      variantNames.push(variant.props.name)
      data[variant.props.name] = parseInt(variant.props.weight, 10)
    })

    storage.getItem(storageName).then(variant => {
      if (!variant || !variantNames.includes(variant) || data[variant] < 1) {
        variant = pickOneByWeight(data)
        storage.setItem(storageName, variant)
      }

      this.setState({variant}, () => {
        this.props.onLoad(this.props.name, variant)
      })
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.variant !== this.state.variant
  }

  render () {
    if (!this.state.variant) {
      return null
    } else {
      const variant = this.props.children.find(
        child => child.props.name === this.state.variant
      )
      return variant || null
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

  render () {
    return this.props.children
  }
}
