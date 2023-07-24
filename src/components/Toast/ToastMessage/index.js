import PropTypes from 'prop-types';
import { Container } from './styles';
import xCircleIcon from '../../../assets/image/icons/xcircle.svg';
import checkCircleIcon from '../../../assets/image/icons/checkcircle.svg';

export function ToastMessage({ text, type }) {
  return (
    <Container>
      {type === 'danger' && <img src={xCircleIcon} alt=" toast Error" />}
      {type === 'success' && <img src={checkCircleIcon} alt=" toast sucesso" />}
      <strong>
        {text}
      </strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'dange']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
