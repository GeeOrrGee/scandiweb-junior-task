import styled from 'styled-components'
export const AddToCartButton = styled.button`
  padding: 1rem 0;
  text-transform: uppercase;
  text-align: center;
  background-color: #5ece7b;
  border: none;
  cursor: pointer;
  color: #fff;
  width: 100%;

  ${({ inStock }) =>
    !inStock &&
    `
    cursor: none;
    pointer-events: none;
    opacity:0.5;
  `}
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`

export const SwatchAttribute = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${({ color }) => color};
  cursor: pointer;

  &.active-swatch-attribute {
    border: solid 0.1rem #fff;
    outline: solid 0.1rem #5ece7b;
  }
  ${({ unselected }) =>
    unselected
      ? `
    border: 1px solid red;
    color: red;
  `
      : ''}
`

export const TextAttribute = styled.span`
  padding: 1rem 1.5rem;
  border: 1px solid #1d1f22;
  background-color: transparent;
  font-size: clamp(0.6rem, 1vw, 1.6rem);
  color: #1d1f22;
  text-align: center;

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

  ${({ unselected }) =>
    unselected
      ? `
    border: 1px solid red;
    color: red;
  `
      : ''}
`