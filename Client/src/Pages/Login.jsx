import './Login.css'
import Button from '../Components/Button';

function LoginForm() {
    const handleClick = () => {
        // Lógica para manejar el clic en el botón "Ingresar"
        console.log('Login button clicked');
    };

    return (
        <form className="login-form">
            <h2>Iniciar Sesión</h2>
            <div className="input-group">
                <label htmlFor="username">Usuario</label>
                <input type="text" id="username" />
            </div>
            <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" />
            </div>
            <Button text="Ingresar" onClick={handleClick} />
        </form>
    );
}

export default LoginForm;
