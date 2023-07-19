import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/image/icons/arrow.svg';
import edit from '../../assets/image/icons/edit.svg';
import trash from '../../assets/image/icons/trash.svg';
import formatPhone from '../../utils/formatPhone';
import { Loader } from '../../components/Loader';
import sad from '../../assets/image/icons/sad.svg';
import {
  Card,
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  ErrorContainer,
} from './styles';
import ContactsService from '../../services/ContactsService';
import { Button } from '../../components/Button';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    /*
     * contact.name.startsWith(searchTerm.toLowerCase()) Nesse caso,
       para busca bater somente com o inicio da busca do usuario no campo;
    */
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToogleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  async function handleTryAgain() {
    loadContacts();
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
      <Header hasError={hasError}>
        {
          !hasError && (
            <strong>
              {filteredContacts.length}
              {' '}
              {filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
            </strong>
          )
        }

        <Link to="/new">Novo Contato</Link>
      </Header>

      {
        hasError && (
          <ErrorContainer>
            <img src={sad} alt="não encontrado, carinha triste" />
            <div className="details">
              <strong>Ocorreu um erro ao obter os seus contatos!</strong>
              <Button type="button" onClick={handleTryAgain}>
                Tentar novamente
              </Button>
            </div>
          </ErrorContainer>
        )
      }

      {
        !hasError && (
          <>
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
          </>
        )
      }
    </Container>
  );
}
