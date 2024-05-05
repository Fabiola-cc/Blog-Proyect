import PropTypes from 'prop-types'

//import useToken from '../Hooks/useToken'
import useNavigate from '../Hooks/useNavigate'

import Login from './Login';
import MainPage from './MainPage';
import AdminPage from './AdminPage';

const routes = {
  '/': {
    component: MainPage,
    requiresAuth: false
  }, 
  '/admin': {
    component: AdminPage,
    requiresAuth: true
  },
  '/login': {
    component: Login,
    requiresAuth: false
  }
}

const Pages = () => {
  const token = localStorage.getItem('token');
  const { page, navigate } = useNavigate();

  let CurrentPage = routes[page]?.component || MainPage;
  const requiresAuth = routes[page]?.requiresAuth || false;

  // Si la página requiere autenticación y el usuario no tiene un token válido,
  // redireccionar automáticamente a la página principal
  if (requiresAuth && !token) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <CurrentPage />
    </div>
  );
};

Pages.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func
}

export default Pages