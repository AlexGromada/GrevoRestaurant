import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/pages/faq.scss";

function Faq() {
    return (
        <>
            <Header />

            <main className="container faq-main">
                <div className="content">
                    <div className="faq-header">
                        <h1 className="faq-header__title">Common Questions</h1>
                        <p className="faq-header__subtitle">Everything you need to know before you visit.</p>
                    </div>

                    <div className="faq-list">
                        <div className="faq-item">
                            <h3 className="faq-item__question">Do I need a reservation?</h3>
                            <p className="faq-item__answer">
                                While we do keep a few tables for walk-ins, we highly recommend booking in advance,
                                especially on Friday and Saturday evenings, to ensure we have a spot for you.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-item__question">Do you offer takeout or delivery?</h3>
                            <p className="faq-item__answer">
                                To ensure our wood-fired dishes are enjoyed at their absolute best, we focus
                                primarily on the dine-in experience. However, we do offer a selection of items
                                for local pickup. Give us a call to see what's available today.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-item__question">Do you cater to dietary requirements?</h3>
                            <p className="faq-item__answer">
                                Absolutely. Most of our wood-fired dishes can be adjusted for gluten-free or dairy-free diets.
                                Please mention any allergies when booking your table.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-item__question">Where can I park?</h3>
                            <p className="faq-item__answer">
                                There is street parking available directly in front of the restaurant and a
                                public parking lot just two minutes away on the corner.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h3 className="faq-item__question">Are you pet friendly?</h3>
                            <p className="faq-item__answer">
                                We love our furry friends! Well-behaved dogs are welcome on our outdoor terrace during
                                the warmer months.
                            </p>
                        </div>
                    </div>

                    <div className="faq-footer">
                        <p>Still have questions?</p>
                        <Link to="/contact-us" className="faq-contact-link">Contact Us Directly</Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Faq;