import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';

export function ToastCotainer() {
  return (
    <Container>
      <ToastMessage text="Default Toast" />
      <ToastMessage text="Error Toast" type="danger" />
      <ToastMessage text="Success Toast" type="success" />
    </Container>
  );
}
