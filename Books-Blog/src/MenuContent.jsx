import PropTypes from 'prop-types';
import './MenuContent.css';

const MenuContent = ({ book_title, genre }) => {
    return (
        <li className="menu-content">
            <h3>{book_title}</h3>
            <p>Género: {genre}</p>
        </li>
    );
};

MenuContent.propTypes = {
    book_title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
};

export default MenuContent;
