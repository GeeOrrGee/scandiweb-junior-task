import { Component } from 'react'
import './category-page.styles'
import CategoryItem from '../../../components/category-item/category-item.component'
import {
  CategorySectionContainer,
  ProductsListContainer,
} from './category-page.styles'
class ProductsList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { name, products } = this.props

    // const capitalizedName =
    //     name.charAt(0).toUpperCase() + name.substring(1);
    // console.log(capitalizedName); //  used css :)
    return (
      <CategorySectionContainer>
        <h2>{name}</h2>
        <ProductsListContainer>
          {products.map((product) => (
            <CategoryItem key={product.id} product={product} />
          ))}
        </ProductsListContainer>
      </CategorySectionContainer>
    )
  }
}

export default ProductsList
