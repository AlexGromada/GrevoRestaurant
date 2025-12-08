import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

import { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";
import foodData from "../data/food.json"

import "../styles/pages/cart.scss"
import ArrowRight from "../assets/arrowRight.svg"
import ArrowLeft from "../assets/arrowLeft.svg"
import Trash from "../assets/trash.svg"
import ImagePlaceholder from "../assets/foodPlaceholder.svg"

function Cart() {
    const { cart, setCart, user } = useContext(UserDataContext);

    const token = localStorage.getItem("token");

    const updateCartOnServer = async (updated) => {
        if (!user || !token) return;

        await fetch("http://localhost:3000/auth/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ products: updated }),
        });
    };

    const increase = (id) => {
        const updated = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updated);
        updateCartOnServer(updated);
    };

    const decrease = (id) => {
        const updated = cart.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
        );
        setCart(updated);
        updateCartOnServer(updated);
    };

    const removeItem = (id) => {
        const updated = cart.filter(item => item.id !== id);
        setCart(updated);
        updateCartOnServer(updated);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const pay = async () => {
        if (cart.length === 0) return;

        const newOrder = {
            dishes: cart.map(item => `${item.name} x ${item.quantity}`),
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };

        await fetch("http://localhost:3000/auth/orders", {
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

        setCart([]);
        updateCartOnServer([]);
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
                                            src={`/food${dish.image}`}
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

                                            <p className="price-and-counter__price">{item.price * item.quantity}₴</p>
                                        </div>

                                        <img
                                            src={Trash}
                                            className="remove-item"
                                            onClick={() => removeItem(item.id)}
                                        />
                                    </div>

                                </li>
                            )
                        })}
                    </ul>

                    <aside className="total-and-payment">
                        <p className="total-and-payment__total">Total: ₴{total}</p>
                        <button onClick={pay} className="total-and-payment__payment">Pay</button>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Cart;