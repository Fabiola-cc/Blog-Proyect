import { useState, useEffect } from 'react';
import './Content.css';
import MenuContent from './MenuContent';
import EditPost from './EditPost'
import Button from './Button';

const Editor = () => {
    // FETCH CONTENT
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const getPosts = async () => {
        try {
            const apiResponse = await fetch('https://api.tiburoncin.lat/22787/posts');
            if (!apiResponse.ok) {
                throw new Error('Error al cargar los datos del API');
            }
            const jsonPosts = await apiResponse.json();
            setPosts(jsonPosts);
        } catch (error) {
            console.error('Error al cargar los datos del API:', error.message);
            setError('Error al cargar los datos del API. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    // ERROR CATCH
    if (error) {
        return (
            <div>
                {error && <div className="error">{error}</div>}
            </div>
        );
    }

    // WAITING LOGIC
    if (posts.length === 0) {
        return <img src="/img/loading.gif" alt="loading" className="loading-image" />;
    }

    const handleClick = () => {
        // Lógica para manejar el clic en el botón "Editar"
        console.log('Edit button clicked');
    };

    // VISUALIZE
    return (
        <div className="content">
            <ul className="menu" >
                <h2>Contenido del blog:</h2>
                {posts.map(({ id, book_title, genre }) => (
                    <MenuContent key={id} book_title={book_title} genre={genre} />
                ))}
                <Button text='Crear Post' onClick={handleClick}/>
            </ul>

            <ul className="posts">
                {posts.map(({ id, book_title, author, genero, sinopsis, comments }) => (
                    <EditPost key={id} id={id} book_title={book_title} author={author} genero={genero} sinopsis={sinopsis} comments={comments} />
                ))}
            </ul>
        </div>
    );
};

export default Editor;