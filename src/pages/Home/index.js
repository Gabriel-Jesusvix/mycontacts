/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { Link } from 'react-router-dom';

import arrow from '../../assets/image/icons/arrow.svg';
import edit from '../../assets/image/icons/edit.svg';
import trash from '../../assets/image/icons/trash.svg';
import sad from '../../assets/image/icons/sad.svg';
import emptyBox from '../../assets/image/icons/empty-box.svg';
import searchContact from '../../assets/image/icons/search.svg';
import { toast } from '../../utils/toast';
import formatPhone from '../../utils/formatPhone';
import { Loader } from '../../components/Loader';

import {
  Card,
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';
import ContactsService from '../../services/ContactsService';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [contactBeignDeleted, setContactBeignDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
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
      await ContactsService.listContacts(orderBy);

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

  function handleDeleteContact(contact) {
    setContactBeignDeleted(contact);
    setDeleteModalVisible(true);
  }
  function handleCloseDeleteModal() {
    setDeleteModalVisible(false);
    setContactBeignDeleted(null);
  }
  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeignDeleted.id);

      handleCloseDeleteModal();
      setContacts((prevState) => prevState.filter((contact) => (
        contact.id !== contactBeignDeleted.id
      )));

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar um contato',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        title={`Tem certeza que deseja remover o contato '${contactBeignDeleted?.name}'?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>
      {
        contacts.length > 0 && (
          <InputSearchContainer>
            <input
              type="text"
              placeholder="Pesquisar contato"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </InputSearchContainer>
        )
      }
      <Header justifyContent={
        hasError ? 'flex-end' : (
          contacts.length > 0 ? 'space-between' : 'center'
        )
}
      >
        {
          (!hasError && contacts.length > 0) && (
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

            {(contacts.length < 1 && !isLoading) && (
              <EmptyListContainer>
                <img src={emptyBox} alt="Sem contatos" />
                <p>
                  Você ainda não tem nenhum contato cadastrado!
                  Clique no botão  <strong> ”Novo contato”</strong> à cima para cadastrar o seu primeiro!
                </p>
              </EmptyListContainer>
            )}

            {
              (contacts.length > 0 && filteredContacts.length < 1)
              && (
                <SearchNotFoundContainer>
                  <img src={searchContact} alt="Search contato imagem" />
                  <span>Nenhum resultado foi encontrado para <strong>{searchTerm}.</strong></span>
                </SearchNotFoundContainer>
              )
            }

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
                      contact.category.name && <small>{contact.category.name}</small>
                    }
                  </div>
                  <span>{contact.email}</span>
                  <span>{formatPhone(contact.phone)}</span>
                </div>

                <div className="actions">
                  <Link to={`/edit/${contact.id}`}>
                    <img src={edit} alt="botão de editar contato" />
                  </Link>
                  <button type="button" onClick={() => handleDeleteContact(contact)}>
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
