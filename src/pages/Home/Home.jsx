import RecipesGallery from "../../components/RecipesGallery/RecipesGallery";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";

function Home() {
    return ( <div>
          <Header />
             <Outlet />
        <RecipesGallery />
        <Footer />
    </div> );
}

export default Home;