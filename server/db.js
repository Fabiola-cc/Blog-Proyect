import conn from './conn.js'

// Obtener posts
export async function getAllPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

// Obtener posts por ID
export async function getPostById(postId) {
  const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
  return rows[0] || null; // Retorna el primer post encontrado o null si no se encuentra ningún post
}

// Insertar un nuevo post
export async function insertPost(postData) {
  const {
    book_title, author, genre, sinopsis, comments,
  } = postData
  const [result] = await conn.query('INSERT INTO blog_posts (book_title, author, genre, sinopsis, comments, fecha) VALUES (?, ?, ?, ?, ?, NOW())', [book_title, author, genre, sinopsis, comments])
  return result.insertId // Retorna el ID del post insertado
}

// Actualizar un post existente
export async function updatePost(postId, postData) {
  const {
    book_title, author, genre, sinopsis, comments,
  } = postData
  await conn.query('UPDATE blog_posts SET book_title = ?, author = ?, genre = ?, sinopsis = ?, comments = ?, fecha = NOW() WHERE id = ?', [book_title, author, genre, sinopsis, comments, postId])
}

// Eliminar un post
export async function deletePost(postId) {
  await conn.query('DELETE FROM blog_posts WHERE id = ?', [postId])
}

// Ingresar
export async function login(user, password_md5) {
  const [rows] = await conn.query('SELECT id FROM users WHERE user = ? AND password = ?', [user, password_md5])
  if (rows.length === 1) {
    return rows[0].id
  }
  return false
}

export async function users() {
  const [rows] = await conn.query('SELECT * FROM users')
  return rows
}