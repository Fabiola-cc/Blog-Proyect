import { useEffect } from 'react';

import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';


const App = () => {
  useEffect(() => {
      document.body.style.backgroundImage = "url('./img/library_wp.jpg')";
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      
      // Asegúrate de limpiar el efecto al desmontar el componente
      return () => {
          document.body.style.backgroundImage = '';
          document.body.style.backgroundSize = '';
          document.body.style.backgroundRepeat = '';
          document.body.style.backgroundPosition = '';
      };
  }, []); // El segundo argumento del useEffect asegura que el efecto solo se ejecute una vez

  return (
    <>
    <main className="app">
          <Header />
          <Content />
          <Footer />
    </main>
    </>
  );
};

export default App;