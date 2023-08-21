import PropTypes from 'prop-types';
import { StyledButton } from './styles';
import { Spinner } from '../Spinner';

export function Button({
  type = 'button',
  isLoading = false,
  disabled = false,
  children,
  danger = false,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      danger={danger}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
