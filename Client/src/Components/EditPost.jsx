import PropTypes from 'prop-types';
import './Post.css';
import Button from './Button';

const Post = ({ id, book_title, author, genero, sinopsis, comments }) => {
    const postClassName = id % 2 !== 0 ? 'post post-blueish' : 'post post-redish';
    const handleClick = () => {
        // Lógica para manejar el clic en el botón "Editar"
        console.log('Edit button clicked');
    };

    return (
        <li className={postClassName}>
            <h1>{book_title}</h1>
            <h3>Autor: {author}</h3>
            <p>Género: {genero}</p>
            <p>Sinópsis: {sinopsis}</p>
            <p>Comentario: {comments}</p>
            <Button text='Editar' onClick={handleClick}/>
        </li>
    );
};

Post.propTypes = {
    id: PropTypes.number.isRequired,
    book_title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genero: PropTypes.string.isRequired,
    sinopsis: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
};

export default Post;
