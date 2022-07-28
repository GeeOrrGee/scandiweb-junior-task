import { Component, createContext } from 'react'

export const CartContext = createContext({
  cart: [],
  addCartItem: () => {},
  cartQuantity: 0,
  setIsCartOpen: () => {},
  isCartOpen: false,
})

export class CartProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      addCartItem: this.addCartItem.bind(this),
      isCartOpen: false,
      setIsCartOpen: this.setIsCartOpen.bind(this),
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
      const filteredCartItems = this.state.cart.map((cartItem) => {
        if (cartItem.id !== newItem.id) return cartItem

        const matchingAttributes = cartItem.attributes.filter(
          (attributeSet, index2) =>
            attributeSet.items.id === newItem.attributes[index2].items.id,
        )
        if (
          matchingAttributes.length === cartItem.attributes.length &&
          newItem.id === cartItem.id
        ) {
          console.log('matched')
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        } else {
          return cartItem
        }
      })
      // console.log(filteredCartItems)
      const sameIdSameAttributesCheck = existingItems.find((cartItem) =>
        cartItem.attributes.filter(
          (attributeSet, index) =>
            attributeSet.items.id === newItem.attributes[index].items.id,
        ),
      )

      return this.setState({ ...this.state, cart: [...filteredCartItems] })
    }

    // if (existingItems.length) {
    //   const { attributes } = newItem
    //   const [matchingAttributeCheck] = existingItems.filter((existingItem) => {
    //     if (!attributes.length) return true // for products without attributes
    //     const wrapper = existingItem.attributes.filter(
    //       (attributeSet, index) => {
    //         return attributeSet.items.id === attributes[index].items.id
    //       },
    //     )

    //     console.log(wrapper)
    //     return wrapper
    //   })

    //   console.log(matchingAttributeCheck)

    //   // checks if the newItem is exactly the same as existing item (id,attributeIds), incrementing quantity
    //   if (matchingAttributeCheck) {
    //     const newCartArray = this.state.cart.map((cartItem) =>
    //       cartItem.id === newItem.id
    //         ? {
    //             ...cartItem,
    //             quantity: cartItem.quantity + 1,
    //           }
    //         : cartItem,
    //     )
    //     return this.setState({ ...this.state, cart: newCartArray })
    //   } else {
    //     // adds a same product with different attributes to the cart as a seperate object
    //     return this.setState({
    //       ...this.state,
    //       cart: [...this.state.cart, { ...newItem, quantity: 1 }],
    //     })
    //   }
    // }
    //if the item doesn't already exist in the cart, it is directly added to the cart
    return this.setState({
      ...this.state,
      cart: [...this.state.cart, { ...newItem, quantity: 1 }],
    })
  }

  setIsCartOpen(boolean) {
    this.setState({ ...this.state, isCartOpen: boolean })
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState, this.state)

    const quantityPerItemCheck = this.state.cart.filter(
      (cartItem, index) =>
        cartItem?.quantity === prevState.cart[index]?.quantity,
    )
    // console.log(this.state.cart)
    // if (prevState.cart.length !== this.state.cart.length)
    //   this.setState({ ...this.state, cartQuantity: this.state.cart.length })
    // console.log(this.state.cartQuantity)
  }

  //cart count
  //add item to cart
  //quantity of the same object
  //delete item from cart
  //cartIsOpen

  render() {
    return (
      <CartContext.Provider value={this.state}>
        {this.props.children}
      </CartContext.Provider>
    )
  }
}
