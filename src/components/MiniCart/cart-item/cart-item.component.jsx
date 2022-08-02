import { Component } from 'react'
import { Backdrop } from '../../../shared/Backdrop/backdrop.component'
import { CartContext } from '../../../contexts/Cart.context'
import { CurrencyContext } from '../../../contexts/currencies.context'
import {
  AttrContainer,
  AttributesContainer,
  ButtonsContainer,
  Header,
  ImgContainer,
  LeftSide,
  ProductContainer,
  RightSide,
} from './cart-item.styles'
import { CustomButton } from '../../../shared/customButton/customButton.component'
class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
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
    } = this.props.product
    const { addCartItem, removeCartItem } = this.props
    const [{ amount, currency }] = prices.filter(
      (priceObj) => priceObj.currency.label === this.props.activeCurrency,
    )
    const amountPerItem = amount * quantity
    console.log(attributes)
    return (
      <ProductContainer key={`${id}/${quantity}`}>
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
                <div>
                  {attributeSet.items.map((item) => (
                    <CustomButton
                      size={'small'}
                      color={attributeSet.type === 'swatch' ? item.value : null}
                      className={
                        item.selected
                          ? `active-${attributeSet.type}-attribute`
                          : ''
                      }
                      btnType={attributeSet.type}
                    >
                      {attributeSet.type === 'text' ? item.value : ''}
                    </CustomButton>
                  ))}
                </div>
              </AttrContainer>
            ))}
          </AttributesContainer>
        </LeftSide>
        <RightSide>
          <ButtonsContainer>
            <CustomButton
              btnType="text"
              size="medium"
              onClick={addCartItem.bind(null, this.props.product)}
            >
              +
            </CustomButton>
            <span>{quantity}</span>
            <CustomButton
              btnType="text"
              size="medium"
              onClick={removeCartItem.bind(null, this.props.product)}
            >
              -
            </CustomButton>
          </ButtonsContainer>
          <ImgContainer>
            <img src={gallery[0]} alt={`$${brand}${name}`} />
          </ImgContainer>
        </RightSide>
      </ProductContainer>
    )
  }
}

export default CartItem
