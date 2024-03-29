import styled from 'styled-components'

export const CheckoutModalContainer = styled.div`
  position: fixed;
  width: 60vw;
  height: clamp(20rem, 50vh, 60rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  gap: 10rem;
  h2 {
    font-weight: 400;
    font-size: clamp(1rem, 1.3vw, 2.2rem) !important;
  }
  a {
    width: 50%;
    text-decoration: none;
    color: inherit;
    &:visited {
      color: inherit;
    }
    &:active {
      color: inherit;
      text-decoration: none;
    }
    display: block;
    button {
      font-size: clamp(1rem, 1.2vw, 2rem);
    }
  }
`
