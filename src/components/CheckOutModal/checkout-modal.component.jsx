import { Component } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contexts/Cart.context'
import { CustomButton } from '../../shared/customButton/customButton.component'
import { CheckoutModalContainer } from './checkout-modal.styles'

class CheckoutModal extends Component {
  constructor(props) {
    super(props)
  }

  returnHomeHandler = () => {
    const { setIsCartOpen } = this.context

    return setIsCartOpen(false)
  }

  render() {
    return (
      <CheckoutModalContainer>
        <h2>Your products have been ordered.</h2>
        <Link to={'/'}>
          {' '}
          <CustomButton
            btnType="submit"
            inStock={true}
            onClick={this.returnHomeHandler}
          >
            Return to homepage
          </CustomButton>
        </Link>
      </CheckoutModalContainer>
    )
  }
}

CheckoutModal.contextType = CartContext

export default CheckoutModal
