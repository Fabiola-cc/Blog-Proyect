import './MainPage.css'
import Header from '../Components/Header';
import Editor from '../Components/Editor';
import Footer from '../Components/Footer';

const AdminPage = () => {
    return (
        <div className="mainpage">
            <Header main={false} />
            <Editor />
            <Footer />
        </div>
    );
};
  
export default AdminPage;