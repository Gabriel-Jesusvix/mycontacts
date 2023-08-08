/* eslint-disable max-len */
import React from 'react';
import { Loader } from '../../components/Loader';
import { Container } from './styles';
import useHome from './useHome';
import { InputSearch } from './components/InputSearch';
import { Header } from './components/Header';
import { ErrorStatus } from './components/ErrorStatus';
import { EmptyList } from './components/EmptyList';
import { SearchNotFound } from './components/SearchNotFound';
import { ContactList } from './components/ContactsList';
import { Modal } from '../../components/Modal';

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

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (!hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {
        hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
        )
      }
      <Header
        hasError={hasError}
        qtyOfcontacts={contacts.length}
        qtyOffilteredContacts={filteredContacts.length}
      />
      {hasError && (<ErrorStatus onTryAgain={handleTryAgain} />)}

      {(isListEmpty) && <EmptyList /> }

      {(isSearchEmpty) && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
      <>

        <ContactList
          filteredContacts={filteredContacts}
          orderBy={orderBy}
          onToogleOrderBy={handleToogleOrderBy}
          onDeleteContact={handleDeleteContact}
        />

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
      </>
      )}
    </Container>
  );
}
