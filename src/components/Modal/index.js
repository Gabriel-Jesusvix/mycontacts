import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Button } from '../Button';
import { Container, Overlay, Footer } from './styles';

export function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo modal</h1>
        <p>description</p>

        <Footer>
          <button
            type="button"
            className="cancel-button"
          >
            {' '}
            Cancelar

          </button>
          <Button danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
