import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      await ContactsService.createContact(contact);
      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  }

  return (
    <div>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </div>
  );
}