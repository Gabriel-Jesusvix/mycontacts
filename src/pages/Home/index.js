import { Link } from 'react-router-dom';
import arrow from '../../assets/image/icons/arrow.svg';
import edit from '../../assets/image/icons/edit.svg';
import trash from '../../assets/image/icons/trash.svg';
import {
  Card,
  Container,
  InputSearchContainer,
  Header,
  ListContainer,
} from './styles';

export function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContainer>

      <Header>
        <strong>3 Contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button" className="sort-button">
            <span>
              Nome
            </span>
            <img src={arrow} alt="icon de ordenação por nome(cima/baixo)" />
          </button>
        </header>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Gabriel</strong>
              <small>instagram</small>
            </div>
            <span>gabriel.jesus@gmail.com</span>
            <span>(27) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit} alt="editar contato" />
            </Link>
            <button type="button">
              <img src={trash} alt="botão de remover contato" />
            </button>
          </div>
        </Card>

      </ListContainer>
    </Container>
  );
}
