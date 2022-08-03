import { Component } from 'react'
import './products-list.styles'
import CategoryItem from '../../../components/category-item/category-item.component'
import {
  CategorySectionContainer,
  ProductsListContainer,
} from './products-list.styles'
class ProductsList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getScrollPosition = () => {
    const scrollPos = window.scrollY
    localStorage.setItem('PLPScrollPos', JSON.stringify(scrollPos))
  }
  componentDidMount() {
    const scrollPosition = JSON.parse(localStorage.getItem('PLPScrollPos'))
    if (scrollPosition) window.scrollTo(0, scrollPosition)
    window.addEventListener('scroll', this.getScrollPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.getScrollPosition)
  }
  render() {
    const { name, products } = this.props

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
