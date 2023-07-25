import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Container } from './styles';
import xCircleIcon from '../../../assets/image/icons/xcircle.svg';
import checkCircleIcon from '../../../assets/image/icons/checkcircle.svg';

export function ToastMessage({
  message, onRemoveMessage,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveTost() {
    onRemoveMessage(message.id);
  }
  return (
    <Container
      type={message.type}
      onClick={handleRemoveTost}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt=" toast Error" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt=" toast sucesso" />}
      <strong>
        {message.text}
      </strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
