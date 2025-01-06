import { useState, useEffect } from "react";
import axios from "axios";
import "./Feature.css";

function Feature() {
    const [image1, setImage1] = useState([]);
    const [image2, setImage2] = useState([]);
    const [image3, setImage3] = useState([]);
    const [image4, setImage4] = useState([]);

    useEffect(() => {
        (async function getImages() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`
            );
            setImage1(response.data.results[Math.floor(Math.random() * 20)].poster_path);
            setImage2(response.data.results[Math.floor(Math.random() * 20)].poster_path);
            setImage3(response.data.results[Math.floor(Math.random() * 20)].poster_path);
            setImage4(response.data.results[Math.floor(Math.random() * 20)].poster_path);
        })()
    }, [])

    return (
        <div className="feature">
            <p2>Movies for rent($2.99 a month)</p2>
            <div className="feature-flex">
                <img
                    className="feature-image"
                    src={`https://image.tmdb.org/t/p/w500${image1}`}
                />
                <img
                    className="feature-image"
                    src={`https://image.tmdb.org/t/p/w500${image2}`}
                />
                <img
                    className="feature-image"
                    src={`https://image.tmdb.org/t/p/w500${image3}`}
                />
                <img
                    className="feature-image"
                    src={`https://image.tmdb.org/t/p/w500${image4}`}
                />
            </div>
        </div>

    )
}
export default Feature;
