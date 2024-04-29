import './Header.css'
import Button from './Button'; // Importa el componente Button si están en el mismo directorio

const Header = () => {
    const handleAdminClick = () => {
        // Lógica para manejar el clic en el botón "Admin"
        console.log('Admin button clicked');
    };

    return (
        <header className="header">
            Rincón de lectura
            <Button text="Admin" onClick={handleAdminClick} />
        </header>
    );
};

export default Header;
