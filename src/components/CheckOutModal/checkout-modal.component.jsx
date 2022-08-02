import { Component } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contexts/Cart.context'
import { CustomButton } from '../../shared/customButton/customButton.component'
import { CheckoutModalContainer } from './checkout-modal.styles'

class CheckoutModal extends Component {
  constructor(props) {
    super(props)
  }

  returnHomeHandler = (checkOutHandler) => {
    const { setIsCartOpen } = this.context

    checkOutHandler()
    return setIsCartOpen(false)
  }

  render() {
    const { checkOutHandler } = this.props
    return (
      <CheckoutModalContainer>
        <h2>Your products have been ordered.</h2>
        <CustomButton
          btnType="submit"
          inStock={true}
          onClick={this.returnHomeHandler.bind(null, checkOutHandler)}
        >
          <Link to={'/'}>Return to homepage</Link>
        </CustomButton>
      </CheckoutModalContainer>
    )
  }
}

CheckoutModal.contextType = CartContext

export default CheckoutModal
