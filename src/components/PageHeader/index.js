import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from './styles';
import arrow from '../../assets/image/icons/arrow.svg';

export function PageHeader({ title = 'Novo Contato' }) {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="botão de voltar" />
        <span>
          Voltar
        </span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
