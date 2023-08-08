import styled, { keyframes, css } from 'styled-components';

const containerVariants = {
  default: css`
  background: ${({ theme }) => theme.colors.primary.main};

  `,
  success: css`
  background: ${({ theme }) => theme.colors.success.main};

  `,
  danger: css`
  background: ${({ theme }) => theme.colors.danger.main};

  `,
};

const messageIn = keyframes`
  from{
    opacity:0;
    // Valor positivo elemento desce, negativo sobe;
    transform: translateY(100px);
  }

  to {
    opacity:1;
    transform: translateY(0px);
  }

`;
export const Container = styled.div`
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${messageIn} 0.3s;
  &:focus {
    background: containerVariants[type];
  }

  ${({ type }) => containerVariants[type] || containerVariants.default}

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }
`;
