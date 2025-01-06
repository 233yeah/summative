import { useStoreContext } from "../context";
import "./SettingsView.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function SettingsView() {
    const { password, email, firstName, lastName, checked, toggleGenre, setFirstName, setLastName, prefGenre } = useStoreContext();
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

    function changeName(event) {
        event.preventDefault();
        alert("changed!");
    }

    function backPage() {
        if (prefGenre.length >= 10) {
            navigate(`/movie/genre/0`);
        } else {
            alert("make sure you selected at least 10 genres");
        }
    }

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
                                onChange={() => toggleGenre(item)}
                                id={`checkbox-${i}`}
                            />
                            <label className="genre-name">{item.genre}</label>
                        </div>
                    ))}
                    <p className="genre-count"># of genres selected {prefGenre.length}</p>
                </div>
                <div className="settings-view">
                    <button onClick={() => backPage()} className="back-button">Back</button>
                    <h1>Settings</h1>
                    <div className="settings-info">
                        <form className="settings-form" onSubmit={(event) => { changeName(event) }}>
                            <label className="settings-text">First Name:</label>
                            <input type="text" id="first-name" className="settings-inputs" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} required />
                            <label className="settings-text">Last Name:</label>
                            <input type="text" id="last-name" className="settings-inputs" value={lastName} onChange={(event) => { setLastName(event.target.value) }} required />
                            <button className="settings-button">Change First/Last Name?</button>
                        </form>
                        <label className="settings-text">Email:</label>
                        <input type="email" id="email" className="settings-inputs readOnly" value={email} required />
                        <label className="settings-text">Password:</label>
                        <input type="text" id="email" className="settings-inputs readOnly" value={password} required />
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SettingsView;