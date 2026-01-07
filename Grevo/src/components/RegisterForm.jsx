import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../store/slices/authSlice";

function RegisterForm({ switchFunction, isVisible }) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await dispatch(register({ email, password })).unwrap();
            navigate("/profile");
        } catch (err) {
            setError(err.message || "An error occurred. Try again.");
        }
    };


    return (
        <form
            className="authentication-form"
            style={{ display: isVisible ? "flex" : "none" }}
            onSubmit={handleSubmit}
        >
            <h3 className="authentication-form__title">Create Account</h3>

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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>

            <label className="authentication-form__label">
                <h4 className="authentication-form__label-title">Confirm Password</h4>
                <input
                    className="authentication-form__input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>

            {error && <p className="authentication-form__note" style={{ color: "red" }}>{error}</p>}

            <p className="authentication-form__note">
                Already have an account?{" "}
                <span onClick={() => switchFunction('login')}>Sign in!</span>
            </p>

            <button type="submit" className="authentication-form__submit">
                Register
            </button>
        </form>
    );
}

export default RegisterForm;