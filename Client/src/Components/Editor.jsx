import { useState, useEffect } from 'react';
import './Content.css';
import MenuContent from './MenuContent';
import EditPost from './EditPost'
import Button from './Button';
import PostForm from './PostForm';
import './PostForms.css'
import useApi from '../Hooks/useApi';
import libraryImage from '../assets/loading.gif';

const Editor = () => {
    // FETCH CONTENT
    const [posts, setPosts] = useState([]);
    const [toCreate, setToCreate] = useState(false);

    const apiUrl = 'https://api.tiburoncin.lat/23787/posts';
    const { get } = useApi(apiUrl);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await get('/');
                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };
        fetchPosts();
    }, [get]);

    // WAITING LOGIC
    if (posts.length === 0) {
        return (
            <div className='imageContainer'>
                <img src={libraryImage} alt="loading" className="loading-image" />
            </div>);
    }

    const handleClick = () => {
        // Lógica para manejar el clic en el botón "Crear"
        setToCreate(true);
        console.log('Create button clicked');
    };

    const closeCreate = () => {
        // Lógica para manejar el clic en el botón "Crear"
        setToCreate(false);
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
            {toCreate && ( //Formulario para crear posts (botón en menú)
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setToCreate(false)}>&times;</span>
                        <PostForm isEditing={false} onClose={() => closeCreate()} />
                    </div>
                </div>
            )}

            
            <ul className="posts">
                {posts.map(({ id, book_title, author, genre, sinopsis, comments }) => (
                    <EditPost key={id} id={id} book_title={book_title} author={author} genre={genre} sinopsis={sinopsis} comments={comments} />
                ))}
            </ul>
        </div>
    );
};

export default Editor;