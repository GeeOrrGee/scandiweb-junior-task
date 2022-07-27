import { Component } from 'react'
import {
  AddToCartButton,
  SwatchAttribute,
  TextAttribute,
} from './customButton.styles'

class CustomButton extends Component {
  constructor(props) {
    super(props)
    this.addProcuctToCart = this.props.addProcuctToCart
  }

  render() {
    const { btnType, children, ...otherProps } = this.props
    // console.log(this.props)

    const buttonTypes = {
      swatchAttr: 'swatchAttribute',
      textAttr: 'textAttribute',
      greenSubmit: 'submit',
    }
    const getButtonType = (btnType) => {
      return {
        [buttonTypes.swatchAttr]: SwatchAttribute,
        [buttonTypes.textAttr]: TextAttribute,
        [buttonTypes.greenSubmit]: AddToCartButton,
      }[btnType]
    }

    const Button = getButtonType(btnType)

    return <Button {...otherProps}>{children}</Button>
  }
}

export default CustomButton
