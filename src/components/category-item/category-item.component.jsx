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
    if (event.target.tagName === 'circle') return // was using created ref to prevent the redirecting, but redirect path[0] was throwing error because event.path was undefined, so this condition is sufficient for this particular functionality

    this.setState({ ...this.state, redirectToProductPage: true })
    // if (!this.state.redirectToProductPage) {
    // } else {
    //   this.setState({ ...this.state, redirectToProductPage: false })
    // }
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

    // if (this.props.product.name === 'iMac 2021') console.log(this.props.product)
    // console.log(this.props.product)
    const [defaultAttributes] = attributes.filter((attributeObj) => {
      return attributeObj === (undefined || null)
    }) // setting default attributes for product for add cart functionality from PLP

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
                    onMouseLeave={this.hoverOverHandler} // on hover effect
                    inStock={inStock}
                    onClick={this.redirectProduct} // redirect to products page
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

// details page (params)
// cart functionality
