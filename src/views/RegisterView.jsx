import "./RegisterView.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from '../context';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

function RegisterView() {
    const { setLogin, setUser, checked, prefGenre, toggleGenre } = useStoreContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
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
    const navigate = useNavigate();

    const registerByEmail = async (event) => {
        event.preventDefault();
        console.log(auth);
        if (password === rePassword && prefGenre.length >= 10) {
            try {
                const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
                await updateProfile(user, { displayName: `${firstName} ${lastName}` });
                console.log(user.displayName);
                setUser(user);
                setLogin(true);
                navigate(`/movie/genre/0`);
            } catch (error) {
                console.log(error);
                alert("Error creating user with email and password!");
            }
        } else {
            alert("make sure the passwords match and you selected at least 10 genres");
        }
    };

    const registerByGoogle = async () => {
        if (password === rePassword && prefGenre.length >= 10) {

            try {
                const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
                setUser(user);
                setLogin(true);
                navigate(`/movie/genre/0`);
            } catch {
                alert("Error creating user with email and password!");
            }
        }
        else {
            alert("make sure you selected at least 10 genres");
        }
    }
    return (
        <div>
            <Header />
            <div className="register-flex">
                <div className="genre-checklist">
                    <h className="genre-title">Genres</h>
                    <p className="genre-paragraph">Please choose at least 10 genres so we can personalize your account</p>
                    {genres.map((item, i) => (
                        <div key={i}>
                            <input
                                type="checkbox"
                                checked={checked[item.genre]}
                                onChange={() => toggleGenre(item)}
                                id={`checkbox-${i}`}
                            />
                            <label className="genre-name">{item.genre}</label>
                        </div>
                    ))}
                    <p className="genre-count"># of genres selected {prefGenre.length}</p>
                </div>

                <div className="register-container">
                    <h className="register-title">Join Us!</h>
                    <form className="register-form" onSubmit={(event) => { registerByEmail(event) }}>
                        <label className="register-text">First Name:</label>
                        <input type="text" id="first-name" className="register-inputs" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <label className="register-text">Last Name:</label>
                        <input type="text" id="last-name" className="register-inputs" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        <label className="register-text">Email:</label>
                        <input type="email" id="email" className="register-inputs" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label className="register-text">Password:</label>
                        <input type="password" id="password" className="register-inputs" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label className="register-text">Re-Enter Password:</label>
                        <input type="password" className="register-inputs" value={rePassword} onChange={(event) => { setRePassword(event.target.value) }} required />
                        <button className="register-button">Sign Up</button>
                    </form>
                    <button className="register-button" onClick={() => registerByGoogle()}>Sign Up With Google</button>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default RegisterView;