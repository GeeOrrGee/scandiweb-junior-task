import { Component } from 'react'
import { ReactComponent as VectorLeft } from '../../../assets/vectors/Vector-Left.svg'
import { ReactComponent as VectorRight } from '../../../assets/vectors/Vector-Right.svg'
import {
  ArrowButtonsContainer,
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
import { ThinGreyLine } from '../../../shared/thinLine/thin-line.styles'
class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImgIndex: 0,
    }
  }

  imgSwitchHandler = (type, gallery) => {
    const lastIndex = gallery.length - 1
    if (type === 'left') {
      return this.setState({
        currentImgIndex:
          this.state.currentImgIndex === 0
            ? lastIndex
            : this.state.currentImgIndex - 1,
      })
    } else if (type === 'right') {
      return this.setState({
        currentImgIndex:
          this.state.currentImgIndex === lastIndex
            ? 0
            : this.state.currentImgIndex + 1,
      })
    }
  }

  render() {
    const { gallery, prices, brand, attributes, name, quantity } =
      this.props.product
    const { addCartItem, removeCartItem } = this.props
    const [{ amount, currency }] = prices.filter(
      (priceObj) => priceObj.currency.label === this.props.activeCurrency,
    )

    return (
      <>
        <ProductContainer>
          <LeftSide>
            <Header>
              <span>{brand}</span>
              <span>{name}</span>
            </Header>
            <span>
              {currency.symbol}
              {amount}
            </span>
            <AttributesContainer>
              {attributes.map((attributeSet) => (
                <AttrContainer key={attributeSet.id}>
                  <span>{attributeSet.name}</span>
                  <div>
                    {attributeSet.items.map((item) => (
                      <CustomButton
                        key={item.id}
                        size={this.props.attributeType}
                        color={
                          attributeSet.type === 'swatch' ? item.value : null
                        }
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
                size={this.props.attributeType}
                onClick={addCartItem.bind(null, this.props.product)}
              >
                +
              </CustomButton>
              <span>{quantity}</span>
              <CustomButton
                size={this.props.attributeType}
                btnType="text"
                onClick={removeCartItem.bind(null, this.props.product)}
              >
                -
              </CustomButton>
            </ButtonsContainer>
            <ImgContainer>
              {this.props.onCartPage ? (
                <>
                  <img
                    src={`${gallery[this.state.currentImgIndex]}`}
                    alt={`$${brand}${name}`}
                  />
                  {gallery.length > 1 && (
                    <ArrowButtonsContainer>
                      <div
                        onClick={this.imgSwitchHandler.bind(
                          null,
                          'left',
                          gallery,
                        )}
                      >
                        <VectorLeft />
                      </div>
                      <div
                        onClick={this.imgSwitchHandler.bind(
                          null,
                          'right',
                          gallery,
                        )}
                      >
                        <VectorRight />
                      </div>
                    </ArrowButtonsContainer>
                  )}
                </>
              ) : (
                <img
                  src={gallery[this.state.currentImgIndex]}
                  alt={`$${brand}${name}`}
                />
              )}
            </ImgContainer>
          </RightSide>
          {this.props?.currIndex !== this.props?.cartLength && (
            <ThinGreyLine top={'130'} />
          )}
        </ProductContainer>
      </>
    )
  }
}

export default CartItem
