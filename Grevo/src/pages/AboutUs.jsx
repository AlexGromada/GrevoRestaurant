import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/pages/aboutUs.scss";

function AboutUs() {
    return (
        <>
            <Header />

            <main className="container about-us-main">
                <div className="content">
                    <div className="about-hero">
                        <h1 className="about-hero__title">Our Cozy Story</h1>
                    </div>

                    <div className="about-content about-grid">
                        <div className="about-image-wrapper">
                            <img
                                src="/additional_images/AboutUs_picture.jpg"
                                alt="Grevo restaurant interior"
                                className="about-image"
                            />
                        </div>

                        <div className="about-story">
                            <p className="about-story__tagline">At Grevo, we believe the best moments happen around the table</p>

                            <p className="about-story__text">
                                Located in the heart of Odesa, Grevo is more than just a place to eat; it's a small, intimate 
                                refuge dedicated to reclaimed warmth and local flavor. Born from a simple desire to blend 
                                traditional Ukrainian hospitality with modern comfort.
                            </p>

                            <p className="about-story__text">
                                Every piece of wood on our walls tells a story, selected to create the cozy, ambient refuge 
                                you see today. We are passionate about artisan ingredients sourced directly from local 
                                producers, ensuring every dish reflects the unique character of our community. When we 
                                say "cozy," we mean a place where time slows down, conversations flow, and you are welcomed home.
                            </p>
                        </div>
                    </div>

                    <div className="about-invitation">
                        <h4 className="about-invitation__text">Good food, honest wine, and an open door.</h4>
                        <p className="about-invitation__brand">come to Grevo today</p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default AboutUs;