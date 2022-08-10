import styled from 'styled-components'

export const Spinner = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  width: 7rem;
  height: 7rem;
  border: 1rem solid grey;
  border-top: 1rem solid rgb(0, 0, 0, 0.7);
  border-radius: 50rem;
  transform: translate(-50%, -50%);
  animation: spin 0.8s linear infinite ease-in;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`
