import { Link } from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import MailPicture from "../assets/mail.svg"
import CalendarPicture from "../assets/calendar.svg"

import "../styles/pages/homepage.scss"

function Homepage() {

    return (
        <>
            <Header />

            <main className="container homepage-main">
                <div className="content">
                    <div className="introduction">
                        <h1 className="introduction__title">
                            Good Food. Good Mood.
                        </h1>
                        <p className="introduction__paragraph">
                            We focus on simple, clean meals made from fresh ingredients
                            and seasonal produce. Our menu offers balanced options for
                            any time of day, prepared with care and without shortcuts.
                            It’s honest food that feels good to eat and easy to enjoy.
                        </p>
                        <Link className="introduction__reservation-link" to="/reservation">Book a Table</Link>

                    </div>
                </div>
            </main>


            <aside className="container homepage-aside">
                <div className="content">
                    <div className="feature-section">
                        <h2 className="feature-section__title">Purely Local</h2>
                        <p className="feature-section__text">
                            We source every ingredient from trusted local farms, ensuring
                            fresh, seasonal produce in every dish while supporting our
                            community and reducing environmental impact.
                        </p>
                    </div>
                </div>
            </aside>


            <section className="container homepage-section">
                <div className="content">
                    <h2 className="title">Ready to Book?</h2>
                    <div className="actions-group">
                        <Link to="/contact-us" className="actions-group__action">
                            <img src={MailPicture} />
                            <h3>Contact Us</h3>
                        </Link>
                        <Link to="/reservation" className="actions-group__action">
                            <img src={CalendarPicture} />
                            <h3>Make a Reservation</h3>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Homepage