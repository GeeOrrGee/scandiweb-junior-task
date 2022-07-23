import styled from 'styled-components'

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-weight: 600;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
  span:last-child {
    font-size: 1.5rem;
  }
`

export const SwatchAttributeContainer = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${({ color }) => color};
  cursor: pointer;

  &.active-swatch-attribute {
    box-shadow: 0 0 0 0.1rem #5ece7b;
  }
`

export const TextAttribute = styled.div`
  padding: 1rem;
  border: 1px solid #1d1f22;
  background-color: transparent;
  color: #1d1f22;
  cursor: pointer;
  transition: all 0.3s;
  &.active-text-attribute {
    background-color: #1d1f22;
    color: #fff;
    &:hover {
      opacity: 1;
    }
  }
  &:hover {
    color: #fff;
    background-color: #1d1f2299;
  }
`

export const AttrContainer = styled.div`
  display: flex;
  gap: 1rem;
`

export const AttributesContainer = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 2.2rem;
    font-weight: 500;
  }
  span {
    font-size: 2rem;
  }
`

export const ProductInfoContainer = styled.figure`
  display: flex;
  flex-direction: column;

  /* justify-content: center;
    align-items: center; */
`

export const SelectedImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 55rem;
  max-width: 48rem;
  img {
    width: 100%;
    object-fit: contain;
    height: 100%;
  }
`
export const ImgsToSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 10rem;
  max-height: 55rem;
  overflow-y: auto;
  direction: rtl;
  img {
    cursor: pointer;
    width: 100%;
  }
`

export const ProductImgsContainer = styled.figure`
  display: flex;
  gap: 5rem;
`

export const ProductContainer = styled.section`
  width: 100%;
  height: 100%;
  max-width: 85vw;
  display: flex;
  /* gap: 5rem; */
  gap: clamp(3rem, 8vw, 15rem);
  justify-content: start;
  align-items: center;
  margin: 5rem auto;
`
