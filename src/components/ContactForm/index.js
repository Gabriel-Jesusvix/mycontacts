import PropTypes from 'prop-types';
import {
  forwardRef,
} from 'react';

import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import { FormGroup } from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState';
import useContactForm from './useContactForm';

export const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    handleSubmit,
    getErrorMessageByFiledName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  } = useContactForm(onSubmit, ref);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFiledName('name')}>
        <Input
          error={getErrorMessageByFiledName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFiledName('email')}>
        <Input
          error={getErrorMessageByFiledName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          type="email"
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          placeholder="Telefone"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Categoria</option>

          {
            categories ? categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
              : null
          }
        </Select>
      </FormGroup>
      <ButtonContainer>

        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
