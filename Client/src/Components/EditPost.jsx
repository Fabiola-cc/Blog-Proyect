import { useState } from 'react';
import PropTypes from 'prop-types';
import './Post.css';
import Button from './Button';
import PostForm from './PostForm';
import './PostForms.css'
import useApi from '../Hooks/useApi';

const Post = ({ id, book_title, author, genre, sinopsis, comments }) => {
    const postClassName = id % 2 !== 0 ? 'post post-blueish' : 'post post-redish';
    const [isEditing, setIsEditing] = useState(false);

    const apiUrl = 'https://api.tiburoncin.lat/23787/posts';
    const { remove } = useApi(apiUrl);

    const deletePost = async (postId) => {
        try {
            await remove(`/${postId}`);
            console.log('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    };

    const handleClick = (postId) => {
        // Lógica para manejar el clic en el botón "Editar"
        setIsEditing(true);
        console.log('Edit button clicked ' + postId);
    };

    const handleDelete = async (postId) => {
        // Lógica para manejar el clic en el botón "Eliminar"
        await deletePost(postId);
        console.log('Delete button clicked' + postId);
    };    

    return (
        <>
            <li className={postClassName}>
                <h1>{id}.   {book_title}</h1>
                <h3>Autor: {author}</h3>
                <p>Género: {genre}</p>
                <p>Sinópsis: {sinopsis}</p>
                <p>Comentario: {comments}</p>
                <div className='buttons'>
                <Button text='Editar' onClick={() => handleClick(id)}/>
                <Button text='Eliminar' onClick={() => handleDelete(id)}/>
                </div>
                {isEditing && ( //Formulario para editar post (botón en cada uno)
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsEditing(false)}>&times;</span>
                        <PostForm 
                            isEditing={isEditing}
                            existingPostData={{ id, book_title, author, genre, sinopsis, comments }} // Pasar los datos del post existente al formulario de edición
                            onClose={() => setIsEditing(false)}
                        />
                    </div>
                </div>
                )}
            </li>
        </>
    );
};

Post.propTypes = {
    id: PropTypes.number.isRequired,
    book_title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    sinopsis: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
};

export default Post;
