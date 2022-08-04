import { Component } from 'react'
import { CustomButton } from '../../shared/customButton/customButton.component'
import CartItem from './cart-item/cart-item.component'
import { Link } from 'react-router-dom'
import {
  CheckoutButtonsContainer,
  MinicartContainer,
  ProductsContainer,
  TotalValueContainer,
} from './minicart.styles'
import { CurrencyContext } from '../../contexts/currencies.context'
import { CartContext } from '../../contexts/Cart.context'
import Backdrop from '../../shared/Backdrop/backdrop.component'
import CheckoutModal from '../CheckOutModal/checkout-modal.component'
class MiniCart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checkOutModal: false,
    }
  }

  checkOutHandler = (clearCartItems, cart, activeCurrency = 'USD') => {
    const cartWithFilteredPrice = cart.map((cartItem) => {
      const filteredPriceItem = cartItem.prices.filter(
        (priceObj) => priceObj.currency.label === activeCurrency,
      )
      const filteredAttributes = cartItem.attributes
        .filter((attributeSet) =>
          attributeSet.items.filter((item) => item.selected === true),
        ) //filtering the attributeSets first
        .map((filteredAttr) => {
          const filteredItem = filteredAttr.items.filter(
            (item) => item.selected === true,
          )
          return { ...filteredAttr, items: filteredItem }
        }) //filtering unselected items on selected attributeSet

      return {
        ...cartItem,
        prices: filteredPriceItem,
        attributes: filteredAttributes, // filtering final cart for final POST request
      }
    })
    console.log(cartWithFilteredPrice) // for you to see the final products
    this.setState({ ...this.state, checkOutModal: true })
    return clearCartItems()
  }

  componentDidMount() {
    const prevState = JSON.parse(localStorage.getItem('minicartState'))
    if (prevState === null || undefined) return
    this.setState({ ...prevState })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state)
      localStorage.setItem('minicartState', JSON.stringify(this.state))
  }

  componentWillUnmount() {
    localStorage.removeItem('minicartState')
  }
  render() {
    return (
      <CurrencyContext.Consumer>
        {({ activeCurrency, currencies }) => {
          return (
            <CartContext.Consumer>
              {({
                cart,
                cartQuantity,
                totalValue,
                addCartItem,
                removeCartItem,
                clearCartItems,
                setIsCartOpen,
              }) => {
                const [{ symbol }] = currencies.filter(
                  (currencyObj) => currencyObj.label === activeCurrency,
                )
                return (
                  <MinicartContainer>
                    {this.state.checkOutModal && (
                      <>
                        <Backdrop
                          onClick={this.checkOutHandler.bind(
                            null,

                            clearCartItems,
                            cart,
                          )}
                        />{' '}
                        <CheckoutModal
                          checkOutHandler={this.checkOutHandler.bind(
                            null,

                            clearCartItems,
                            cart,
                          )}
                        />
                      </>
                    )}
                    {!cart.length ? (
                      <span id="empty-cart">Your cart is empty.</span>
                    ) : (
                      <>
                        <h2>
                          <strong>My Bag,</strong>
                          {cartQuantity} items.
                        </h2>
                        <ProductsContainer>
                          {cart.map((cartItem, index) => (
                            <CartItem
                              key={`${cartItem.id}/${index}`}
                              attributeType="small"
                              product={cartItem}
                              removeCartItem={removeCartItem}
                              addCartItem={addCartItem}
                              activeCurrency={activeCurrency} //forgive this prop drilling :)
                            />
                          ))}
                        </ProductsContainer>
                        <TotalValueContainer>
                          <span>Total:</span>
                          <span>{`${symbol}${totalValue}`}</span>
                        </TotalValueContainer>
                        <CheckoutButtonsContainer>
                          <Link to={'/checkout'}>
                            {' '}
                            <CustomButton
                              btnType={'text'}
                              onClick={() => setIsCartOpen(false)}
                            >
                              View Bag
                            </CustomButton>
                          </Link>
                          <CustomButton
                            btnType={'submit'}
                            inStock={true}
                            onClick={this.checkOutHandler.bind(
                              null,
                              clearCartItems,
                              cart,
                              activeCurrency,
                            )}
                          >
                            Check out
                          </CustomButton>
                        </CheckoutButtonsContainer>
                      </>
                    )}
                  </MinicartContainer>
                )
              }}
            </CartContext.Consumer>
          )
        }}
      </CurrencyContext.Consumer>
    )
  }
}

export default MiniCart
