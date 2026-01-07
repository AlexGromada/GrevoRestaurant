import Header from "../components/Header";
import MenuItem from "../components/MenuItem.jsx";
import Footer from "../components/Footer";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import foodData from "../data/food.json";
import PlaceholderImage from "../assets/foodPlaceholder.svg";
import "../styles/pages/menuItemPage.scss";
import { addToCart, syncCart } from "../store/slices/cartSlice";

function MenuItemPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const cart = useSelector(state => state.cart.items);

    const item = foodData.find(food => food.id === Number(id));
    if (!item) return <h1>Not found</h1>;

const addItemToCart = () => {
        if (!user) {
            navigate("/authentication");
            return;
        }

        dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        }));
        
        dispatch(syncCart()); 
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
                        onError={(e) => { e.currentTarget.src = PlaceholderImage; }}
                    />
                    <div className="main-info__details">
                        <h1 className="main-info__name">{item.name}</h1>
                        <p className="main-info__description">{item.description}</p>
                        <button className="main-info__add-to-cart" onClick={addItemToCart}>
                            <h4>Add to cart</h4>
                            <h4>₴{item.price}</h4>
                        </button>
                    </div>
                </div>
            </main>
            <section className="ingridients-container container">
                <div className="ingridients content">
                    <h2 className="ingridients__title">Ingredients</h2>
                    <ul className="ingridients__list">
                        {item.ingredients.map((ingredient, i) => (
                            <li key={i} className="ingridients__list-item">
                                <h4>{ingredient[0]} — {ingredient[1]}</h4>
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
                            );
                        })}
                    </ul>
                </div>
            </aside>
            <Footer />
        </>
    );
}

export default MenuItemPage;