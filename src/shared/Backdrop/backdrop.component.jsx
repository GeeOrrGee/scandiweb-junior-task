import { Component } from 'react'
import { BackdropFullScreen, BackdropStandard } from './backdrop.styles'

const backdropTypes = {
  standard: 'standard',
  fullscreen: 'full-screen',
}

class Backdrop extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { type, children, ...otherProps } = this.props
    const getBackdropType = (backdropType = 'standard') => {
      return {
        [backdropTypes.standard]: BackdropStandard,
        [backdropTypes.fullscreen]: BackdropFullScreen,
      }[backdropType]
    }

    const CustomBackdrop = getBackdropType(type)
    return <CustomBackdrop {...otherProps}>{children}</CustomBackdrop>
  }
}

export default Backdrop
