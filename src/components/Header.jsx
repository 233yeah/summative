import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";


function Header() {
    const navigate = useNavigate();
    const { resetState, user } = useStoreContext();

    function loginPage() {
        navigate(`/login`);
    }

    function registerPage() {
        navigate(`/register`);
    }

    function logout() {
        signOut(auth);
        navigate("/");
        resetState();

    }

    function settingsPage() {
        navigate(`/settings`);
    }


    return (
        <div className="tb-item top-bar">
            <h className="logo "> WacFlix </h>
            <div className="buttons">
                {!user ? (
                    <>
                        <button onClick={registerPage}>Sign Up</button>
                        <button onClick={loginPage}>Sign In</button>
                    </>
                ) : (
                    <>
                        <button onClick={logout}>Sign Out</button>
                        <button onClick={settingsPage}>Settings</button>

                    </>
                )}
            </div>
        </div>
    )
}

export default Header;