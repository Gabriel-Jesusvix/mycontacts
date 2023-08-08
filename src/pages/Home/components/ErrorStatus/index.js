import PropTypes from 'prop-types';
import sad from '../../../../assets/image/icons/sad.svg';
import { Container } from './styles';
import { Button } from '../../../../components/Button';

export function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="não encontrado, carinha triste" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
