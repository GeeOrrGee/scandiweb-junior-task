import { Component } from 'react'
import { ThinGreyLine } from '../../shared/thinLine/thin-line.styles'
import {
  CartContainer,
  CheckoutContainer,
  FinalResults,
  NoItemsContainer,
} from './checkout.styles'
import { CartContext } from '../../contexts/Cart.context'
import { CurrencyContext } from '../../contexts/currencies.context'
import CartItem from '../../components/MiniCart/cart-item/cart-item.component'
import { CustomButton } from '../../shared/customButton/customButton.component'
import { Link } from 'react-router-dom'
import CheckoutModal from '../../components/CheckOutModal/checkout-modal.component'
import Backdrop from '../../shared/Backdrop/backdrop.component'

class CheckoutPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orderSubmit: false,
    }
  }

  handleOrderSubmit = (clearCartItems, cart = []) => {
    this.setState({ ...this.state, orderSubmit: !this.orderSubmit })
    if (!cart.length) return
    clearCartItems()
    return
  }

  render() {
    return (
      <CurrencyContext.Consumer>
        {({ activeCurrency, activeCurrencySymbol }) => {
          return (
            <CartContext.Consumer>
              {({
                cart,
                cartQuantity,
                totalValue,
                addCartItem,
                removeCartItem,
                clearCartItems,
              }) => {
                const taxValue = (totalValue * 21) / 100

                return (
                  <>
                    {cart.length ? (
                      <CheckoutContainer>
                        <h2>Cart</h2>
                        <CartContainer>
                          <ThinGreyLine top={'-17'} />
                          {cart.map((cartItem, index) => {
                            return (
                              <>
                                {' '}
                                <CartItem
                                  onCartPage={true}
                                  attributeType=""
                                  product={cartItem}
                                  removeCartItem={removeCartItem}
                                  addCartItem={addCartItem}
                                  activeCurrency={activeCurrency}
                                  currIndex={index}
                                  cartLength={cart.length}
                                />
                              </>
                            )
                          })}
                        </CartContainer>
                        <FinalResults>
                          <p>
                            Tax 21%:{' '}
                            <strong>{`${activeCurrencySymbol}${taxValue.toFixed(
                              2,
                            )}`}</strong>
                          </p>
                          <p>
                            Quantity: <strong>{cartQuantity}</strong>
                          </p>
                          <p>
                            Total:
                            <strong>{` ${activeCurrencySymbol}${totalValue}`}</strong>
                          </p>
                          <CustomButton
                            inStock={true}
                            btnType={'submit'}
                            onClick={this.handleOrderSubmit.bind(
                              null,
                              clearCartItems,
                              cart,
                            )}
                          >
                            ORDER
                          </CustomButton>
                        </FinalResults>
                      </CheckoutContainer>
                    ) : (
                      <>
                        {!this.state.orderSubmit && (
                          <NoItemsContainer>
                            <p>There are no items left in the cart.</p>
                            <Link to={'/'}>
                              <CustomButton inStock={true} btnType={'submit'}>
                                RETURN TO HOMEPAGE
                              </CustomButton>
                            </Link>
                          </NoItemsContainer>
                        )}
                      </>
                    )}
                    {this.state.orderSubmit && (
                      <>
                        <CheckoutModal
                          checkOutHandler={this.handleOrderSubmit}
                        />
                        <Backdrop type={'standard'} />
                      </>
                    )}
                  </>
                )
              }}
            </CartContext.Consumer>
          )
        }}
      </CurrencyContext.Consumer>
    )
  }
}

export default CheckoutPage
