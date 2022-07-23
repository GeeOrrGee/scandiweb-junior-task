import { Component } from 'react'
import './pdp.styles'
import { withRouter } from 'react-router-dom'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'
import { withParams } from '../../utils/HOCs/withParams'
import {
  AttrContainer,
  AttributesContainer,
  Header,
  ImgsToSelect,
  PriceContainer,
  ProductContainer,
  ProductImgsContainer,
  ProductInfoContainer,
  SelectedImgContainer,
  SwatchAttributeContainer,
  TextAttribute,
  TextAttributeContainer,
} from './pdp.styles'
import { CartContext } from '../../contexts/Cart.context'
import { CurrencyContext } from '../../contexts/currencies.context'

const SELECTED_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name

      inStock
      gallery
      category
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      brand
    }
  }
`

class ProductDetails extends Component {
  constructor(props) {
    super(props)

    // console.log(this.props);
    this.state = {
      activeImg: 0, // referencing imgs by array index numbers
      attributeActive: '',
    }

    this.selectImgHandler = this.selectImgHandler.bind(this)
    this.selectAttributeHandler = this.selectAttributeHandler.bind(this)
  }

  selectImgHandler(event) {
    const selectedImgId = parseInt(event.target.dataset.imgId)

    this.setState({
      ...this.state,
      activeImg: selectedImgId,
    })
  }

  selectAttributeHandler(attribute, name) {
    console.log(this.state[name]?.id === attribute.id)
    if (attribute.id === this.state[name]?.id) {
      return null
    }
    this.setState({ ...this.state, [name]: attribute })
  }

  render() {
    const productId = this.props.params.productId

    return (
      <Query variables={{ id: productId }} query={SELECTED_PRODUCT}>
        {({ data, loading }) => {
          if (loading) {
            return <h2>spinner</h2>
          } else {
            const { product } = data
            const {
              inStock,
              gallery,
              id,
              description,
              categories,
              prices,
              brand,
              attributes,
              name,
            } = product
            console.log(attributes)
            return (
              <CurrencyContext.Consumer>
                {({ activeCurrency }) => {
                  const { amount, currency } = prices.find(
                    ({ amount, currency }) => currency.label === activeCurrency,
                  )
                  return (
                    <CartContext.Consumer>
                      {(addCartItem) => (
                        <ProductContainer>
                          <ProductImgsContainer>
                            <ImgsToSelect>
                              {gallery.map((imgUrl, index) => (
                                <img
                                  key={imgUrl}
                                  onClick={this.selectImgHandler}
                                  data-img-id={index}
                                  src={imgUrl}
                                  alt={`${brand} ${name}`}
                                />
                              ))}
                            </ImgsToSelect>
                            <SelectedImgContainer>
                              <img
                                src={gallery[this.state.activeImg]}
                                alt={`${brand} ${name}`}
                              />
                            </SelectedImgContainer>
                          </ProductImgsContainer>

                          <ProductInfoContainer>
                            <Header>
                              <h2>{brand}</h2>
                              <span>{name}</span>
                            </Header>
                            <AttributesContainer>
                              {attributes.map((attributeSet) => (
                                <>
                                  {' '}
                                  <h3>{attributeSet.name}</h3>
                                  <AttrContainer key={attributeSet.id}>
                                    {attributeSet.type === 'swatch' ? (
                                      // returns swatch type of attributeset jsx, just as color changing blocks
                                      <>
                                        {attributeSet.items.map((attribute) => (
                                          <SwatchAttributeContainer
                                            color={attribute.value}
                                            key={attribute.id}
                                            className={
                                              attribute.id ===
                                              this.state[attributeSet.name]?.id
                                                ? 'active-swatch-attribute'
                                                : ''
                                            }
                                            onClick={this.selectAttributeHandler.bind(
                                              null,
                                              attribute,
                                              attributeSet.name,
                                            )}
                                          ></SwatchAttributeContainer>
                                        ))}
                                      </>
                                    ) : (
                                      <>
                                        {attributeSet.items.map(
                                          (attribute, index) => (
                                            <TextAttribute
                                              key={attribute.id}
                                              onClick={this.selectAttributeHandler.bind(
                                                null,
                                                attribute,
                                                attributeSet.name,
                                              )}
                                              className={
                                                attribute.id ===
                                                this.state[attributeSet.name]
                                                  ?.id
                                                  ? 'active-text-attribute'
                                                  : ''
                                              }
                                            >
                                              {attribute.displayValue}
                                            </TextAttribute>
                                          ),
                                        )}
                                      </>
                                    )}
                                  </AttrContainer>
                                </>
                              ))}
                            </AttributesContainer>
                            <PriceContainer>
                              <span>Price:</span>
                              <span>{`${currency.symbol} ${amount}`}</span>
                            </PriceContainer>
                          </ProductInfoContainer>
                        </ProductContainer>
                      )}
                    </CartContext.Consumer>
                  )
                }}
              </CurrencyContext.Consumer>
            )
          }
        }}
      </Query>
    )
  }
}

export default withParams(ProductDetails)
