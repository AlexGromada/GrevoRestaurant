import { useState, useContext } from "react";
import { UserDataContext } from "../context/UserDataContext.jsx";
import { useNavigate } from "react-router-dom";

function LoginForm({ switchFunction, isVisible}) {
    const { setUser } = useContext(UserDataContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("https://grevo-server.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!data.loggedIn) {
                setError("Email or password is incorrect");
                return;
            }

            localStorage.setItem("token", data.token);
            setUser(data.user);
            navigate("/profile");
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <form className="authentication-form" onSubmit={handleSubmit} style={{ display: isVisible ? "flex" : "none" }}>
            <h3 className="authentication-form__title">Sign In</h3>

            <label className="authentication-form__label">
                <h4 className="authentication-form__label-title">Email</h4>
                <input
                    className="authentication-form__input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>

            <label className="authentication-form__label">
                <h4 className="authentication-form__label-title">Password</h4>
                <input
                    className="authentication-form__input"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>

            {error && <p className="authentication-form__error">{error}</p>}

            <p className="authentication-form__note">
                Don't have an account? <span onClick={() => switchFunction("register")}>Create one!</span>
            </p>

            <button type="submit" className="authentication-form__submit">
                Login
            </button>
        </form>
    );
}

export default LoginForm;