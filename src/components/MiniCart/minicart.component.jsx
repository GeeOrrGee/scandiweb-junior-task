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

    // this.checkOutHandler = this.checkOutHandler.bind(this)
  }

  checkOutHandler = (clearCartItems, cart) => {
    console.log(cart) // for you to see the final products
    this.setState({ ...this.state, checkOutModal: true })
    return clearCartItems()
  }

  componentWillUnmount() {
    this.setState({ ...this.state, checkOutModal: false })
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
                console.log(currencies)
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
                          {cart.map((cartItem) => (
                            <CartItem
                              product={cartItem}
                              removeCartItem={removeCartItem}
                              addCartItem={addCartItem}
                              activeCurrency={activeCurrency}
                            />
                          ))}
                        </ProductsContainer>
                        <TotalValueContainer>
                          <span>Total:</span>
                          <span>{`${symbol}${totalValue}`}</span>
                        </TotalValueContainer>
                        <CheckoutButtonsContainer>
                          <CustomButton btnType={'text'}>
                            <Link to="/checkout">View Bag</Link>
                          </CustomButton>
                          <CustomButton
                            btnType={'submit'}
                            inStock={true}
                            onClick={this.checkOutHandler.bind(
                              null,
                              clearCartItems,
                              cart,
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
