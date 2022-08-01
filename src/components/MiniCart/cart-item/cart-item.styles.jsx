import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  span {
    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.1rem;
    color: rgb(0, 0, 0, 0.8);
  }
`

export const AttrContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  flex-direction: column;
  span {
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: capitalize;
  }
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`

export const AttributesContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`

export const ImgContainer = styled.div`
  max-width: 100%;
  img {
    width: 100%;
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
  gap: 1rem;
  display: flex;
`

export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 20rem;
  height: 100%;
`
