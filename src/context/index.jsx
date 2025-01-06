import { createContext, useState, useContext } from "react";
import { Map } from 'immutable';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cart, setCart] = useState(Map());
    const [login, setLogin] = useState(false);
    const [prefGenre, setPrefGenre] = useState([]);
    const genres = [
        { id: 28, genre: 'Action' },
        { id: 12, genre: 'Adventure' },
        { id: 16, genre: 'Animation' },
        { id: 80, genre: 'Crime' },
        { id: 35, genre: 'Comedy' },
        { id: 10751, genre: 'Family' },
        { id: 10402, genre: 'Music' },
        { id: 36, genre: 'History' },
        { id: 27, genre: 'Horror' },
        { id: 9648, genre: 'Mystery' },
        { id: 878, genre: 'Sci-Fi' },
        { id: 10752, genre: 'War' },
        { id: 53, genre: 'Thriller' },
        { id: 37, genre: 'Western' }
    ];
    const toggleGenre = (genre) => {
        setChecked((prev) => {
            const updatedChecked = { ...prev, [genre.genre]: !prev[genre.genre] };
            const updatedPrefGenre = Object.keys(updatedChecked)
                .filter((genreKey) => updatedChecked[genreKey])
                .map((genreKey) => genres.find((g) => g.genre === genreKey));

            setPrefGenre(updatedPrefGenre);

            return updatedChecked;
        });
    };
    const [checked, setChecked] = useState({
        Action: false,
        Adventure: false,
        Animation: false,
        Crime: false,
        Comedy: false,
        Family: false,
        Music: false,
        History: false,
        Horror: false,
        Mystery: false,
        Sci_Fi: false,
        War: false,
        Fantasy: false,
        Thriller: false,
        Western: false
    });
    const resetState = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setCart(Map())
        setChecked({
            Action: false,
            Adventure: false,
            Animation: false,
            Crime: false,
            Comedy: false,
            Family: false,
            Music: false,
            History: false,
            Horror: false,
            Mystery: false,
            Sci_Fi: false,
            War: false,
            Fantasy: false,
            Thriller: false,
            Western: false
        });
        setPrefGenre("");
    };

    return (
        <StoreContext.Provider value={{ email, setEmail, password, setPassword, firstName, setFirstName, lastName, setLastName, cart, setCart, login, setLogin, checked, setChecked, toggleGenre, prefGenre, setPrefGenre, resetState }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}