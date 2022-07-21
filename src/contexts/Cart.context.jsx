import { Component, createContext } from 'react';

export const CartContext = createContext({
    cart: [],
    addCartItem: () => {},
});

export class CartProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            addCartItem: this.addCartItem.bind(this),
        };
    }

    addCartItem(item) {
        console.log(item);
        if (!item.inStock) return;

        const existingItem = this.state.cart.find(
            (cartItem) => item.id === cartItem.id
        ); // finding if selected item is already in the cart or not

        if (existingItem) {
            // **************************
            // configure logic how to stack the same attributes in the cart and how to give default attribute values when clicking from PLP
            // *********************************** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            const newCartArray = this.state.cart.map((cartItem) =>
                cartItem.id === existingItem.id
                    ? {
                          ...existingItem,
                          quantity: existingItem.quantity + 1,
                      }
                    : cartItem
            );
            return this.setState({
                ...this.state,
                cart: newCartArray,
            }); //if it is, then just incrementing the quantity of existing item
        }
        return this.setState((state) => {
            return {
                ...state,
                cart: [...state.cart, { ...item, quantity: 1 }],
            }; // if its not, just adding the passed item in the cart and giving the quantity of 1
        });
    }
    //cart count
    //add item to cart
    //quantity of the same object
    //delete item from cart
    //cartIsOpen

    render() {
        console.log(this.state.cart);
        return (
            <CartContext.Provider value={this.state}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}
