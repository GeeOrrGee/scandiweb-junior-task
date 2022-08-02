import styled from 'styled-components'

export const CheckoutButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: clamp(0.5rem, 1.5vw, 4rem);
  justify-content: center;
  align-items: center;
  span {
    padding: 0.8rem 0;

    width: 100%;
    a {
      text-decoration: none;
      color: inherit;
    }
  }
`

export const TotalValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  span {
    font-weight: 600;
  }
`

export const ProductsContainer = styled.ul`
  flex-direction: column;
  display: flex;
  gap: 5rem;
  align-items: center;
  overflow-y: auto;
  max-height: 50vh;
  padding-block: 1rem;
`

export const MinicartContainer = styled.figure`
  position: fixed;
  top: 6rem;
  right: 3.5%;
  width: clamp(20rem, 27vw, 30rem);
  height: clamp(30rem, 70vh, 60rem);
  padding: 3rem 2rem;
  background-color: white;
  cursor: default;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  h2:first-child {
    font-size: 1.4rem;
    font-weight: 400;
    /* margin-bottom: 4rem; */
  }
  #empty-cart {
    align-self: center;
  }
`
