import PropTypes from 'prop-types';
import { useEffect, memo } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/image/icons/xcircle.svg';
import checkCircleIcon from '../../../assets/image/icons/checkcircle.svg';

function ToastMessage({
  message, onRemoveMessage, isLeaving, animatedRef,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  animatedRef: PropTypes.shape().isRequired,
  isLeaving: PropTypes.bool.isRequired,
};

export default memo(ToastMessage);
