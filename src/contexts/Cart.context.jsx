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

  addCartItem(item) {
    if (!item.inStock) return // to prevent out of stock items getting added to the cart

    const existingItem = this.state.cart.find(
      (cartItem) => item.id === cartItem.id,
    ) // finding if selected item is already in the cart or not

    if (existingItem) {
      // **************************
      // configure logic how to stack the same attributes in the cart and how to give default attribute values when clicking from PLP - done, build PDP page
      const { attributes } = existingItem

      const passedAttributeIds = attributes.map((atrObj) => atrObj.items.id) // attribute IDs to check if object with the same attribute already exists or not
      console.log(passedAttributeIds)
      // *********************************** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      const newCartArray = this.state.cart.map((cartItem, index) => {
        // checking subsequent attributes and comparing them to extracted 'passedAttributesIds' from passed object on each iteration, therefore every single attribute will be checked and compared , if they do not match (or at least on of them), it just returns a new item in the cart
        if (
          cartItem.id === existingItem.id &&
          cartItem.attributes[index].items.id === passedAttributeIds[index] // checks on every iteration whether the product is identical or not ( for conditional stacking purposes, quantity)
        ) {
          return {
            ...existingItem,
            quantity: existingItem.quantity + 1, // if all of them matchs, it gets stacked
          }
        } // checks if the same product exists, but with different attributes, so it will be added as a seperate product in the cart
        else if (cartItem.id === existingItem.id) {
          return { ...existingItem, quantity: 1 }
        }

        return cartItem // returns the existing cart items in the  after iteration  which doesn't meet any of the conditions,that meaning its just different product
      })
      return this.setState({
        ...this.state,
        cart: newCartArray,
      }) //if it is, then just incrementing the quantity of existing item
    }
    return this.setState((state) => {
      return {
        ...state,
        cart: [...state.cart, { ...item, quantity: 1 }],
      } // if its not, just adding the passed item in the cart and giving the quantity of 1
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
