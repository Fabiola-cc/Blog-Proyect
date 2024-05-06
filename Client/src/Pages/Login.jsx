import './Login.css'
import Button from '../Components/Button';

import useToken from '../Hooks/useToken'
import useNavigate from '../Hooks/useNavigate'
import useApi from '../Hooks/useApi';
import useForm from '../Hooks/useForm';

function LoginForm() {
    const { navigate } = useNavigate()
    const { setToken } = useToken()

    const { login, loading, error } = useApi();

    const initialValues = {
      username: '',
      password: ''
    }

    const handleLogin = async () => {
      try {
        const actual_token = await login(formData.username, formData.password);
        if (actual_token === undefined) {
          throw new Error('Usuario o contraseña incorrectos.');
        }
        // Acciones después de iniciar sesión exitosamente
        await setToken(actual_token) //Esperar a guardar el token para continuar
        navigate('/admin')
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    };
    
    const { formData, handleChange, handleSubmit } = useForm(initialValues, handleLogin);

    return (
        <div className='login'>
          <form className="login-form" onSubmit={handleSubmit}>
              <div className='topLogin'>
                <Button text='←' onClick={()=>navigate('/')}/>
                <h2>Iniciar Sesión</h2>
              </div>
              <div className="input-group">
                  <label htmlFor="username">Usuario</label>
                  <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required/>
              </div>
              <div className="input-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
              </div>
              <Button text="Ingresar"/>
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
          </form>
        </div>
    );
}

export default LoginForm;
