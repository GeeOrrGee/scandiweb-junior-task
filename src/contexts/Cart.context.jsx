import { Component, createContext } from 'react'

export const CartContext = createContext({
  cart: [],
  addCartItem: () => {},
})

export class CartProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      addCartItem: this.addCartItem.bind(this),
    }
  }

  addCartItem(newItem) {
    if (!newItem.inStock) return

    const existingItems = this.state.cart.filter(
      (cartItem) => newItem.id === cartItem.id,
    )

    if (existingItems.length) {
      const { attributes } = newItem

      const [matchingAttributeCheck] = existingItems.map((existingItem) => {
        if (!attributes.length) return true // for products without attributes
        const [wrapper] = existingItem.attributes.map(
          (attributeSet, index) =>
            attributeSet.items.id === attributes[index].items.id,
        )
        return wrapper
      })

      // checks if the newItem is exactly the same as existing item (id,attributeIds), incrementing quantity
      if (matchingAttributeCheck) {
        const newCartArray = this.state.cart.map((cartItem) =>
          cartItem.id === newItem.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        )
        return this.setState({ ...this.state, cart: newCartArray })
      } else {
        // adds a same product with different attributes to the cart as a seperate object
        return this.setState({
          ...this.state,
          cart: [...this.state.cart, { ...newItem, quantity: 1 }],
        })
      }
    }
    //if the item doesn't already exist in the cart, it is directly added to the cart
    return this.setState({
      ...this.state,
      cart: [...this.state.cart, { ...newItem, quantity: 1 }],
    })
  }

  //cart count
  //add item to cart
  //quantity of the same object
  //delete item from cart
  //cartIsOpen

  render() {
    console.log(this.state.cart)

    return (
      <CartContext.Provider value={this.state}>
        {this.props.children}
      </CartContext.Provider>
    )
  }
}
