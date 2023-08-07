/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';

import arrow from '../../assets/image/icons/arrow.svg';
import edit from '../../assets/image/icons/edit.svg';
import trash from '../../assets/image/icons/trash.svg';
import sad from '../../assets/image/icons/sad.svg';
import emptyBox from '../../assets/image/icons/empty-box.svg';
import searchContact from '../../assets/image/icons/search.svg';
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
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import useHome from './useHome';

export function Home() {
  const {
    isLoading,
    contactBeignDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
    isLoadingDelete,
    contacts,
    searchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    handleChangeSearchTerm,
    orderBy,
    handleToogleOrderBy,
    handleDeleteContact,
  } = useHome();
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
