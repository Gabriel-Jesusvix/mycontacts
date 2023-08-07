import PropTypes from 'prop-types';
import { ContactForm } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';
import { PageHeader } from '../../components/PageHeader';

export function Presentation({
  isLoading, contactFormRef, contactName, onSubmit,
}) {
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar Contato ${contactName}`} />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={onSubmit}
      />
    </>
  );
}

Presentation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  contactFormRef: PropTypes.shape().isRequired,
  contactName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
