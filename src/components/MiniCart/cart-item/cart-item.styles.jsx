import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.4rem !important;
  align-items: start !important;
  span {
    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.1rem;
    color: rgb(0, 0, 0, 0.8);
  }
`

export const AttrContainer = styled.li`
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  span {
    font-size: 0.8rem !important;
    font-weight: 600;
    text-transform: capitalize;
  }
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

export const AttributesContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
`

export const LeftSide = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  pointer-events: none;
  max-width: 7rem;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
  span {
    font-size: 1.2rem;
  }
`

export const ImgContainer = styled.div`
  /* max-width: 100%; */
  max-width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`

export const RightSide = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: start;
  height: 100%;
`

export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  max-height: 20rem;
  height: 100%;
  gap: clamp(1rem, 4vw, 5rem);
`
