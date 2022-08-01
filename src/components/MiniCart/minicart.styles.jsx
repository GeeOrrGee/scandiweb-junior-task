import styled from 'styled-components'

export const MinicartContainer = styled.figure`
  position: fixed;
  top: 6rem;
  right: 3.5%;
  width: clamp(20rem, 20vw, 30rem);
  height: clamp(30rem, 45vw, 50rem);
  padding: 3rem 1.5rem;
  background-color: white;
  overflow-y: auto;
  cursor: default;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
