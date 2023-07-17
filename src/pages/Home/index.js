import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/image/icons/arrow.svg';
import edit from '../../assets/image/icons/edit.svg';
import trash from '../../assets/image/icons/trash.svg';
import formatPhone from '../../utils/formatPhone';
import { Loader } from '../../components/Loader';
import delay from '../../utils/delay';
import {
  Card,
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
} from './styles';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    /*
     * contact.name.startsWith(searchTerm.toLowerCase()) Nesse caso,
       para busca bater somente com o inicio da busca;
    */
  )), [contacts, searchTerm]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`);
        await delay(500);
        const json = await response.json();
        setContacts(json);
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadContacts();
  }, [orderBy]);

  function handleToogleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquisar contato"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {' '}
          {filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      {
        filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" className="sort-button" onClick={handleToogleOrderBy}>
              <span>
                Nome
              </span>
              <img src={arrow} alt="icon de ordenação por nome(cima/baixo)" />
            </button>
          </ListHeader>
        )
      }

      {
        filteredContacts.map((contact) => (
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
    </Container>
  );
}
