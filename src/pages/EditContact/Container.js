import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';
import { useIsMounted } from '../../hooks/useIsMounted';
import { Presentation } from './Presentation';

export function Container() {
  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);
  const [contactName, setContactName] = useState('');

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        if (isMounted()) {
          contactFormRef.current.setFiledsValues(contactData);
          setIsLoading(false);
          setContactName(contactData.name);
        }
      } catch {
        if (isMounted()) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        }
      }
    }

    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(contact) {
    try {
      const { name } = await ContactsService.updateContact(id, contact);
      setContactName(name);
      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }
  return (
    <Presentation
      isLoading={isLoading}
      contactName={contactName}
      contactFormRef={contactFormRef}
      onSubmit={handleSubmit}
    />
  );
}
