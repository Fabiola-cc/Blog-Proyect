# Blog de Lectura

Este repositorio contiene el código fuente para un blog de lectura, que consta de un cliente y un servidor.

## Cliente

El cliente es una aplicación web desarrollada con React y Vite. Contiene la interfaz de usuario para interactuar con el blog, incluyendo la visualización de posts, la creación y edición de posts, y la administración de usuarios.

### Estructura del Cliente

- **index.html**: Página principal de la aplicación.
- **src/**: Directorio que contiene el código fuente del cliente.
  - **App.jsx**: Componente principal de la aplicación.
  - **Components/**: Directorio que contiene los componentes reutilizables de la aplicación.
  - **Hooks/**: Directorio que contiene los custom hooks utilizados en la aplicación.
  - **Pages/**: Directorio que contiene las páginas principales de la aplicación, como la página de inicio y la página de administración.
  - **assets/**: Directorio que contiene los recursos estáticos utilizados en la aplicación, como imágenes y archivos SVG.
  - **main.jsx**: Punto de entrada principal de la aplicación.
- **vite.config.js**: Archivo de configuración de Vite.

## Servidor

El servidor es una API REST desarrollada con Node.js y Express. Gestiona la lógica del backend, incluyendo la autenticación de usuarios, la gestión de posts y la interacción con la base de datos.

### Estructura del Servidor

- **main.js**: Archivo principal del servidor que define las rutas y la lógica de negocio.
- **conn.js**: Archivo que establece la conexión con la base de datos.
- **db.js**: Archivo que contiene las funciones para interactuar con la base de datos.
- **jwt.js**: Archivo que proporciona funciones para generar y validar tokens JWT para la autenticación de usuarios.
- **schema.sql**: Archivo SQL que define el esquema de la base de datos.
- **swagger.yaml**: Archivo YAML que contiene la documentación de la API en formato Swagger.

## Uso

Para ejecutar el cliente y el servidor, de manera local, sigue estas instrucciones:

1. **Cliente**:
   - Instala las dependencias utilizando `npm install`.
   - Ejecuta el cliente con `npm run dev`.

2. **Servidor**:
   - Haz uso de un administrador de base de datos y modifica conn.js según tus necesidades
   - Instala las dependencias utilizando `npm install`.
   - Ejecuta el servidor con `npm start`.

## Obtención en Línea

El cliente puede ser accedido en línea desde [https://sweet-peony-9eebb7.netlify.app/](https://sweet-peony-9eebb7.netlify.app/).

La API del servidor está disponible en línea en [https://api.tiburoncin.lat/22787/posts](https://api.tiburoncin.lat/22787/posts). 
- Puedes cambiar el endpoint según tus necesidades para interactuar con diferentes partes de la API.
