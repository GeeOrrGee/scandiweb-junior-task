import { Component } from 'react'
import './products-list.styles'
import { Query } from '@apollo/client/react/components'
import CategoryItem from '../../../components/category-item/category-item.component'
import {
  CategorySectionContainer,
  ProductsListContainer,
} from './products-list.styles'
import { Spinner } from '../../../shared/spinner/spinner.styles'
import { CATEGORY_DATA } from './PLP.queries'
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
    const { name } = this.props

    return (
      <Query variables={{ title: name }} query={CATEGORY_DATA}>
        {({ data, loading }) => {
          if (loading) {
            return <Spinner />
          } else {
            const {
              category: { products },
            } = data
            console.log(products)
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
        }}
      </Query>
    )
  }
}

export default ProductsList
