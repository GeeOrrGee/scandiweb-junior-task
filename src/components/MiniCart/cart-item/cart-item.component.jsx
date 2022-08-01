import { Component } from 'react'
import { Backdrop } from '../../../shared/Backdrop/backdrop.component'
import { CartContext } from '../../../contexts/Cart.context'
import { CurrencyContext } from '../../../contexts/currencies.context'
import {
  AttrContainer,
  AttributesContainer,
  Header,
  LeftSide,
  ProductContainer,
} from './cart-item.styles'
import { CustomButton } from '../../../shared/customButton/customButton.component'
class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <CurrencyContext.Consumer>
        {({ activeCurrency }) => {
          return (
            <CartContext.Consumer>
              {({
                cart,
                cartQuantity,
                totalValue,
                addCartItem,
                removeCartItem,
              }) => {
                return !cart.length ? (
                  <span>Your cart is empty</span>
                ) : (
                  cart.map((cartItem) => {
                    const {
                      inStock,
                      gallery,
                      description,
                      prices,
                      brand,
                      attributes,
                      name,
                      id,
                      quantity,
                    } = cartItem
                    const [{ amount, currency }] = prices.filter(
                      (priceObj) => priceObj.currency.label === activeCurrency,
                    )
                    const amountPerItem = amount * quantity
                    console.log(attributes)
                    return (
                      <ProductContainer key={id}>
                        <LeftSide>
                          <Header>
                            <span>{brand}</span>
                            <span>{name}</span>
                          </Header>
                          <span>
                            {currency.symbol}
                            {amountPerItem}
                          </span>
                          <AttributesContainer>
                            {attributes.map((attributeSet) => (
                              <AttrContainer>
                                <span>{attributeSet.name}</span>
                                <div></div>
                              </AttrContainer>
                            ))}
                          </AttributesContainer>
                        </LeftSide>
                      </ProductContainer>
                    )
                  })
                )
              }}
            </CartContext.Consumer>
          )
        }}
      </CurrencyContext.Consumer>
    )
  }
}

export default CartItem
