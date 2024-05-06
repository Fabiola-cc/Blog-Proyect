import './Header.css'
import Button from './Button';
import PropTypes from 'prop-types';

import useNavigate from '../Hooks/useNavigate'
import './Button.css';

const Header = ({ main }) => {
    const { navigate } = useNavigate()
    const handleAdminClick = () => {
        // Redirigir a la pantalla de login
        console.log('Admin button clicked')
        const token = localStorage.getItem('access_token');
        if (token){
            navigate('/admin')
        } else{
            navigate('/login')
        }
    };

    const handleLogout = () => {
        // Redirigir a la pantalla principal y borrar local storage
        console.log('Logout button clicked')
        localStorage.removeItem('access_token');
        navigate('/')
    };

    return (
        <header className="header">
            Rincón de lectura
            {main ? (
                <Button text="Admin" onClick={handleAdminClick}/>
            ) : (
                <Button text="Salir" onClick={handleLogout}/>
            )}
        </header>
    );
};

Header.propTypes = {
    main: PropTypes.bool.isRequired
};

export default Header;
