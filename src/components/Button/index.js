import PropTypes from 'prop-types';
import { StyledButton } from './styles';
import { Spinner } from '../Spinner';

export function Button({
  type, isLoading, disabled, children,
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  isLoading: false,
  disabled: false,
};
