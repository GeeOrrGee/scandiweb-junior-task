import styled from 'styled-components'

export const PleaseSelectAttributes = styled.p`
  display: none;
  position: absolute;
  font-size: 0.8rem;
  /* left: 50%; */
  top: 115%;

  color: red;
  max-width: 10rem;
  width: 100%;
  ${({ unselected }) => unselected && `display:block;`}

  animation: 0.5s  forwards slideIn;

  @keyframes slideIn {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }

    to {
      transform: translateY(-0%);
      opacity: 1;
    }
  }
`

export const DescriptionContainer = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  /* max-width: rem; */
  width: 100%;
  padding-bottom: 2rem;
`

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  span {
    font-weight: 600;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
  span:last-child {
    font-size: 1.5rem;
  }
`

export const AttrContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
`

export const AttributesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div {
    margin-bottom: 1rem;
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
  justify-content: start;
  gap: clamp(1.5rem, 2.5vw, 5rem);
  height: 100%;
  width: 100%;
  max-width: 30rem;
  ${({ inStock }) => !inStock && `pointer-events:none;`}
`

export const SelectedImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-height: 50rem; */
  position: relative;
  &::before {
    display: none;
    position: absolute;
    content: 'OUT OF STOCK';
    top: 55%;
    left: 52%;
    transform: translate(-50%);
    color: black;
    font-size: clamp(1rem, 2vw, 2rem);
    letter-spacing: 0.1rem;
    font-weight: 600;
  }

  ${({ inStock }) =>
    !inStock &&
    `
  &::before{
    opacity: 0.8;
    display:block;
  }
`}

  img {
    max-width: 50rem;
    max-height: 55rem;
    width: 100%;
    /* object-fit: contain; */
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
  align-items: flex-start;
  gap: clamp(2rem, 4vw, 10rem);
  justify-content: space-between;
  height: 100%;
`

export const ProductContainer = styled.section`
  ${({ inStock }) =>
    !inStock &&
    `
  
  opacity:0.6;
`}
  width: 100%;
  height: 55rem;
  max-width: 85vw;

  display: flex;
  /* gap: 5rem; */
  gap: clamp(3rem, 8vw, 15rem);
  justify-content: flex-start;
  align-items: center;
  margin: 7rem auto;
`
