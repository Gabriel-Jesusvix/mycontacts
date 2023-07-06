import PropTypes from 'prop-types';
import { FormGroup } from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';

export function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input
          placeholder="Nome"
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="E-mail"
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
        />
      </FormGroup>
      <FormGroup>
        <Select
          placeholder="Telefone"
        >
          <option value="instagram">Instagram</option>
        </Select>
      </FormGroup>
      <ButtonContainer>

        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
