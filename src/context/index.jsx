import { createContext, useState, useContext, useEffect } from "react";
import { Map } from 'immutable';
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(Map());
    const [loading, setLoading] = useState(true);
    const [prefGenre, setPrefGenre] = useState([]);
    const [purchases, setPurchases] = useState(Map());
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
    const [refreshGenre, setRefreshGenre] = useState([]);

    const toggleGenre = (genre) => {
        setChecked((prevChecked) => {
            const updatedChecked = { ...prevChecked, [genre]: !prevChecked[genre] };
            const updatedPrefGenre = Object.keys(updatedChecked)
                .filter((genreKey) => updatedChecked[genreKey])
                .map((genreKey) => genres.find((g) => g.genre === genreKey));
            setPrefGenre(updatedPrefGenre);

            return updatedChecked;
        });
    };


    const resetState = () => {
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
        setUser(null);
        setPurchases(Map());
        setRefreshGenre("");
    };

    useEffect(() => {
        if (prefGenre.length > 0) {
            const genreNames = prefGenre.map((genreObj) => genreObj.genre);
            genreNames.forEach((genre) => {
                setChecked((prevChecked) => {
                    const updatedChecked = { ...prevChecked, [genre]: !prevChecked[genre] };
                    return updatedChecked;
                })
            });
        }
    }, [refreshGenre]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                const sessionCart = localStorage.getItem(user.uid);
                if (sessionCart) {
                    setCart(Map(JSON.parse(sessionCart)));
                }
                const getGenresandPurchases = async () => {
                    try {
                        const docRef = doc(firestore, "users", user.email);
                        const docSnap = (await getDoc(docRef));
                        if (docSnap.exists()) {
                            const data = (await getDoc(docRef)).data();
                            setPurchases(Map(data.purchases));
                            setPrefGenre(data.genres);
                            setRefreshGenre(data.genres);
                        } else {
                            setPurchases(Map());
                        }
                    } catch (error) {
                    }
                };
                getGenresandPurchases();
            }
            setLoading(false);
        });
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <StoreContext.Provider value={{ user, setUser, cart, setCart, checked, setChecked, toggleGenre, prefGenre, setPrefGenre, resetState, purchases, setPurchases }}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}