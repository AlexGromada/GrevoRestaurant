import Header from "../components/Header";
import MenuItem from "../components/MenuItem.jsx"
import Footer from "../components/Footer";

import { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import foodData from "../data/food.json";
import PlaceholderImage from "../assets/foodPlaceholder.svg"
import "../styles/pages/menuItemPage.scss"

function MenuItemPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const item = foodData.find(food => food.id === Number(id));
    if (!item) return <h1>Not found</h1>;

    const { user, cart, setCart } = useContext(UserDataContext);

    const addToCart = async () => {
        if (!user) {
            navigate("/authentication");
            return;
        }

        const existingIndex = cart.findIndex(i => i.id === item.id);
        let updatedCart;

        if (existingIndex >= 0) {
            updatedCart = [...cart];
            updatedCart[existingIndex].quantity += 1;
        } else {
            updatedCart = [...cart, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
        }

        setCart(updatedCart);

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await fetch("http://localhost:3000/auth/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ products: updatedCart }),
            });
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    };


    return (
        <>
            <Header />

            <main className="main-info-container container">
                <div className="main-info content">
                    <img
                        className="main-info__image"
                        src={`/food${item.image}`}
                        alt={item.name}
                        onError={(e) => {
                            e.currentTarget.src = PlaceholderImage;
                        }}
                    />
                    <div className="main-info__details">
                        <h1 className="main-info__name">{item.name}</h1>
                        <p className="main-info__description">{item.description}</p>
                        <button className="main-info__add-to-cart" onClick={addToCart}>
                            <h4>Add to cart</h4>
                            <h4>₴{item.price}</h4>
                        </button>
                    </div>
                </div>
            </main>

            <section className="ingridients-container container">
                <div className="ingridients content">
                    <h2 className="ingridients__title">Ingridients</h2>
                    <ul className="ingridients__list">
                        {item.ingredients.map((ingredient, i) => (
                            <li
                                key={i}
                                className="ingridients__list-item"
                            >
                                <h4>
                                    {ingredient[0]} — {ingredient[1]}
                                </h4>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <aside className="recommendations-container container">
                <div className="recommendations content">
                    <h2 className="recommendations__title">Best with</h2>
                    <ul className="recommendations__list">
                        {item.bestWith.map((bestId) => {
                            const dish = foodData.find(item => item.id === bestId);
                            if (!dish) return null;
                            return (
                                <li key={dish.id}>
                                    <MenuItem
                                        id={dish.id}
                                        name={dish.name}
                                        pathToImage={`/food${dish.image}`}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </aside>


            <Footer />
        </>
    )
}

export default MenuItemPage;
