import styled, { css, keyframes } from 'styled-components';

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
const scaleIn = keyframes`
  from {
    /* estilos inicias */
    transform: scale(0);
  }

  to {
    /* estilos finais */
    transform: scale(1);
  }
`;
const scaleOut = keyframes`
  from {
    /* estilos inicias */
    transform: scale(1);
  }

  to {
    /* estilos finais */
    transform: scale(0);
  }
`;

export const Overlay = styled.div`
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${fadeOut} 0.3s forwards;
  `}
`;

export const Container = styled.div`
  max-width: 450px;
  width: 100%;
  background: #FFFF;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  animation: ${scaleIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${scaleOut} 0.3s forwards;
  `}

  > h1 {
    font-size: 22px;
    color: ${({ theme, danger }) => (danger ? theme.colors.danger.main : theme.colors.gray[900])}
  }
  .modal-body {
    margin-top: 32px;
  }
`;
export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    font-size: 16px;
    border:none;
    margin-right: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;
