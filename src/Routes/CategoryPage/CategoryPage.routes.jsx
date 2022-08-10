import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductDetails from '../ProductDetails/pdp.component'
import ProductsList from './PLP/productsList.component'

class CategoryPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name } = this.props

    return (
      <Routes>
        <Route index element={<ProductsList name={name} />} />
        <Route path={`/:productId`} element={<ProductDetails />} />
      </Routes>
    )
  }
}

export default CategoryPage
