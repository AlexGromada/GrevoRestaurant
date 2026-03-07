import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/pages/events.scss";

function Events() {
    return (
        <>
            <Header />

            <main className="container events-main">
                <div className="content">
                    <div className="events-header">
                        <h1 className="events-header__title">Gather Around</h1>
                        <p className="events-header__subtitle">Special nights and seasonal celebrations at Grevo.</p>
                    </div>

                    <img 
                        src="/additional_images/events_hero.jpg" 
                        alt="Evening at Grevo" 
                        className="events-hero-img" 
                    />

                    <div className="events-intro">
                        <p>
                            Beyond our nightly service, we occasionally host intimate events centered around the things we love most: 
                            good wine, seasonal harvests, and our local community. Space for these evenings is always limited to keep the atmosphere exactly how it should be.
                        </p>
                    </div>

                    <div className="events-list">
                        <div className="event-card">
                            <div className="event-card__date-block">
                                <span className="month">MAR</span>
                                <span className="day">12</span>
                            </div>
                            <div className="event-card__info">
                                <h3 className="event-card__title">Spring Harvest Dinner</h3>
                                <p className="event-card__desc">
                                    Join us as we welcome the first produce of the spring. A five-course tasting menu featuring 
                                    early greens, wild asparagus, and a special wood-fired lamb prepared by the chef.
                                </p>
                                <Link to="/reservation" className="event-card__cta">Reserve a Seat</Link>
                            </div>
                        </div>

                        <div className="event-card">
                            <div className="event-card__date-block">
                                <span className="month">MAR</span>
                                <span className="day">26</span>
                            </div>
                            <div className="event-card__info">
                                <h3 className="event-card__title">Odesa Wine Pairing</h3>
                                <p className="event-card__desc">
                                    An evening dedicated to honest, local winemaking. We will be pouring five distinct natural wines 
                                    from the region, each paired with small, fire-roasted bites.
                                </p>
                                <Link to="/reservation" className="event-card__cta">Reserve a Seat</Link>
                            </div>
                        </div>

                        <div className="event-card">
                            <div className="event-card__date-block">
                                <span className="month">APR</span>
                                <span className="day">4</span>
                            </div>
                            <div className="event-card__info">
                                <h3 className="event-card__title">Acoustic & Ember</h3>
                                <p className="event-card__desc">
                                    Our favorite local guitarist joins us for a quiet, unplugged set in the corner. 
                                    No tickets required, just book a regular table, order some wine, and enjoy the atmosphere.
                                </p>
                                <Link to="/reservation" className="event-card__cta">Book a Table</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Events;