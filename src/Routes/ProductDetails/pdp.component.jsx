import { Component, Fragment } from 'react'
import './pdp.styles'
import { Query } from '@apollo/client/react/components'

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
import { Spinner } from '../../shared/spinner/spinner.styles'
import { SELECTED_PRODUCT } from './pdp.queries'
let sanitizer = DOMPurify.sanitize

class ProductDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      unselected: false,
      activeImg: 0,
    }

    this.selectImgHandler = this.selectImgHandler.bind(this)
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
      return null
    }
    this.setState({ ...this.state, [name]: attribute })
  }

  addProductHandler(product, attributes, addCartItem) {
    const modifiedAttributes = attributes.map((attributeSet) => {
      const addingSelectedValues = attributeSet.items.map((attributeItem) => {
        const checkValues =
          attributeItem.id === this.state[attributeSet.name]?.id ? true : false
        return { ...attributeItem, selected: checkValues }
      })

      const validation = addingSelectedValues.filter(
        (item) => item.selected === true,
      )
      if (!validation.length) return null // if no items are selected per attribute, returns null

      return { ...attributeSet, items: addingSelectedValues }
    })

    // console.log(modifiedAttributes)

    const selectedAttributesValidation = modifiedAttributes.filter(
      (attributeSet) => attributeSet === null || undefined,
    ) //checking the unselected attributes in selected array

    if (product.attributes.length && selectedAttributesValidation.length) {
      // to prevent adding item to cart ONLY from PDP without selected attributes

      this.setState({ ...this.state, unselected: true })
      return null
    }

    return addCartItem({ ...product, attributes: modifiedAttributes })
  }

  componentDidMount() {
    const prevState = JSON.parse(localStorage.getItem('PDPpreviousState'))
    if (prevState === null || undefined) return
    this.setState({ ...prevState })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('PDPpreviousState', JSON.stringify(this.state))
    }
  }

  componentWillUnmount() {
    localStorage.removeItem('PDPpreviousState')
  }
  render() {
    const productId = this.props.params.productId

    return (
      <Query variables={{ id: productId }} query={SELECTED_PRODUCT}>
        {({ data, loading }) => {
          if (loading) {
            return <Spinner />
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
                                addCartItem,
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
