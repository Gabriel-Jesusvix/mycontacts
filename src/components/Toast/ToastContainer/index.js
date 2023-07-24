import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export function ToastCotainer() {
  return (
    <Container>
      <ToastMessage text="Default Toast" />
      <ToastMessage text="Error Toast" type="success" />
      <ToastMessage text="Success Toast" type="danger" />
    </Container>
  );
}
