import React from 'react'
import Colors from './Colors'
import Products from './Products'
import Embellishments from './Embellishments'
import utils from '../lib/utilities'
import metaData from '../lib/metaData'

//
//  TestParams
//

export default class TestParams extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: new Set(),
      colors: new Set(),
      embellishments: new Set()
    }

    this.handleProductChange = this.handleProductChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleEmbellishmentChange = this.handleEmbellishmentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleProductChange (event) {
    let selected = event.target.value
    let products

    // eslint-disable-next-line
    return this.state.products.has(selected) ? (
      this.state.products.delete(selected),
      this.setState({ products: this.state.products })
    ) : (
      products = this.state.products.add(selected),
      this.setState({ products })
    )
  }

  handleColorChange (event) {
    let selected = event.target.value
    let colors

    // eslint-disable-next-line
    return this.state.colors.has(selected) ? (
      this.state.colors.delete(selected),
      this.setState({ colors: this.state.colors })
    ) : (
      colors = this.state.colors.add(selected),
      this.setState({ colors })
    )
  }

  handleEmbellishmentChange (event) {
    let selected = event.target.value
    let embellishments

    // eslint-disable-next-line
    return this.state.embellishments.has(selected) ? (
      this.state.embellishments.delete(selected),
      this.setState({ embellishments: this.state.embellishments })
    ) : (
      embellishments = this.state.embellishments.add(selected),
      this.setState({ embellishments })
    )
  }

  handleSubmit (event) {
    // TODO: pass form to test runner to begin running automated tests;
    let cleanStrings = utils.cleanStrings(this.state)
    console.log(cleanStrings)
    window.YETI.customizer.open()
    event.preventDefault()
  }

  handleReset () {
    // this does not work because when component handles change the first click after registeres as selected already
    // this.setState({ products: new Set(), colors: new Set() })
  }

  render () {
    const renderedProducts = Object.values(metaData.products).map(curr => utils.renderProducts(curr))
    const renderedColors = Object.values(metaData.colors).map(curr => utils.renderColors(curr))
    const renderedEmbellishments = Object.keys(metaData.embellishments).map(curr => utils.renderEmbellishments(curr))

    return (
      <form id="form" onSubmit={this.handleSubmit} onReset={this.handleReset}>

        <Products onChange={this.handleProductChange} renderedProducts={renderedProducts} />
        <Colors onChange={this.handleColorChange} renderedColors={renderedColors} />
        <Embellishments onChange={this.handleEmbellishmentChange} renderedEmbellishments={renderedEmbellishments} />

        <input type="submit" value="Test" />
        <input type="reset" value="Reset" />

      </form>
    )
  }
}
