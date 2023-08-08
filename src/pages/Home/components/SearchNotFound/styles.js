import { styled } from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  word-break: break-word;

  span {
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};

  }
`;
