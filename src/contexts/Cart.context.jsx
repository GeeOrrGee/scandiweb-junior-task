import { Component, createContext } from 'react'
import { CurrencyContext } from './currencies.context'

export const CartContext = createContext({
  cart: [],
  addCartItem: () => {},
  cartQuantity: 0,
  setIsCartOpen: () => {},
  isCartOpen: false,
  removeCartItem: () => {},
})

export class CartProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      addCartItem: this.addCartItem.bind(this),
      isCartOpen: false,
      setIsCartOpen: this.setIsCartOpen.bind(this),
      cartQuantity: 0,
      totalvalue: 0,
      removeCartItem: this.removeCartItem,
      clearCartItems: this.clearCartItems,
    }
  }

  componentDidMount() {
    // this.setState({ ...this.state, cartQuantity: this.state.cart.length }) QUANTITY SHEICHALICHE
  }

  addCartItem(newItem) {
    if (!newItem.inStock) return
    // its a serverside BUG NOT YOUR FAULT
    const existingItems = this.state.cart.filter(
      (cartItem) => newItem.id === cartItem.id,
    )
    if (existingItems.length) {
      ////////////////
      const filteredCartItems = this.state.cart.map((cartItem, index1) => {
        if (cartItem.id !== newItem.id) return cartItem

        const matchingAttributes = cartItem.attributes.filter(
          (attributeSet, index2) => {
            const trueValueInExistingItem = attributeSet.items.find(
              (item) => item.selected === true,
            )
            const newItemTrueValue = newItem.attributes[index2].items.find(
              (item) => item.selected === true,
            )

            return trueValueInExistingItem.id === newItemTrueValue.id
          },
        )
        console.log(matchingAttributes)
        if (
          matchingAttributes.length === cartItem.attributes.length &&
          newItem.id === cartItem.id
        ) {
          console.log('matched')
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        } else {
          return cartItem
        }
      }) // searching for identical  item to increment in the cart

      // creating a secondary check to add a newItem with different attributes but with the same product id/type
      const sameIdSameAttributesCheck = existingItems.filter(
        (cartItem, index1) => {
          const matchingAttributes = cartItem.attributes.filter(
            (attributeSet, index2) => {
              const trueValueInExistingItem = attributeSet.items.find(
                (item) => item.selected === true,
              )
              const newItemTrueValue = newItem.attributes[index2].items.find(
                (item) => item.selected === true,
              )

              return trueValueInExistingItem.id === newItemTrueValue.id
            },
          )

          return matchingAttributes.length === newItem.attributes.length
        },
      )

      if (!sameIdSameAttributesCheck.length)
        // if productIds match but not attributeValues, adds the passed newItem
        filteredCartItems.push({ ...newItem, quantity: 1 })

      return this.setState({ ...this.state, cart: [...filteredCartItems] })
    }

    return this.setState({
      ...this.state,
      cart: [...this.state.cart, { ...newItem, quantity: 1 }], // adding a newItem to the cart if there's no existing items with the same product id
    })
  }

  //decrement quantity, if quantity=0 removes cartItem
  removeCartItem = (deleteItem) => {
    const modifiedCart = this.state.cart
      .map((cartItem) => {
        if (cartItem.id !== deleteItem.id) return cartItem

        const matchingAttributes = cartItem.attributes.filter(
          (attributeSet, index2) => {
            const trueValueInExistingItem = attributeSet.items.find(
              (item) => item.selected === true,
            )
            const newItemTrueValue = deleteItem.attributes[index2].items.find(
              (item) => item.selected === true,
            )

            return trueValueInExistingItem.id === newItemTrueValue.id
          },
        )

        if (matchingAttributes.length === cartItem.attributes.length)
          return { ...deleteItem, quantity: deleteItem.quantity - 1 }

        return cartItem
      })
      .filter((cartItem) => cartItem.quantity > 0)

    return this.setState({ ...this.state, cart: modifiedCart })
  }

  setIsCartOpen(boolean) {
    this.setState({ ...this.state, isCartOpen: boolean })
  }

  clearCartItems = () => {
    this.setState({ ...this.state, cart: [] })
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState, this.state)

    const previousTotalQuantity = prevState.cart.reduce(
      (acc, curr) => acc + curr.quantity,
      0,
    )
    const currentTotalQuantity = this.state.cart.reduce(
      (acc, curr) => acc + curr.quantity,
      0,
    )

    const { activeCurrency } = this.context
    const totalValue = parseFloat(
      // to omit the JS quirkiness with numbers :)
      this.state.cart.reduce((acc, curr) => {
        const [filteredPrice] = curr.prices.filter(
          (priceObj) => priceObj.currency.label === activeCurrency,
        )
        return acc + filteredPrice.amount * curr.quantity
      }, 0),
    ).toFixed(2)
    //accumulating total value based on the activeCurrency
    if (currentTotalQuantity !== previousTotalQuantity) {
      return this.setState({
        ...this.state,
        cartQuantity: currentTotalQuantity,
        totalValue: totalValue,
      })
    } else if (prevState.totalValue !== totalValue) {
      return this.setState({
        ...this.state,
        totalValue: totalValue,
      })
    }
  }

  //cart count
  //add item to cart
  //quantity of the same object
  //delete item from cart
  //cartIsOpen

  render() {
    console.log(this.state)
    return (
      <CartContext.Provider value={this.state}>
        {this.props.children}
      </CartContext.Provider>
    )
  }
}

CartProvider.contextType = CurrencyContext
