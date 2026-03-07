import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/pages/contactUs.scss";

function ContactUs() {
    return (
        <>
            <Header />

            <main className="container contact-us-main">
                <div className="content">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h3 className="contact-info__title">Drop us a line</h3>
                            <p className="contact-info__text">
                                Have a question about our menu, need to arrange a private event, or want to discuss dietary requirements? Send us a message and our team will get back to you shortly.
                            </p>

                            <div className="contact-info__details">
                                <p><strong>Location:</strong> Odesa, Ukraine</p>
                                <p><strong>Hours:</strong> Mon-Sat, 9:00-20:00</p>
                            </div>
                        </div>

                        <div className="contact-form-wrapper">
                            <form
                                className="contact-form"
                                action="https://formsubmit.co/23f6ac31983f935fe188e96d4a1b578c"
                                method="POST"
                            >
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_next" value={window.location.href} />

                                <div className="contact-form__group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" placeholder="Your name" required />
                                </div>

                                <div className="contact-form__group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" placeholder="Your email address" required />
                                </div>

                                <div className="contact-form__group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows="5" placeholder="How can we help you?" required></textarea>
                                </div>

                                <button type="submit" className="contact-form__submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default ContactUs;