import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { toast } from '../../utils/toast';
import ContactsService from '../../services/ContactsService';

export default function useHome() {
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

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
      setContacts([]);
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

  return {
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
  };
}
