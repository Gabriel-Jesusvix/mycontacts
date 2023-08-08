/* eslint-disable react/jsx-one-expression-per-line */

import PropTypes from 'prop-types';
import { Container } from './styles';
import searchContact from '../../../../assets/image/icons/search.svg';

export function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={searchContact} alt="Search contato imagem" />
      <span>
        Nenhum resultado foi encontrado para
        <strong>
          {searchTerm}
        </strong>
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
