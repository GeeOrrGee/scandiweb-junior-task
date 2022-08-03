import styled from 'styled-components'
import { ReactComponent as ProductIcon } from '../../assets/product-hover-icon/Circle Icon.svg'

export const ProductHoverIcon = styled(ProductIcon)`
  width: 5rem;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-30%, 50%);
  ${({ attributes }) =>
    attributes.length && `opacity: 0.6; pointer-events: none;`}
`

export const ProductInfoContainer = styled.div`
  padding: 4rem 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  p {
    font-weight: 300;
    font-size: clamp(1rem, 1.2vw, 2rem);
  }

  span {
    font-size: clamp(1rem, 1.2vw, 2rem);
  }
`

export const ProductImgContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  max-height: 27rem;

  /* flex-grow: 1; */
  height: 100%;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    aspect-ratio: auto;
  }
`

export const ProductContainer = styled.li`
  list-style: none;

  display: flex;
  flex-direction: column;
  /* max-height: 35rem; */
  /* gap: 3rem; */
  justify-content: space-around;
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 1rem;
  opacity: ${(props) => (props.inStock ? 1 : 0.5)};
  ${(props) =>
    !props.inStock &&
    `&:after{
         content: 'OUT OF STOCK';
         position: absolute;
         top: 50%;
         left: 50%;
         transform:translate(-50%,-50%);
         font-size:1.4rem;
         letter-spacing: 0.2rem;
         font-weight: 600;
         opacity:0.7;
      
    }`}

  transition: all 0.3s;
  &:hover {
    box-shadow: 0 0 2rem rgb(0, 0, 0, 0.05);
    transform: scale(102%);
    cursor: pointer;
    border-radius: 10px;
  }
`
