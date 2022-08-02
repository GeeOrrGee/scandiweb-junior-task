import styled from 'styled-components'
import { ReactComponent as Carticon } from '../../assets/navigation-logo/Vector.svg'
export const MobileNavIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;
  width: 2.5rem;
  height: 2.5rem;
  svg {
    width: 100%;
    height: 100%;
    fill: rgb(94, 206, 123);
  }
`

export const DropdownContainer = styled.div`
  position: absolute;
  top: 170%;
  left: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* gap: 3rem; */
  align-items: center;
  /* padding: 2rem 1.5rem; */
  letter-spacing: 0.1rem;
  background-color: white;
  box-shadow: 0 0 1rem rgb(0, 0, 0, 0.1);
  font-size: 1.2rem;
  border-radius: 10px;
  animation: 0.3s ease alternate dropdown;
  span:first-child {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  span:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  span {
    text-align: center;
    cursor: pointer;
    padding-inline: 1.5rem;
    padding-block: 1rem;
    width: 100%;
    &:hover {
      background-color: rgb(0, 0, 0, 0.1);
    }
  }

  @keyframes dropdown {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @media (max-width: 47.5em) {
    left: -20%;
  }
`

export const CartIconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    position: absolute;
    font-size: 0.8rem;
    font-weight: 600;
    background-color: black;
    border-radius: 5rem;
    color: #fff;
    padding-block: 0.4rem;
    text-align: center;
    top: 10%;
    left: 105%;
    width: 1.7rem;
    height: 1.7rem;
    text-align: center;
    display: none;
    /* opacity: 0; */
    transform: translate(-50%, -50%);
    ${(props) => (props.display !== 0 ? `display:block;` : '')};
  }
`

export const NavCartContainer = styled.div`
  font-size: 1.4em;
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  cursor: pointer;
  margin-top: 1rem;
  width: 15rem;
  justify-content: flex-end;

  position: relative;
  header {
    cursor: pointer;
    display: flex;
    gap: 1rem;
    align-items: center;
    svg {
      pointer-events: none;
    }
    span {
      pointer-events: none;
    }
    /* span {
            width: 100%;
            height: 100%;
        }
        svg {
            width: 100%;
            height: 100%;
        } */
  }
  @media (max-width: 47.5em) {
    width: unset;
  }
`

export const NavLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NavListContainer = styled.ul`
  display: flex;
  list-style: none;
  gap: 3rem;

  font-size: 1.4rem;

  height: 100%;
  li {
    height: 100%;

    color: black;
    display: flex;
    align-items: center;
    a {
      text-decoration: none;
      padding-top: 1rem;
      transition: all 0.2s;
      display: block;
      height: 100%;
      text-align: center;
      text-transform: capitalize;
      border-bottom: 2px solid transparent;
      &:visited {
        color: black;
      }
      &:hover {
        color: rgb(94, 206, 123, 0.8);
        border-bottom: 2px solid rgb(94, 206, 123, 0.8);
      }
      &.nav-active {
        border-bottom: 2px solid rgb(94, 206, 123);
        color: rgb(94, 206, 123);
      }
    }
  }

  ${(props) =>
    props.mobileNav &&
    `
        position:fixed;
        top:0;
        left:0;
        flex-direction: column;
        width:100vw;
        height:100vh;
        max-width: 25rem;
        align-items:center;
        padding: 10rem;
        background-color: #fff !important;
        z-index:8;
        transform: translateX(-100%);
        
        li{
            height: unset;
            width:100%;
            justify-content: center;  
            
        }
        
        
        `}
  ${(props) =>
    props.mobileNavActive &&
    `   transition: all 0.3s;
        animation: .3s ease forwards slideIn;
        li{
            opacity:0;
            animation: .3s ease forwards slideIn;
            animation-delay: 0.3s;
        }
    `} //active mobile nav stylings


    @keyframes slideIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  }
`

export const NavigationContainer = styled.nav`
  display: flex;

  position: sticky;
  top: 0;

  padding-top: 1.2rem;
  padding-inline: clamp(2rem, 5vw, 7rem);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 1rem rgb(0, 0, 0, 0.02);

  justify-content: space-between;
  align-items: flex-start;

  z-index: 5;
  height: 6rem;
  ${({ mobileNavActive }) =>
    mobileNavActive && '  background-color: rgb(0, 0, 0, 0);'}
  @media (max-width: 47.5em) {
    align-items: center;
  }
`
