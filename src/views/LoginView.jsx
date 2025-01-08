import "./LoginView.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser, setLogin } = useStoreContext();

    async function loginByEmail(event) {
        event.preventDefault();

        try {
            const user = (await signInWithEmailAndPassword(auth, email, password)).user;
            navigate(`/movie/genre/0`);
            setUser(user);
            setLogin(true);
        } catch (error) {
            console.log(error);
            alert("Error signing in!");
        }
    }

    async function loginByGoogle() {
        try {
          const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
          navigate('/movies/all');
          setUser(user);
        } catch (error) {
          console.log(error);
          alert("Error signing in!");
        }
      }

    return (
        <div>
            <Header />
            <div className="login-container">
                <h className="login-title">Welcome Back</h>
                <form className="login-form" onSubmit={(event) => { loginByEmail(event) }}>
                    <label className="login-text">Email:</label>
                    <input type="email" className="login-inputs" value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                    <label className="login-text">Password:</label>
                    <input type="password" className="login-inputs" value={password} onChange={(event) => { setPassword(event.target.value) }} required />
                    <button className="login-button" type="submit">Sign In</button>
                </form>
                <button className="login-button" onClick={()=>loginByGoogle()}>Sign In With Google</button>

            </div>
            <Footer />
        </div>

    )
}

export default LoginView;