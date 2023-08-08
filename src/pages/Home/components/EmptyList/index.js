/* eslint-disable react/jsx-one-expression-per-line */

import { Container } from './styles';
import emptyBox from '../../../../assets/image/icons/empty-box.svg';

export function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="Sem contatos" />
      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão
        <strong> ”Novo contato”</strong>
        à cima para cadastrar o seu primeiro!
      </p>
    </Container>
  );
}
