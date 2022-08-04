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

  handleOrderSubmit = (clearCartItems, cart = [], activeCurrency) => {
    this.setState({ ...this.state, orderSubmit: !this.orderSubmit })
    if (!cart.length) return
    const cartWithFilteredPrice = cart.map((cartItem) => {
      const filteredPriceItem = cartItem.prices.filter(
        //just a little optimization
        (priceObj) => priceObj.currency.label === activeCurrency,
      )

      const filteredAttributes = cartItem.attributes
        .filter((attributeSet) =>
          attributeSet.items.filter((item) => item.selected === true),
        )
        .map((filteredAttr) => {
          const filteredItem = filteredAttr.items.filter(
            (item) => item.selected === true,
          )
          return { ...filteredAttr, items: filteredItem }
        })

      return {
        ...cartItem,
        prices: filteredPriceItem,
        attributes: filteredAttributes,
      }
    })
    console.log(cartWithFilteredPrice)
    clearCartItems()
    return
  }

  getScrollPosition = () => {
    const scrollPos = window.scrollY
    localStorage.setItem('CheckoutScrollPos', JSON.stringify(scrollPos))
  }
  componentDidMount() {
    const scrollPosition = JSON.parse(localStorage.getItem('CheckoutScrollPos'))
    if (scrollPosition) window.scrollTo(0, scrollPosition)
    window.addEventListener('scroll', this.getScrollPosition)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.getScrollPosition)
  }

  // TODO: add picture switcher on the cart page, add local storage and review the code/comments, dats it
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
                          <ThinGreyLine top={'-3'} />
                          {cart.map((cartItem, index) => {
                            return (
                              // reusing minicart's cartItem with little bit of configurations
                              <CartItem
                                key={`${cartItem}/${index}`}
                                onCartPage={true}
                                attributeType=""
                                product={cartItem}
                                removeCartItem={removeCartItem}
                                addCartItem={addCartItem}
                                activeCurrency={activeCurrency}
                                currIndex={index}
                                cartLength={cart.length} // forgive this verbose prop drilling :)
                              />
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
                              activeCurrency,
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
                        <CheckoutModal />
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
