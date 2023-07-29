import PropTypes from 'prop-types';
import { Overlay } from './styles';
import { Spinner } from '../Spinner';
import { ReactPortal } from '../ReactPortal';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal>
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
