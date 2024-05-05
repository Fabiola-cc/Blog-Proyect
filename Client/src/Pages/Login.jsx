import './Login.css'
import { md5 } from 'js-md5'
import Button from '../Components/Button';

import { useState } from 'react'
import useToken from '../Hooks/useToken'
import useNavigate from '../Hooks/useNavigate'

function LoginForm() {
    const { navigate } = useNavigate()
    const { setToken } = useToken() 
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
  
    const [errorMessage, setErrorMessage] = useState('')
  
    const setValue = (name, value) => {
      switch(name) {
        case 'username':
          setUsername(value)
          break
        case 'password':
          setPassword(value)
          break
      }
    }

    const handleClick = async () => {
      // Lógica para manejar el clic en el botón "Ingresar"
      console.log('Login button clicked');
      localStorage.setItem('user', username);
      localStorage.setItem('pw', password);
  
      // Verificar si el usuario y la contraseña coinciden con los valores predefinidos
      if (username === 'admin-blog' && md5(password) === md5('12345')) {
          // Si coinciden, establecer el token y redirigir al usuario a la página de administrador
          const token = 'your_access_token'; // Aquí podrías generar un token JWT o usar un valor fijo
          setToken(token);
          
          // Guardar el token en el almacenamiento local
          localStorage.setItem('token', token);
          
          navigate('/admin');
      } else {
          // Si no coinciden, mostrar un mensaje de error
          setErrorMessage('Usuario o contraseña incorrecta');
      }
  };  

    return (
        <div className='login'>
          <form className="login-form">
              <h2>Iniciar Sesión</h2>
              {
                  errorMessage !== '' ? (
                  <div className='error-message' onClick={() => setErrorMessage('')}>
                      {errorMessage}
                  </div>
                  ) : null
              }
              <div className="input-group">
                  <label htmlFor="username">Usuario</label>
                  <input type="text" id="username" onChange={(event) => setValue('username', event.target.value)}/>
              </div>
              <div className="input-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" id="password" onChange={(event) => setValue('password', event.target.value)}/>
              </div>
              <Button text="Ingresar" onClick={handleClick} />
          </form>
        </div>
    );
}

export default LoginForm;
