import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

export function NewContact() {
  return (
    <div>
      <PageHeader />
      <ContactForm
        buttonLabel="Cadastrar"
      />
    </div>
  );
}
