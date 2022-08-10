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
  gap: clamp(0.2rem, 0.6vw, 1.5rem);
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
    gap: clamp(0.4rem, 0.6vw, 2rem);
  }
`

export const AttributesContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(0.8rem, 1vw, 3rem);
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
  ${({ onCartPage }) => onCartPage && `max-width: unset;`}
  span {
    font-size: 1.2rem;
  }
`

export const ArrowButtonsContainer = styled.div`
  position: absolute;
  display: flex;
  max-width: 25%;
  width: 100%;

  bottom: 4%;
  right: 5%;
  gap: 0.7rem;
  div {
    max-width: 2rem;
    height: 2em;
    display: flex;
    gap: 1rem;
    background-color: rgb(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 27.5em) {
    right: 15%;
  }
`

export const ImgContainer = styled.div`
  max-width: 25rem;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
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

  span {
    font-size: clamp(1.2rem, 1.4vw, 1.4rem) !important;
    padding: clamp(0.3rem, 0.4vw, 0.6rem) clamp(0.6rem, 0.8vw, 1.2rem);
    order: 2;
  }
  span:first-child {
    order: 3;
  }
  span:last-child {
    order: 1;
  }
  @media (max-width: 27.5em) {
    width: 90%;
    flex-direction: row;
    height: 25%;
  }
`

export const RightSide = styled.div`
  gap: clamp(0.5rem, 1.2vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: end;
  height: 22rem;
  ${({ onCartPage }) => onCartPage && ``}

  @media (max-width: 27.5em) {
    flex-direction: column;
    width: 100%;
  }
`

export const ProductContainer = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 100%;
  max-height: 22rem;
  height: 100%;
  ${({ onCartPage }) => onCartPage && 'max-height:75rem;'}
  position: relative;
  gap: clamp(2rem, 4vw, 5rem);
  ${({ onCartPage }) =>
    onCartPage &&
    `
    @media (max-width:27.5em) {
    flex-direction: column;
    justify-content: center;
    gap: 7rem;
  }
  `}
`
