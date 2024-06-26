import express from 'express'
import cors from 'cors'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import {
  getAllPosts, getPostById, insertPost, updatePost, deletePost, login, users
} from './db.js';
import { generateToken, validateToken } from './jwt.js'

const app = express();
const port = 23787;

// Utilizar express.json() para analizar solicitudes con cuerpo JSON
app.use(express.json());
app.use(cors())

// Cargar el archivo swagger.yaml
const swaggerDocument = YAML.load('./swagger.yaml');

// Middleware para servir la documentación de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const posts = await users();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Obtener un post por su ID
app.get('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  try {
    const post = await getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Crear un nuevo post
app.post('/posts', async (req, res) => {
  const postData = req.body;
  try {
    const postId = await insertPost(postData);
    res.status(201).json({ id: postId, ...postData });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Actualizar un post existente
app.put('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const postData = req.body;
  try {
    await updatePost(postId, postData);
    res.status(200).json({ id: postId, ...postData });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Eliminar un post
app.delete('/posts/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  try {
    await deletePost(postId);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  
  const success = await login(username, password)
  if (success) {
    const user = {
      username,
      email: 'fabileja0079@gmail.com',
      actions: 'all actions',
    }
    const token = generateToken(user)
    res.status(200)
    res.json({ "success": true, access_token: token })
    return
  }

  res.status(401)
  res.json({ "success": false })
})

app.get('/access', async (req, res) => {
  console.log('req.headers', req.headers)
  const { authorization } = req.headers
  const access_token = authorization.substring(7)
  
  if (validateToken(access_token)) {
    res.status(200)
    res.json([{ name: 'admin', id: '1'}])
    return
  }

  res.status(403)
  res.json([])
})


// Manejador de errores para errores 500
app.use((err, req, res) => {
  // Registra el error en un archivo de registro
  fs.appendFileSync('error.log', `Internal server error: ${err}\n`)
  // Envía una respuesta de error al cliente
  res.status(500).json({ error: 'Internal server error' })
})

// Manejador de errores para métodos no implementados (501)
app.use((req, res) => {
  res.status(501).json({ error: 'Method not implemented' })
})

// Manejador de errores para endpoints no existentes (404) y errores de formato de body (400)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})