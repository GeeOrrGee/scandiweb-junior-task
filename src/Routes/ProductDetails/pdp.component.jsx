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
    }

    this.selectImgHandler = this.selectImgHandler.bind(this) // displays image based on the user click
    this.selectAttributeHandler = this.selectAttributeHandler.bind(this) // selects an attribute and dynamically adds the attribute fields name and value in state
    this.addProductHandler = this.addProductHandler.bind(this)
  }

  selectImgHandler(event) {
    const selectedImgId = parseInt(event.target.dataset.imgId)

    this.setState({
      ...this.state,
      activeImg: selectedImgId,
    })
  }

  selectAttributeHandler(attribute, name) {
    if (attribute.id === this.state[name]?.id) {
      //  if the method gets called on the selected attribute, it just returns nothing to prevent unnecessary re-renderings
      return null
    }
    this.setState({ ...this.state, [name]: attribute })
  }

  addProductHandler(product, attributes, addCartItem) {
    const filteredAttributes = attributes.map((attributeSet) => {
      const filteredAttrItems = attributeSet.items.filter(
        (attribute) => attribute.id === this.state[attributeSet.name]?.id,
      )

      return { ...attributeSet, items: filteredAttrItems } // filtering nested items for attributeSet objects
    })

    return addCartItem({ ...product, attributes: filteredAttributes }) // setting cart item with selected attributes / price?
  }

  render() {
    const productId = this.props.params.productId

    console.log(this.state)

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
              category,
              prices,
              brand,
              attributes,
              name,
            } = product

            return (
              <CurrencyContext.Consumer>
                {({ activeCurrency }) => {
                  const { amount, currency } = prices.find(
                    ({ amount, currency }) => currency.label === activeCurrency,
                  )
                  return (
                    <CartContext.Consumer>
                      {({ addCartItem, cart }) => (
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
                              {/* mapping on the attributeSets of the products */}
                              {attributes.map((attributeSet, index) => (
                                <>
                                  {' '}
                                  <h3>{attributeSet.name}</h3>
                                  <AttrContainer key={attributeSet.id}>
                                    {attributeSet.type === 'swatch' ? (
                                      // returns swatch type of attributeset jsx, just as color changing blocks
                                      <>
                                        {/*  SWATCH ATTRIBUTE COMPONENT */}
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
                                      // NON SWATCH ATTRIBUTESET COMPONENT
                                      <>
                                        {attributeSet.items.map((attribute) => (
                                          <TextAttribute
                                            key={attribute.id}
                                            onClick={this.selectAttributeHandler.bind(
                                              null,
                                              attribute,
                                              attributeSet.name, // passing attribute to handler to dynamically set the relevant property in state with appropriate value(attribtueObject)
                                            )}
                                            className={
                                              attribute.id ===
                                              this.state[attributeSet.name]?.id
                                                ? 'active-text-attribute'
                                                : ''
                                            }
                                          >
                                            {attribute.displayValue}
                                          </TextAttribute>
                                        ))}
                                      </>
                                    )}
                                  </AttrContainer>
                                </>
                              ))}
                            </AttributesContainer>
                            <PriceContainer>
                              <span
                                onClick={this.addProductHandler.bind(
                                  null,
                                  product,
                                  attributes,
                                  addCartItem,
                                )}
                              >
                                Price:
                              </span>
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
