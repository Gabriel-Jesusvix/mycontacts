import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/image/icons/arrow.svg';
import edit from '../../assets/image/icons/edit.svg';
import trash from '../../assets/image/icons/trash.svg';
import formatPhone from '../../utils/formatPhone';
import {
  Card,
  Container,
  InputSearchContainer,
  Header,
  ListContainer,
} from './styles';

export function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log('response', error);
      });
  }, []);

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {' '}
          {contacts.length === 1 ? 'Contato' : 'Contatos'}
        </strong>
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
        {
          contacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {
                    contact.category_name && <small>{contact.category_name}</small>
                  }
                </div>
                <span>{contact.email}</span>
                <span>{formatPhone(contact.phone)}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="botão de editar contato" />
                </Link>
                <button type="button">
                  <img src={trash} alt="botão de remover contato" />
                </button>
              </div>
            </Card>
          ))
        }

      </ListContainer>
    </Container>
  );
}
