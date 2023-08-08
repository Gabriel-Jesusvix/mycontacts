import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    /* estilos inicias */
    opacity: 0;
  }

  to {
    /* estilos finais */
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    /* estilos inicias */
    opacity: 1;
  }

  to {
    /* estilos finais */
    opacity: 0;
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(246,245,252, 0.7);

  display: flex;
  align-items: center;
  justify-content:center;
  animation: ${fadeIn} 0.3s;


  ${({ isLeaving }) => isLeaving && css`
    animation: ${fadeOut} 0.3s forwards;
  `}

`;
