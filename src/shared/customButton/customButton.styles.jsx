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

  ${({ size }) =>
    size === 'small' &&
    `
  width:clamp(1rem, 1.5vw, 2rem);
  height:clamp(1rem, 1.5vw, 2rem);`}

  &.active-swatch-attribute {
    border: solid 0.1rem #fff;
    outline: solid 0.1rem #5ece7b;
  }
  pointer-events: inherit;
  ${({ unselected }) =>
    unselected
      ? `
    border: 1px solid red;
    color: red;
    `
      : ''}
`

export const TextAttribute = styled.span`
  padding: clamp(0.1rem, 0.8vw, 1.5rem);
  border: 1px solid #1d1f22;
  background-color: transparent;
  font-size: clamp(0.6rem, 1vw, 1.6rem);
  color: #1d1f22;
  text-align: center;
  cursor: pointer;

  ${({ size }) =>
    size === 'medium' &&
    `
    padding:0 .6rem ;
    font-size: clamp(.8rem, 2vw,3rem);
  `}

  ${({ size }) =>
    size === 'small' &&
    `
  padding:clamp(.2rem, .4vw, .8rem) ;
  font-size: 0.8rem !important;`}
    transition: background-color 0.3s;
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
