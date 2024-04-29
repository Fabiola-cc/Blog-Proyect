import './Login.css'

function LoginForm() {
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
            <button type="submit" className="btn-submit">Ingresar</button>
        </form>
    );
}

export default LoginForm;
