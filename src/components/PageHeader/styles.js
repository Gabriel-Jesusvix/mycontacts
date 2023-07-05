import { styled } from 'styled-components';

export const Container = styled.header`


    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
      line-height: 20px;
      }

      img {
        margin-right: 8px;
        transform: rotate(-90deg);
      }

    }
    h1 {
      font-size: 24px;
      line-height: 30px;

    }
`;
