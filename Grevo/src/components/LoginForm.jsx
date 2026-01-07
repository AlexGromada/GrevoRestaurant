import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function LoginForm({ switchFunction, isVisible }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await dispatch(login({ email, password })).unwrap();
            navigate("/profile");
        } catch (err) {
            setError(err.message || "Email or password is incorrect");
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