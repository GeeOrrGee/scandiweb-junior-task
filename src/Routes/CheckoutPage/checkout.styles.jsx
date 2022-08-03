import styled from 'styled-components'

export const FinalResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  button {
    margin-top: 1.5rem;
    width: 30%;
  }
  p {
    font-size: 1.6rem;
  }
  p:first-child {
    margin-top: 1rem;
  }
`

export const CartContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;

  gap: clamp(5rem, 12vh, 15rem);
  position: relative;
`

export const CheckoutContainer = styled.section`
  max-width: 85vw;
  width: 100%;

  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  gap: clamp(4rem, 8vh, 10rem);
  h2 {
    text-transform: uppercase;
    font-size: 2.5rem;
  }
`

export const NoItemsContainer = styled.section`
  max-width: 85vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin: 5rem auto;

  p {
    font-size: 2rem;
  }

  a {
    display: block;
    width: 50%;
  }
`
