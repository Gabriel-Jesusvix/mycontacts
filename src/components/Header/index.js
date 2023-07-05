import { Container } from './styles';
import Logo from '../../assets/image/logo.svg';

export function Header() {
  return (
    <Container>
      <img src={Logo} alt="Logo do projeto my contacts" width="201" />
    </Container>
  );
}
