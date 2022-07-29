import styled from 'styled-components'

export const BackdropStandard = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.2);
  z-index: 1;
`

export const BackdropFullScreen = styled(BackdropStandard)`
  z-index: 5;
`
