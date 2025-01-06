import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailView.css";
import { useStoreContext } from "../context";

function DetailView() {
    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const { cart, setCart } = useStoreContext();
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState('Buy');

    useEffect(() => {
        if (id === null) return;

        async function getDetails() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`
            );
            setDetails(response.data);
        }
        getDetails();
    }, [id]);

    useEffect(() => {
        if (cart.has(id)) {
            setButtonText("Added");
        } else {
            setButtonText("Buy");
        }
    }, [cart, id]);

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
        <div className="detail-container">
            <h className="detail-title">{details.original_title}</h>
            <p className="detail-tagline">{details.tagline}</p>
            <p className="detail-overview">{details.overview}</p>
            <div className="details-info">
                <p><strong>Release Date:</strong> {details.release_date}</p>
                <p><strong>Runtime:</strong> {details.runtime} minutes</p>
                <p><strong>Language:</strong> {details.original_language}</p>
                {details.vote_average && (
                    <p className="rating"><strong>Rating:</strong> {details.vote_average.toFixed(1)}/10</p>
                )}
            </div>
            <div className="detail-buttons">
                <button className="buy-button" onClick={() => addToCart(details)}> {cart.has(details.id) ? "Added" : "Buy"} </button>
                <button className="cart-button" onClick={cartPage}>Cart</button>
            </div>
            {details.poster_path && (
                <img
                    className="detail-poster"
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    alt={details.original_title}
                />
            )}
            <div className="trailers-section">
                <h2>Trailers</h2>
                <div className="trailers-grid">
                    {details.videos && details.videos.results
                        .filter(trailer => trailer.type === 'Trailer')
                        .map((trailer) => (
                            <div key={trailer.id} className="trailer-tile">
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        className="trailer-thumbnail"
                                        src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
                                        alt={trailer.name}
                                    />
                                    <h3>{trailer.name}</h3>
                                </a>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default DetailView;