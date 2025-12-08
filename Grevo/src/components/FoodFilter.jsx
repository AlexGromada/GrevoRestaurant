const filter_items = [
    { key: "none", label: "Full Menu" },
    { key: "meal", label: "Meals" },
    { key: "salad", label: "Salads" },
    { key: "pizza", label: "Pizzas" },
    { key: "dessert", label: "Desserts" },
    { key: "drink", label: "Drinks" },
];

function FoodFilter({ toggleFilter, category, setCategory, image }) {
    return (
        <ul className="food-menu__list">
            {filter_items.map((item) => (
                <li
                    key={item.key}
                    className={`food-menu__list-item ${category === item.key ? "active" : ""}`}
                    onClick={() => {
                        setCategory(item.key);
                        toggleFilter(prev => prev ? !prev : prev)
                    }}
                >
                    {item.label}
                </li>
            ))}

            <img onClick={() => toggleFilter(prev => !prev)} src={image} alt="close/open switch icon" />
        </ul>
    );
}

export default FoodFilter;