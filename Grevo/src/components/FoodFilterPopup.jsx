import ArrowUp from "../assets/arrowUp.svg";
import FoodFilter from "./FoodFilter"

import '../styles/components/foodFilterPopup.scss'

function FoodFilterPopup({ toggleFilter, category, setCategory }) {

    return (
        <div className="popup-container__background" onClick={() => toggleFilter(false)}>
            <div className="popup content" onClick={(e) => e.stopPropagation()}>
                <FoodFilter toggleFilter={toggleFilter} category={category} setCategory={setCategory} image={ArrowUp} />
            </div>
        </div>
    )
}

export default FoodFilterPopup