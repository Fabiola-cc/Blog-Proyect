import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostForms.css'
import Button from './Button';

const PostForm = ({ isEditing, existingPostData }) => {
    const [formData, setFormData] = useState({
        book_title: '',
        author: '',
        genre: '',
        sinopsis: '',
        comments: ''
    });
    
    const updatePost = async (postId, updatedData) => {
        try {
            const response = await fetch(`https://api.tiburoncin.lat/22787/posts/${postId}`, {
                method: 'PUT', // o 'PATCH' dependiendo de la API
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el post');
            }
        } catch (error) {
            console.error('Error al actualizar el post:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Limpiar el formulario después de enviar
        setFormData({
            book_title: '',
            author: '',
            genre: '',
            sinopsis: '',
            comments: ''
        });
    };

    const loadPostData = (postData) => {
        setFormData({
            book_title: postData.book_title,
            author: postData.author,
            genre: postData.genero,
            sinopsis: postData.sinopsis,
            comments: postData.comments
        });
    };
    
    // Llamar a la función loadPostData con los datos del post existente cuando sea necesario
    useEffect(() => {
        if (isEditing) { // isEditing es un booleano que indica si estás editando un post
            loadPostData(existingPostData);
        }
    }, [isEditing, existingPostData]); // Dependencias para el efecto

    return (
        <div className='post-form'>
            <h2>Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="book_title">Book Title:</label>
                    <input type="text" id="book_title" name="book_title" value={formData.book_title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="sinopsis">Sinopsis:</label>
                    <textarea id="sinopsis" name="sinopsis" value={formData.sinopsis} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="comments">Comments:</label>
                    <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} required />
                </div>
                <Button text="Completado" onClick={handleSubmit}/>
            </form>
        </div>
    );
};

PostForm.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    existingPostData: PropTypes.object
};

export default PostForm;
