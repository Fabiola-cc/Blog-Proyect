import './MainPage.css'
import Header from '../Components/Header';
import Content from '../Components/Content';
import Footer from '../Components/Footer';

const MainPage = () => {
    return (
        <div className="mainpage">
            <Header main={true}/>
            <Content />
            <Footer />
        </div>
    );
};
  
export default MainPage;