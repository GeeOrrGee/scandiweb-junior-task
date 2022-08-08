import styled from 'styled-components'

export const Spinner = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  width: 10rem;
  height: 10rem;
  border: 1.5rem solid grey;
  border-top: 1.5rem solid rgb(0, 0, 0, 0.8);
  border-radius: 50rem;
  transform: translate(-50%, -50%);
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }

    66% {
      transform: rotate(300deg);
    }

    100% {
      transform: rotate(360deg);
      border-top: 1.5rem solid grey;
    }
  }
`
