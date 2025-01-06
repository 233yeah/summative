import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./GenreView.css";
import { useStoreContext } from '../context';

function GenreView() {
    const [movies, setMovies] = useState([]);
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const navigate = useNavigate();
    const genreNames = {
        0: "None",
        28: "Action",
        12: "Adventure",
        16: "Animation",
        80: 'Crime',
        35: "Comedy",
        10751: "Family",
        10402: "Music",
        36: "History",
        27: "Horror",
        9648: "Mystery",
        878: "Sci-Fi",
        14: "Fantasy",
        10752: "War",
        53: "Thriller",
        37: "Western",
    };

    const genreName = genreNames[id];
    const { firstName, cart, setCart } = useStoreContext();
    const [buttonText, setButtonText] = useState('Buy');

    useEffect(() => {
        if (id === null) return;
        async function getMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${id}&page=${page}`
            );
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        }

        getMovies();
    }, [id][page]);

    useEffect(() => {
        setPage(1);
    }, [id]);

    useEffect(() => {
        if (cart.has(id)) {
            setButtonText("Added");
        } else {
            setButtonText("Buy");
        }
    }, [cart, id]);

    function nextPage() {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    function previousPage() {
        if (page != 1) {
            setPage(page - 1);
        }
    }

    function loadMovie(id) {
        navigate(`/movie/details/${id}`);
    }

    function cartPage() {
        navigate(`/cart`);
    }

    function addToCart(movie) {
        const movieDetails = {
            title: movie.original_title,
            url: movie.poster_path,
        };
        setCart((prevCart) => prevCart.set(movie.id, movieDetails));
    }

    return (
        <div className="genre-list-container">
            <h className="name-title">Hello {firstName}</h>
            <p className="page-title">Page: {page}/{totalPages} Current Genre:{genreName}</p>
            <button className="cart-button" onClick={cartPage}>Cart</button>
            <div className="movie-list">
                {movies.map((movie) => (
                    <div>
                        <div key={movie.id} className="movie-item" onClick={() => { loadMovie(movie.id) }}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                            <h className="movie-title">{movie.title}</h>
                        </div>
                        <button className="buy-button" onClick={() => addToCart(movie)}> {cart.has(movie.id) ? "Added" : "Buy"} </button>
                    </div>
                ))}
            </div>
            {page < totalPages && (
                <div className="genre-buttons">
                    <button className="page-button" onClick={previousPage}>
                        Previous Page
                    </button>
                    <button className="page-button" onClick={nextPage}>
                        Next Page
                    </button>
                </div>
            )}
        </div>
    )
}

export default GenreView;