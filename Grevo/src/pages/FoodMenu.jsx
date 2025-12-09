import Header from "../components/Header.jsx"
import FoodFilter from "../components/FoodFilter.jsx"
import FoodFilterPopup from "../components/FoodFilterPopup.jsx"
import MenuItem from "../components/MenuItem.jsx"
import Footer from "../components/Footer.jsx"

import { Outlet } from "react-router";
import { useState, useEffect } from "react"

import "../styles/pages/foodMenu.scss"
import ArrowDown from "../assets/arrowDown.svg";
import JSON from "../data/food.json"

function FoodMenu() {
    const [category, setCategory] = useState('none')

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [category]);

    const filteredFood = JSON.filter(
        (item) => category === "none" || item.type === category
    );



    const [MenuFilterState, setMenuFilterState] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setMenuFilterState(prev => (prev ? false : prev));
            }
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            <Header />

            <main className="container food-menu-container">

                <Outlet />

                <div className={`food-menu content ${MenuFilterState ? "hidden" : ""}`}>
                    <FoodFilter toggleFilter={setMenuFilterState} category={category} setCategory={setCategory} image={ArrowDown} />

                    <ul className="food-menu__content">
                        {filteredFood.map(item => (
                            <li key={item.id}>
                                <MenuItem
                                    id={item.id}
                                    name={item.name}
                                    pathToImage={`/food${item.image}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`content popup-container ${!MenuFilterState ? "hidden" : ""}`}>
                    <FoodFilterPopup toggleFilter={setMenuFilterState} category={category} setCategory={setCategory} />
                </div>
            </main>

            <Footer />
        </>
    )
}

export default FoodMenu