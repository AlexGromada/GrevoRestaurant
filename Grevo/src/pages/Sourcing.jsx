import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/pages/sourcing.scss";

function Sourcing() {
    return (
        <>
            <Header />

            <main className="container sourcing-main">
                <div className="content">
                    <div className="sourcing-header">
                        <h1 className="sourcing-header__title">Local Sourcing</h1>
                        <p className="sourcing-header__subtitle">Great food starts with good people.</p>
                    </div>

                    <img
                        src="/additional_images/sourcing_page_hero.jpg"
                        alt="Fresh local produce and wood-fired ingredients"
                        className="sourcing-hero-img"
                    />

                    <div className="sourcing-intro">
                        <p>
                            At Grevo, our kitchen is dictated by the seasons and the hard work of our local partners across the Odesa region.
                            From heritage grains to pasture-raised meats and sun-ripened orchards, we don't believe in cutting corners.
                            We source only what can be grown, raised, or crafted right here at home.
                        </p>
                    </div>

                    <div className="partner-list">
                        <div className="partner-card">
                            <h3 className="partner-card__name">Southern Wilds</h3>
                            <span className="partner-card__role">Prime Meats & Raw Pressings</span>
                            <p className="partner-card__desc">
                                We prioritize products that haven't been over-processed. This collective of
                                regional producers supplies our kitchen with grass-fed beef and forest-foraged
                                ingredients, alongside the stone-fruit harvests used in our house-made
                                juices. It is a partnership built on the belief that fire and salt are the
                                only things needed to elevate great raw ingredients.
                            </p>
                        </div>

                        <div className="partner-card">
                            <h3 className="partner-card__name">Southern Pastures</h3>
                            <span className="partner-card__role">Grass-Fed Meats</span>
                            <p className="partner-card__desc">
                                Our poultry and meats come from small-scale farmers who prioritize traditional grazing.
                                This quality ensures that every cut we prepare over the open flame retains its natural,
                                rich flavor without the need for heavy seasoning.
                            </p>
                        </div>

                        <div className="partner-card">
                            <h3 className="partner-card__name">The Orchard Press</h3>
                            <span className="partner-card__role">Juices & Seasonal Fruits</span>
                            <p className="partner-card__desc">
                                We believe our drinks should be as honest as our food. Our juices and fruit bases are
                                pressed from seasonal Odesa orchards, capturing the sweetness of the region in every glass.
                            </p>
                        </div>

                        <div className="partner-card">
                            <h3 className="partner-card__name">Old Mill Bakery</h3>
                            <span className="partner-card__role">Sourdough & Ancient Grains</span>
                            <p className="partner-card__desc">
                                Our daily sourdough is naturally leavened and baked in wood-fired ovens using grains
                                milled locally. It’s the foundation of every meal at Grevo.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Sourcing;