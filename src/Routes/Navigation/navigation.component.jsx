import { Component, createRef } from 'react'
import { ReactComponent as Logo } from '../../assets/navigation-logo/a-logo.svg'
import { ReactComponent as HamburgerNav } from '../../assets/mobileNavIcons/menu-hamburger-custom.svg'
import { ReactComponent as CloseBtn } from '../../assets/mobileNavIcons/211652_close_icon.svg'
import { NavLink } from 'react-router-dom'
import { ReactComponent as VectorDown } from '../../assets/vectors/Vector-Down.svg'
import { ReactComponent as VectorUp } from '../../assets/vectors/Vector-Up.svg'
import { ReactComponent as CartIcon } from '../../assets/navigation-logo/Vector.svg'
import Backdrop from '../../shared/Backdrop/backdrop.component'
import {
  DropdownContainer,
  MobileNavIconContainer,
  NavCartContainer,
  NavigationContainer,
  NavListContainer,
  NavLogoContainer,
  CartIconContainer,
} from './navigation.styles.jsx'
import { Query } from '@apollo/client/react/components'

import { CurrencyContext } from '../../contexts/currencies.context'
import { CartContext } from '../../contexts/Cart.context'
import MiniCart from '../../components/MiniCart/minicart.component'
import { CATEGORY_NAME } from './navigation.queries'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileNav: false,
      dropdownActive: false,
      mobileNavActive: false,
    }
    this.dropdownRef = createRef()
    this.toggleMobileNav = this.toggleMobileNav.bind(this) // handles toggling the mobile navigation UI (slide-in)
    this.displayMobileNav = this.displayMobileNav.bind(this) // handles mobile navigation responsiveness based on viewport width
    this.handleDropdownClose = this.handleDropdownClose.bind(this) //handles dropdown closing when clicking outside of the switcher
  }

  handleDropdownClose(e) {
    if (this.dropdownRef.current !== e.path[0])
      this.setState({ ...this.state, dropdownActive: false }) // to handle dropdown close outside the dropdownContainer
  }

  displayMobileNav() {
    const getWindowWidth = window.innerWidth

    if (getWindowWidth < 761) {
      this.setState({ ...this.state, mobileNav: true })
    } else {
      this.setState({ ...this.state, mobileNav: false })
    }
  } // conditional mobileNavBar rendering logic

  displayMinicart = (setIsCartOpen, isCartopen) => {
    return setIsCartOpen(!isCartopen)
  }

  toggleMobileNav() {
    if (this.state.mobileNavActive) {
      return this.setState({ ...this.state, mobileNavActive: false })
    } else if (!this.state.mobileNavActive) {
      return this.setState({ ...this.state, mobileNavActive: true })
    }
  }

  backdropHandler = (setIsCartOpen, isCartOpen) => {
    if (this.state.mobileNavActive) {
      return this.setState({ ...this.state, mobileNavActive: false })
    } else if (isCartOpen) {
      return setIsCartOpen(false)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.displayMobileNav) //handling the display process of the navbar on screen resize: ;
    this.displayMobileNav() //displaying navbar based on users viewport width on mount
    window.addEventListener('click', this.handleDropdownClose)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.addingListeners)
  } //cleaning up listeners
  render() {
    return (
      <CurrencyContext.Consumer>
        {({ setActiveCurrency, loading, activeCurrency, currencies }) => {
          if (loading) return
          const { symbol } = currencies.find((currencyObj) => {
            return currencyObj.label === activeCurrency
          }) // to output a activeCurrency symbol in currency changer

          return (
            <CartContext.Consumer>
              {({ cart, cartQuantity, isCartOpen, setIsCartOpen }) => {
                return (
                  <>
                    {(this.state.mobileNavActive || isCartOpen) && (
                      <Backdrop
                        onClick={this.backdropHandler.bind(
                          null,
                          setIsCartOpen,
                          isCartOpen,
                        )}
                        type={
                          this.state.mobileNavActive
                            ? 'full-screen'
                            : 'standard'
                        }
                      />
                    )}
                    <NavigationContainer
                      mobileNavActive={this.state.mobileNavActive}
                    >
                      {/* HANDLING MOBILE NAVIGATION CONDITIONALLY ON RESIZE */}
                      {this.state.mobileNav && (
                        <MobileNavIconContainer onClick={this.toggleMobileNav}>
                          {this.state.mobileNavActive ? (
                            <CloseBtn />
                          ) : (
                            <HamburgerNav /> // changing icons on open/close of mobile navbar with state
                          )}
                        </MobileNavIconContainer>
                      )}
                      <NavListContainer
                        mobileNavActive={this.state.mobileNavActive}
                        mobileNav={this.state.mobileNav}
                      >
                        <Query query={CATEGORY_NAME}>
                          {({ data, loading }) => {
                            if (loading) {
                              return <h2> LOADING SHECHEMA</h2>
                            } else {
                              const { categories } = data
                              return categories.map((categoryObj) => (
                                <li key={categoryObj.name}>
                                  <NavLink
                                    className={({ isActive }) =>
                                      isActive ? 'nav-active' : ''
                                    }
                                    to={`/${
                                      categoryObj.name === 'all'
                                        ? ''
                                        : categoryObj.name
                                    }`}
                                  >
                                    {categoryObj.name}
                                  </NavLink>
                                </li>
                              ))
                            }
                          }}
                        </Query>
                      </NavListContainer>

                      <NavLogoContainer>
                        <Logo />
                      </NavLogoContainer>

                      {/* DROPDOWN AND CART SEGMENT OF THE NAVBAR */}

                      <NavCartContainer>
                        {/* DROPDOWN CURRENCY  TOGGLER*/}
                        <header
                          ref={this.dropdownRef}
                          onClick={() => {
                            this.setState({
                              dropdownActive: !this.state.dropdownActive,
                            })
                          }}
                        >
                          <span>{symbol}</span>
                          {!this.state.dropdownActive ? (
                            <VectorDown />
                          ) : (
                            <VectorUp />
                          )}
                        </header>

                        <CartIconContainer
                          onClick={this.displayMinicart.bind(
                            null,
                            setIsCartOpen,
                            isCartOpen,
                          )}
                          display={cartQuantity}
                        >
                          <span>{cartQuantity}</span>
                          <CartIcon></CartIcon>
                        </CartIconContainer>
                        {isCartOpen && <MiniCart cartItems={cart} />}

                        {/* HIDDEN CUSTOM DROPDOWN */}
                        {this.state.dropdownActive && (
                          <DropdownContainer>
                            {/* state context for currency type conditional display*/}
                            {currencies.map((currencyObj) => (
                              <span
                                key={currencyObj.symbol}
                                onClick={() => {
                                  setActiveCurrency(
                                    currencyObj.label,
                                    currencyObj.symbol,
                                  )
                                  this.setState({
                                    dropdownActive: !this.state.dropdownActive,
                                  })
                                }}
                              >{`${currencyObj.symbol} ${currencyObj.label}`}</span>
                            ))}
                          </DropdownContainer>
                        )}
                      </NavCartContainer>
                    </NavigationContainer>
                  </>
                )
              }}
            </CartContext.Consumer>
          )
        }}
      </CurrencyContext.Consumer>
    )
  }
}

export default Navigation
