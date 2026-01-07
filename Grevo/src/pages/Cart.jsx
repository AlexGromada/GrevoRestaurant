import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import foodData from "../data/food.json";

import "../styles/pages/cart.scss";
import ArrowRight from "../assets/arrowRight.svg";
import ArrowLeft from "../assets/arrowLeft.svg";
import Trash from "../assets/trash.svg";
import ImagePlaceholder from "../assets/foodPlaceholder.svg";
import { removeFromCart, clearCart, syncCart, fetchCart, increaseQuantity, decreaseQuantity } from "../store/slices/cartSlice.js";

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const loading = useSelector(state => state.cart.loading);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            dispatch(fetchCart());
        }
    }, [dispatch, token]);

    if (loading) {
        return (
            <div className="cart-page">
                <Header />
                <main className="cart-container container">
                    <p className="cart-page__loading-text">Loading cart...</p>
                </main>
                <Footer />
            </div>
        );
    }


    const increase = (id) => {
        dispatch(increaseQuantity(id));
        dispatch(syncCart());
    };

    const decrease = (id) => {
        dispatch(decreaseQuantity(id));
        dispatch(syncCart());
    };

    const removeItem = (id) => {
        dispatch(removeFromCart(id));
        dispatch(syncCart());
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const pay = async () => {
        if (cart.length === 0 || !token) return;

        const newOrder = {
            dishes: cart.map(item => `${item.name} x ${item.quantity}`),
            total,
        };

        try {
            const res = await fetch("https://grevo-server.onrender.com/auth/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    products: newOrder.dishes,
                    totalPrice: newOrder.total,
                }),
            });

            if (!res.ok) throw new Error("Failed to create order");

            dispatch(clearCart());
            dispatch(syncCart(cart.items));
        } catch (err) {
            console.error("Failed to create order:", err);
        }
    };

    return (
        <div className="cart-page">
            <Header />

            <main className="cart-container container">
                <div className="cart-content content">
                    <ul className="cart-list">
                        {cart.length === 0 && (
                            <h2 className="empty-cart-message">Your cart is empty</h2>
                        )}

                        {cart.map(item => {
                            const dish = foodData.find(d => d.id === item.id);

                            return (
                                <li className="cart-list__item" key={item.id}>
                                    <div className="dish-data">
                                        <img
                                            className="dish-data__image"
                                            src={`/food${dish?.image || ""}`}
                                            alt={item.name}
                                            onError={(e) => (e.target.src = ImagePlaceholder)}
                                        />
                                        <p className="dish-data__name">{item.name}</p>
                                    </div>

                                    <div className="item-operations">
                                        <div className="price-and-counter">
                                            <div className="price-and-counter__counter">
                                                <img
                                                    src={ArrowLeft}
                                                    className="minus"
                                                    onClick={() => decrease(item.id)}
                                                />
                                                <input
                                                    className="ammount"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <img
                                                    src={ArrowRight}
                                                    className="plus"
                                                    onClick={() => increase(item.id)}
                                                />
                                            </div>

                                            <p className="price-and-counter__price">
                                                {item.price * item.quantity}₴
                                            </p>
                                        </div>

                                        <img
                                            src={Trash}
                                            className="remove-item"
                                            onClick={() => removeItem(item.id)}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    {cart.length > 0 && (
                        <aside className="total-and-payment">
                            <p className="total-and-payment__total">Total: ₴{total}</p>
                            <button
                                onClick={pay}
                                className="total-and-payment__payment"
                            >
                                Pay
                            </button>
                        </aside>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Cart;