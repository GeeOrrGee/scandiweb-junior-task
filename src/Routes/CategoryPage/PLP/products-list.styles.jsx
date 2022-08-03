import styled from 'styled-components'

export const ProductsListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 6rem;
  z-index: 0;

  @media (max-width: 47.5em) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 27.5em) {
    grid-template-columns: 1fr;
  }
`

export const CategorySectionContainer = styled.section`
  width: 85vw;
  margin: 6rem auto;
  display: flex;
  flex-direction: column;
  gap: clamp(10rem, 10vh, 20rem);
  z-index: -1;
  h2 {
    font-size: 4rem;
    text-transform: capitalize;
    letter-spacing: 0.2rem;
    font-weight: 400;
  }
`
