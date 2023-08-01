import PropTypes from 'prop-types';
import {
  useEffect, useState, forwardRef, useImperativeHandle,
} from 'react';

import isValidEmail from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import { FormGroup } from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';
import CategoriesService from '../../services/CategoriesService';
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState';

export const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    setError, removeError, getErrorMessageByFiledName, errors,
  } = useErrors();
  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFiledsValues: (contact) => {
      setName(contact.name || '');
      setEmail(contact.email || '');
      setPhone(formatPhone(contact.phone) || '');
      setCategoryId(contact.category.id || '');
    },
    resetFileds: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategories('');
    },
  }));

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories]);

  function handleNameChange(event) {
    setName(event.target.value);
    if (!event.target.value) {
      setError({ filed: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (event.target.value && !isValidEmail(event.target.value)) {
      setError({ filed: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    await onSubmit({
      name, email, phone: phone.replace(/\D/g, ''), categoryId,
    });

    setIsSubmitting(false);
  }

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
