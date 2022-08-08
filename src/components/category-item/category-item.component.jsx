import { Component, createRef } from 'react'
import { CurrencyContext } from '../../contexts/currencies.context'
import './category-item.styles'
import { Navigate } from 'react-router-dom'
import {
  ProductContainer,
  ProductImgContainer,
  ProductHoverIcon,
  ProductInfoContainer,
} from './category-item.styles'
import { CartContext } from '../../contexts/Cart.context'

class CategoryItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverIcon: false,
      redirectToProductPage: false,
    }
    this.toggleHoverIcon = this.toggleHoverIcon.bind(this)
    this.redirectProduct = this.redirectProduct.bind(this)
    this.hoverOverHandler = this.hoverOverHandler.bind(this)
    this.cartClickHandler = this.cartClickHandler.bind(this)
    this.cartIconRef = createRef()
  }

  componentDidMount() {
    window.addEventListener('resize', this.toggleHoverIcon)
    this.toggleHoverIcon()
  }
  toggleHoverIcon() {
    const getWindowWidth = window.innerWidth
    if (getWindowWidth < 761) {
      this.setState({ ...this.state, hoverIcon: true })
    } else {
      this.setState({ hoverIcon: false })
    }
  }

  redirectProduct(event) {
    if (event.target.tagName === 'circle') return

    this.setState({
      ...this.state,
      redirectToProductPage: !this.state.redirectToProductPage,
    })
  }

  hoverOverHandler() {
    this.setState({
      ...this.state,
      hoverIcon: !this.state.hoverIcon,
    })
  }

  cartClickHandler(product, addCartItem) {
    if (product.attributes.length) return

    return addCartItem(product)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.toggleHoverIcon)
  }

  render() {
    const { prices, inStock, gallery, name, brand, category, attributes, id } =
      this.props.product

    return (
      <CurrencyContext.Consumer>
        {({ activeCurrency }) => {
          const { amount, currency } = prices.find(
            ({ amount, currency }) => currency.label === activeCurrency,
          ) // finding price by currency context

          return (
            <CartContext.Consumer>
              {({ addCartItem }) => (
                <>
                  {this.state.redirectToProductPage && (
                    <Navigate to={`/${category}/${id}`} />
                  )}

                  <ProductContainer
                    onMouseEnter={this.hoverOverHandler}
                    onMouseLeave={this.hoverOverHandler}
                    inStock={inStock}
                    onClick={this.redirectProduct}
                  >
                    <ProductImgContainer>
                      <img src={gallery[0]} alt={name} />
                      {this.state.hoverIcon && (
                        <ProductHoverIcon
                          attributes={attributes}
                          style={{ zIndex: '5' }}
                          ref={this.cartIconRef} // to add product from PLP , as it was noted on FAQ
                          onClick={this.cartClickHandler.bind(
                            null,
                            this.props.product,
                            addCartItem,
                          )} // passing product into the cart context setState
                        />
                      )}
                    </ProductImgContainer>
                    <ProductInfoContainer>
                      <p>{`${brand} ${name}`}</p>
                      <span>{`${currency.symbol} ${amount}`}</span>
                    </ProductInfoContainer>
                  </ProductContainer>
                </>
              )}
            </CartContext.Consumer>
          )
        }}
      </CurrencyContext.Consumer>
    )
  }
}

export default CategoryItem
