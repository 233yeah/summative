import "./MovieView.css";
import Header from "../components/Header";
import Genre from "../components/Genre";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useStoreContext } from '../context';

function MovieView() {
    const { prefGenre } = useStoreContext();

    return (
        <div>
            <Header />
            <div className="middle-container">
                <Genre genreList={prefGenre} />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MovieView;