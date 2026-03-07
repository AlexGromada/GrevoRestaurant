import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginForm({ switchFunction, isVisible }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onSubmit",
    });

    const onSubmit = async (data) => {
        try {
            await dispatch(
                login({
                    email: data.email,
                    password: data.password,
                })
            ).unwrap();

            navigate("/profile");
        } catch (err) {
            setError("root", {
                message: err || "Email or password is incorrect",
            });
        }
    };

    const firstError = errors.email || errors.password || errors.root;

    return (
        <form
            className="authentication-form"
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: isVisible ? "flex" : "none" }}
        >
            <h3 className="authentication-form__title">Sign In</h3>

            <label className="authentication-form__label">
                <h4 className="authentication-form__label-title">Email</h4>
                <input
                    className="authentication-form__input"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Please enter your email",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    })}
                />
            </label>

            <label className="authentication-form__label">
                <h4 className="authentication-form__label-title">Password</h4>
                <input
                    className="authentication-form__input"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: "Please enter your password",
                    })}
                />
            </label>

            {firstError && (
                <p className="authentication-form__error">
                    {firstError.message}
                </p>
            )}

            <p className="authentication-form__note">
                Don't have an account?{" "}
                <span onClick={() => switchFunction("register")}>
                    Create one!
                </span>
            </p>

            <button
                type="submit"
                className="authentication-form__submit"
                disabled={isSubmitting}
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;