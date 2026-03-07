import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../store/slices/authSlice";

function RegisterForm({ switchFunction, isVisible }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onSubmit",
    });

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            await dispatch(
                registerUser({
                    email: data.email,
                    password: data.password,
                })
            ).unwrap();

            navigate("/profile");
        } catch (err) {
            console.error("Registration error:", err);
            setError("root", {
                message: err.message || "An error occurred. Try again.",
            });
        }
    };

    const firstError =
        errors.email ||
        errors.password ||
        errors.confirmPassword ||
        errors.root;

    return (
        <form
            className="authentication-form"
            style={{ display: isVisible ? "flex" : "none" }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h3 className="authentication-form__title">Create Account</h3>

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
                    placeholder="Create a password"
                    {...register("password", {
                        required: "Please create a password",
                    })}
                />
            </label>

            <label className="authentication-form__label">
                <h4 className="authentication-form__label-title">
                    Confirm Password
                </h4>
                <input
                    className="authentication-form__input"
                    type="password"
                    placeholder="Repeat your password"
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === password || "Passwords do not match",
                    })}
                />
            </label>

            {firstError && (
                <p
                    className="authentication-form__note"
                    style={{ color: "red" }}
                >
                    {firstError.message}
                </p>
            )}

            <p className="authentication-form__note">
                Already have an account?{" "}
                <span onClick={() => switchFunction("login")}>
                    Sign in!
                </span>
            </p>

            <button
                type="submit"
                className="authentication-form__submit"
                disabled={isSubmitting}
            >
                Register
            </button>
        </form>
    );
}

export default RegisterForm;