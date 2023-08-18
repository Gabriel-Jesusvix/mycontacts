import {
  useEffect, useState, useCallback, useTransition,
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
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isPending, startTransition] = useTransition();

  // const filteredContacts = useMemo(() => contacts.filter((contact) => (
  //   contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   /*
  //    * contact.name.startsWith(searchTerm.toLowerCase()) Nesse caso,
  //      para busca bater somente com o inicio da busca do usuario no campo;
  //   */
  // )), [contacts, searchTerm]);

  const loadContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy, signal);

      setHasError(false);
      setContacts(contactsList);
      setFilteredContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  function handleToogleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  const handleChangeSearchTerm = useCallback((event) => {
    const { value } = event.target;
    setSearchTerm(value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) => (contact.name.toLowerCase()
        .includes(value.toLowerCase()))));
    });
  }, [contacts]);

  async function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeignDeleted(contact);
    setDeleteModalVisible(true);
  }, []);
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
    isPending,
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
