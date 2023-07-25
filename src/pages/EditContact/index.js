import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import { Loader } from '../../components/Loader';
import { toast } from '../../utils/toast';

export function EditContact() {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);
        contactFormRef.current.setFiledsValues(contactData);
        setIsLoading(false);
      } catch (error) {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
      }
    }

    loadContact();
  }, [id, history]);

  function handleSubmit() {
    //
  }
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Editar Contato" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
