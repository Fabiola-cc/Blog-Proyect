import './Header.css'
import Button from './Button';
import PropTypes from 'prop-types';

const Header = ({ main }) => {
    
    const handleAdminClick = () => {
        // Redirigir a la pantalla de login
        
    };

    const handleLogout = () => {
        // Redirigir a la pantalla principal
        
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
