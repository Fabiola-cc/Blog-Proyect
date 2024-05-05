import PropTypes from 'prop-types';
import './PostForms.css'
import Button from './Button';
import useForm from '../Hooks/useForm';

const PostForm = ({ isEditing, existingPostData, onClose }) => {
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

    const createPost = async(postData) => {
        console.log(postData)
        try {
            const response = await fetch('https://api.tiburoncin.lat/22787/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
            });
        
            if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error creating post: ${errorMessage}`);
            }
        
            const newPost = await response.json();
            return newPost;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }  
    
    const initialValues = existingPostData ? existingPostData :{
        book_title: '',
        author: '',
        genre: '',
        sinopsis: '',
        comments: ''
    };

    const handlePost = (postData) => {
        if (isEditing) {
            updatePost(existingPostData.id, postData);
        } else {
            createPost(postData);
        }
        onClose();
    };

    const { formData, handleChange, handleSubmit } = useForm(initialValues, handlePost);

    return (
        <div className='post-form'>
            <h2>Post Libro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="book_title">Título:</label>
                    <input type="text" id="book_title" name="book_title" value={formData.book_title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="author">Autor:</label>
                    <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="genre">Genero:</label>
                    <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="sinopsis">Sinopsis:</label>
                    <textarea id="sinopsis" name="sinopsis" value={formData.sinopsis} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="comments">Comentarios:</label>
                    <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} required />
                </div>
                <Button text="Completado" type="submit" />
            </form>
        </div>
    );
};

PostForm.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    existingPostData: PropTypes.object,
    onClose: PropTypes.func.isRequired
};

export default PostForm;
