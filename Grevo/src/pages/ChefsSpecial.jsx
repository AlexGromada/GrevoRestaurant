import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/pages/chefsSpecial.scss";

function ChefsSpecial() {
    return (
        <>
            <Header />

            <main className="container chefs-special-main">
                <div className="content">
                    <div className="special-header">
                        <h1 className="special-header__title">The Chef's Special</h1>
                        <p className="special-header__subtitle">A seasonal tribute to our local harvest.</p>
                    </div>

                    <img 
                        src="/additional_images/special_dish.jpg" 
                        alt="Grevo Signature Dish" 
                        className="special-hero-img" 
                    />

                    <div className="special-details">
                        <h2 className="special-details__name">Wood-Fired Black Sea Catch</h2>
                        
                        <p className="special-details__story">
                            Our menu changes with the seasons, but this dish represents everything Grevo stands for. 
                            We source the freshest catch straight from local Odesa fishermen every morning. 
                            Prepared simply over an open wood fire, it is designed to let the natural, unmasked flavors of the region take center stage.
                        </p>

                        <div className="special-ingredients">
                            <h3>On the Plate:</h3>
                            <ul>
                                <li>Wild-caught Black Sea seasonal fish</li>
                                <li>Fire-roasted heritage root vegetables</li>
                                <li>A reduction of hand-foraged wild herbs</li>
                                <li>A splash of local, honest white wine</li>
                            </ul>
                        </div>

                        <Link to="/reservation" className="special-cta">
                            Book a Table to Try It
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default ChefsSpecial;