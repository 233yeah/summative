import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";

function Header() {
    const navigate = useNavigate();
    const { login, setLogin, resetState } = useStoreContext();

    function loginPage() {
        navigate(`/login`);
    }

    function registerPage() {
        navigate(`/register`);
    }

    function logout() {
        setLogin(false);
        resetState();
        navigate(`/`);
    }

    function settingsPage() {
        navigate(`/settings`);
    }


    return (
        <div className="tb-item top-bar">
            <h className="logo "> WacFlix </h>
            <div className="buttons">
                {!login ? (
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