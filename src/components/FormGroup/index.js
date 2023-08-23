import PropTypes from 'prop-types';
import { Container } from './styles';
import { Spinner } from '../Spinner';

export function FormGroup({ children, error, isLoading = false }) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>
      {
        error && <small>{error}</small>
      }
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
