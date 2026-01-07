import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import ProfilePicture from "../assets/profilePicture.svg";
import "../styles/pages/userProfile.scss";

import { logout } from "../store/slices/authSlice";
import { clearCart } from "../store/slices/cartSlice";
import { fetchOrders, clearOrders } from "../store/slices/ordersSlice";

function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user);
    const orders = useSelector(state => state.orders.list);
    const loading = useSelector(
        state => state.auth.loading || state.orders.loading
    );

    useEffect(() => {
        if (user && orders.length === 0) {
            dispatch(fetchOrders());
        }
    }, [dispatch, user, orders.length]);

    const email = user?.email || "No email";

    const logOut = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearOrders());
        navigate("/");
    };

    return (
        <div className="profile-page">
            <Header />
            <main className="profile-container container">
                <div className="profile-content content">
                    <section className="profile-info">
                        <div className="profile-info__details">
                            <img
                                className="profile-info__image"
                                src={ProfilePicture}
                                alt="Profile"
                            />
                            <span className="profile-info__email">{email}</span>
                        </div>
                        <button
                            className="profile-info__logout"
                            onClick={logOut}
                        >
                            Log Out
                        </button>
                    </section>

                    <section className="order-history">
                        <h4 className="order-history__title">Your Orders</h4>

                        {loading ? (
                            <p className="loading-text">Loading your orders...</p>
                        ) : orders.length === 0 ? (
                            <p className="order-history__empty">
                                You haven't ordered anything yet.
                            </p>
                        ) : (
                            <ul className="order-history__list">
                                {orders.map((order, index) => (
                                    <li className="order-history__item" key={index}>
                                        <ul>
                                            {order.dishes?.map((dish, i) => (
                                                <li key={i}>{dish}</li>
                                            ))}
                                        </ul>
                                        <p>Total: ₴{order.total}</p>
                                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default UserProfile;