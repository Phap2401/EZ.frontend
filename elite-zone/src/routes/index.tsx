import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRoutes.registerRoute]);
}
