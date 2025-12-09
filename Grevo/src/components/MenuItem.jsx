import { Link } from 'react-router';
import FoodPlaceholder from "../assets/foodPlaceholder.svg";
import "../styles/components/menuItem.scss"

function MenuItem({ id, name, pathToImage }) {
    return (
        <Link to={`/menu/menu-item/${id}`} className="menu-item">
            <div className="menu-item__image">
                <img
                    src={pathToImage}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FoodPlaceholder;
                    }}
                />
            </div>

            <div className="menu-item__name">
                {name}
            </div>
        </Link>
    )
}

export default MenuItem