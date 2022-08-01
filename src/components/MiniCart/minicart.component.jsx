import { Component } from 'react'
import CartItem from './cart-item/cart-item.component'
import { MinicartContainer } from './minicart.styles'

class MiniCart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MinicartContainer>
        <CartItem></CartItem>
      </MinicartContainer>
    )
  }
}

export default MiniCart
