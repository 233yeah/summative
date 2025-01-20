import { useStoreContext } from "../context";
import "./SettingsView.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

function SettingsView() {
    const { user, checked, toggleGenre, prefGenre, purchases } = useStoreContext();
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
    const [isReadOnly, setIsReadOnly] = useState(false);
    const nameArray = user.displayName.split(" ");
    const [firstName, setFirstName] = useState(nameArray[0]);
    const [lastName, setLastName] = useState(nameArray[1]);
    const [password, setPassword] = useState("");

    function changeName(event) {
        event.preventDefault();
        updateProfile(user, { displayName: `${firstName} ${lastName}` });
        alert("changed!");
    }

    function backPage() {
        navigate(`/movie/genre/0`);
    }

    const updateGenres = async () => {
        if (prefGenre.length >= 10) {
            const docRef = doc(firestore, "users", user.email);
            const userData = { genres: prefGenre };
            await setDoc(docRef, userData, { merge: true });
            alert("Changed!");
        } else {
            alert("make sure you selected at least 10 genres");
        }
    }

    const changePass = async (newPassword) => {
        try {
            await updatePassword(user, newPassword);
            alert("Password updated successfully!");
        } catch (error) {
            alert("There was an error updating your password.");
        }
    };

    useEffect(() => {
        if (user.emailVerified) {
            setIsReadOnly(true);
        }
    }, [])

    return (
        <div>
            <Header />
            <div className="register-flex">
                <div className="settings-checklist">
                    <h className="genre-title">Genres</h>
                    <p className="settings-paragraph">Please choose up to 10 genres so we can personalize your account</p>
                    {genres.map((item, i) => (
                        <div key={i}>
                            <input
                                type="checkbox"
                                checked={checked[item.genre]}
                                onChange={() => toggleGenre(item.genre)}
                                id={`checkbox-${i}`}
                            />
                            <label className="genre-name" htmlFor={`checkbox-${i}`}>{item.genre}</label>
                        </div>
                    ))}
                    <button className="settings-button" onClick={() => updateGenres()}>Change Genres?</button>
                    <p className="genre-count"># of genres selected {prefGenre.length}</p>
                </div>
                <div className="settings-view">
                    <button onClick={() => backPage()} className="back-button">Back</button>
                    <h1>Settings</h1>
                    <div className="settings-info">
                        <form className="settings-form" onSubmit={(event) => { changeName(event) }}>
                            <label className="settings-text">First Name:</label>
                            <input type="text" id="first-name" className="settings-inputs" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} readOnly={isReadOnly} required></input>
                            <label className="settings-text">Last Name:</label>
                            <input type="text" id="last-name" className="settings-inputs" value={lastName} onChange={(event) => { setLastName(event.target.value) }} readOnly={isReadOnly} required />
                            {!isReadOnly && (<button className="settings-button">Change First/Last Name?</button>)}
                        </form>
                        <label className="settings-text">Email:</label>
                        <input type="email" id="email" className="settings-inputs" readOnly value={user.email} required />
                        {!isReadOnly && (<label className="settings-text">Password:</label>)}
                        {!isReadOnly && (<input type="text" id="text" className="settings-inputs" readOnly={isReadOnly} value={user.password} onChange={(event) => { setPassword(event.target.value) }} required />)}
                        {!isReadOnly && (<button className="settings-button" onClick={() => { changePass(password) }}>Change Password?</button>)}
                        <h1>Previous Purchases:</h1>
                        <div className="cart-items">
                            {
                                purchases.entrySeq().reverse().map(([key, value]) => {
                                    return (
                                        <div className="cart-item" key={key}>
                                            <img src={`https://image.tmdb.org/t/p/w500${value.url}`} />
                                            <h1>{value.title}</h1>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SettingsView;