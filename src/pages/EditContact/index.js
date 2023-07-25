import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

export function EditContact() {
  const { id } = useParams();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        console.log(contactData);
      } catch (error) {

      }
    }

    loadContact();
  }, [id]);

  function handleSubmit() {
    //
  }
  return (
    <>

      <PageHeader title="Editar Contato" />
      <ContactForm
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
