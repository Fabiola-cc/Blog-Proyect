import PropTypes from 'prop-types';
import './Post.css';

const Post = ({ id, book_title, author, sinopsis, comments, fecha }) => {
    const postClassName = id % 2 !== 0 ? 'post post-blueish' : 'post post-redish';

    return (
        <li className={postClassName}>
            <h1>{book_title}</h1>
            <h3>Autor: {author}</h3>
            <p>Sinópsis: {sinopsis}</p>
            <p>Comentario: {comments}</p>
            <p>Editado: {fecha}</p>
        </li>
    );
};

Post.propTypes = {
    id: PropTypes.number.isRequired,
    book_title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    sinopsis: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
};

export default Post;

