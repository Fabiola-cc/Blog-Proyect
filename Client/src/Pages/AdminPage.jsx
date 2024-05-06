import './MainPage.css'
import Header from '../Components/Header';
import Editor from '../Components/Editor';
import Footer from '../Components/Footer';
import useToken from '../Hooks/useToken'

const AdminPage = () => {
    const { getRawToken } = useToken()
    const decodedToken = getRawToken()

    if (decodedToken.actions !== 'all actions') {
        return <h1>Unauthorized</h1>
    }

    return (
        <div className="mainpage">
            <Header main={false} />
            <Editor />
            <Footer />
        </div>
    );
};
  
export default AdminPage;