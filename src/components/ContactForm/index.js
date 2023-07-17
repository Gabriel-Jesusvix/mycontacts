import PropTypes from 'prop-types';
import { useState } from 'react';

import isValidEmail from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import { FormGroup } from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const {
    setError, removeError, getErrorMessageByFiledName, errors,
  } = useErrors();
  const isFormValid = (name && errors.length === 0);

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

  function handleSubmit(event) {
    event.preventDefault();
    // console.log({
    //   name, email, phone: phone.replace(/\D/g, ''), category,
    // });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFiledName('name')}>
        <Input
          error={getErrorMessageByFiledName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFiledName('email')}>
        <Input
          error={getErrorMessageByFiledName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>
      <FormGroup>
        <Select
          placeholder="Telefone"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>
      <ButtonContainer>

        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
