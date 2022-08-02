import { Component, Fragment } from 'react'
import './pdp.styles'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'
import { withParams } from '../../utils/HOCs/withParams'
import {
  AttrContainer,
  AttributesContainer,
  DescriptionContainer,
  Header,
  ImgsToSelect,
  PleaseSelectAttributes,
  PriceContainer,
  ProductContainer,
  ProductImgsContainer,
  ProductInfoContainer,
  SelectedImgContainer,
} from './pdp.styles'
import { CartContext } from '../../contexts/Cart.context'
import { CurrencyContext } from '../../contexts/currencies.context'
import DOMPurify from 'dompurify'
import { CustomButton } from '../../shared/customButton/customButton.component'
let sanitizer = DOMPurify.sanitize
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
      unselected: false,
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

  // TODO:  Done here, this function return an array of attributes with the selected properties applied on each, now adapt CartContext logic to this data flow
  addProductHandler(product, attributes, addCartItem) {
    const modifiedAttributes = attributes.map((attributeSet) => {
      const addingSelectedValues = attributeSet.items.map((attributeItem) => {
        const checkValues =
          attributeItem.id === this.state[attributeSet.name]?.id ? true : false
        return { ...attributeItem, selected: checkValues }
      })
      // if (!filteredAttrItem) return null

      return { ...attributeSet, items: addingSelectedValues } // filtering nested items for attributeSet objects
    })

    const selectedAttributesValidation = modifiedAttributes.filter(
      (attributeSet) => attributeSet === null || undefined,
    ) //checking the unselected attributes in selected array

    if (product.attributes.length && selectedAttributesValidation.length) {
      // to prevent adding item to cart ONLY from PDP without selected attributes

      this.setState({ ...this.state, unselected: true })
      return null
    }

    return addCartItem({ ...product, attributes: modifiedAttributes }) // setting cart item with selected attributes
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
              description,
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
                        <ProductContainer inStock={inStock}>
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
                            <SelectedImgContainer inStock={inStock}>
                              <img
                                src={gallery[this.state.activeImg]}
                                alt={`${brand} ${name}`}
                              />
                            </SelectedImgContainer>
                          </ProductImgsContainer>

                          <ProductInfoContainer inStock={inStock}>
                            <Header>
                              <h2>{brand}</h2>
                              <span>{name}</span>
                            </Header>
                            <AttributesContainer>
                              {/* mapping on the attributeSets of the products */}
                              {attributes.map((attributeSet) => (
                                <Fragment key={attributeSet.id}>
                                  <h3>{attributeSet.name} :</h3>
                                  <AttrContainer>
                                    <PleaseSelectAttributes
                                      unselected={
                                        this.state.unselected &&
                                        !this.state[attributeSet.name]
                                      }
                                    >
                                      Please select an attribute!
                                    </PleaseSelectAttributes>

                                    {/* // returns swatch type of attributeset jsx, just as color changing blocks */}

                                    {attributeSet.items.map((attribute) => (
                                      <CustomButton
                                        btnType={attributeSet.type}
                                        color={
                                          attributeSet.type === 'swatch'
                                            ? attribute.value
                                            : null
                                        }
                                        key={attribute.id}
                                        unselected={
                                          !this.state[attributeSet.name] &&
                                          this.state.unselected
                                        }
                                        className={
                                          attribute.id ===
                                          this.state[attributeSet.name]?.id
                                            ? `active-${attributeSet.type}-attribute`
                                            : ''
                                        }
                                        onClick={this.selectAttributeHandler.bind(
                                          null,
                                          attribute,
                                          attributeSet.name,
                                        )}
                                      >
                                        {attributeSet.type === 'text' &&
                                          attribute.value}
                                      </CustomButton>
                                    ))}
                                  </AttrContainer>
                                </Fragment>
                              ))}
                            </AttributesContainer>
                            <PriceContainer>
                              <span>Price:</span>
                              <span>{`${currency.symbol} ${amount}`}</span>
                            </PriceContainer>
                            <CustomButton
                              btnType="submit"
                              inStock={inStock}
                              onClick={this.addProductHandler.bind(
                                null,
                                product,
                                attributes,
                                addCartItem, // adding product to the cart
                              )}
                            >
                              Add to cart
                            </CustomButton>
                            <DescriptionContainer
                              dangerouslySetInnerHTML={{
                                __html: sanitizer(description),
                              }} // not parsing with interweave because data comes from backend and its not a form input to cause any harm of XSS attack , so i just sanitize it with dompurifier and setting it directly in the componnent
                            ></DescriptionContainer>
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
