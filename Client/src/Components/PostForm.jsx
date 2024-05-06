import PropTypes from 'prop-types';
import './PostForms.css'
import Button from './Button';
import useForm from '../Hooks/useForm';
import useApi from '../Hooks/useApi';

const PostForm = ({ isEditing, existingPostData, onClose }) => {
    const apiUrl = 'https://api.tiburoncin.lat/23787/posts';
    const { put } = useApi(apiUrl);
    const updatePost = async (postId, updatedData) => {
        try {
            await put(`/${postId}`, updatedData);
            console.log('Post updated successfully');
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    };

    const { post } = useApi(apiUrl);
    const createPost = async (postData) => {
        try {
            const newPost = await post('/', postData);
            console.log('New post created:', newPost);
            return newPost;
        } catch (error) {
            console.error('Error creating post:', error.message);
            throw error;
        }
    };
    
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
