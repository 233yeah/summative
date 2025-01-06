import "./RegisterView.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from '../context';

function RegisterView() {
    const { setFirstName, setLastName, setEmail, setPassword, setLogin, checked, prefGenre, toggleGenre } = useStoreContext();
    const firstName = useRef('');
    const lastName = useRef('');
    const email = useRef('');
    const password = useRef('');
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

    function register(event) {
        event.preventDefault();
        if (password.current.value === rePassword && prefGenre.length >= 10) {
            setFirstName(firstName.current.value);
            setLastName(lastName.current.value);
            setEmail(email.current.value);
            setPassword(password.current.value);
            setLogin(true);
            navigate(`/movie/genre/0`);
        } else {
            alert("make sure the passwords match and you selected at least 10 genres");
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
                    <form className="register-form" onSubmit={(event) => { register(event) }}>
                        <label className="register-text">First Name:</label>
                        <input type="text" id="first-name" className="register-inputs" ref={firstName} required />
                        <label className="register-text">Last Name:</label>
                        <input type="text" id="last-name" className="register-inputs" ref={lastName} required />
                        <label className="register-text">Email:</label>
                        <input type="email" id="email" className="register-inputs" ref={email} required />
                        <label className="register-text">Password:</label>
                        <input type="password" id="email" className="register-inputs" ref={password} required />
                        <label className="register-text">Re-Enter Password:</label>
                        <input type="password" className="register-inputs" value={rePassword} onChange={(event) => { setRePassword(event.target.value) }} required />
                        <button className="register-button">Sign Up</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default RegisterView;