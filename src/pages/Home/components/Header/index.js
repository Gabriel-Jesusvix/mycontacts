/* eslint-disable no-nested-ternary */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from './styles';

export function Header({ hasError, qtyOfcontacts, qtyOffilteredContacts }) {
  const alignment = hasError ? 'flex-end' : (
    qtyOfcontacts > 0 ? 'space-between' : 'center'
  );
  return (
    <Container justifyContent={alignment}>
      {
        (!hasError && qtyOfcontacts > 0) && (
          <strong>
            {qtyOffilteredContacts}
            {' '}
            {qtyOffilteredContacts === 1 ? 'Contato' : 'Contatos'}
          </strong>
        )
      }

      <Link to="/new">Novo Contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfcontacts: PropTypes.number.isRequired,
  qtyOffilteredContacts: PropTypes.number.isRequired,
};
