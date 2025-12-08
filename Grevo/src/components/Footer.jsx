import { Link } from "react-router-dom"

import YouTube from "../assets/youtubeLogo.svg"
import Instagram from "../assets/instagramLogo.svg"
import Facebook from "../assets/facebookLogo.svg"
import TikTok from "../assets/tiktokLogo.svg"

import "../styles/components/footer.scss"

function Footer() {

    return (
        <footer className="container footer">
            <div className="content">

                <div className="links">
                    <ul className="links__contact-info">
                        <li>
                            <a href="https://www.google.com/maps/search/?api=1&query=Ovidiopol,+lane+Shkilnyi+31" target="_blank" rel="noopener noreferrer">
                                Ovidiopol, lane Shkilnyi 31
                            </a>
                        </li>
                        <li>Mon-Fri: 8am-12am</li>
                        <li>Sat-Sun: 8am-10pm</li>
                        <li>
                            <a href="tel:+380681471202" aria-label="Call +380 68 147 1202" rel="nofollow">
                                +380 (68) 147 1202
                            </a>
                        </li>
                        <li>
                            <a href="mailto:grevo.restaurant@gmail.com" aria-label="Email grevo.restaurant@gmail.com" rel="nofollow">
                                grevo.restaurant@gmail.com
                            </a>
                        </li>
                    </ul>

                    <div className="links__info-and-media">
                        <ul className="links__info">
                            <li>
                                <Link to="/specials">
                                    Chef’s Specials
                                </Link>
                            </li>
                            <li>
                                <Link to="/gift-cards">
                                    Gift Cards
                                </Link>
                            </li>
                            <li>
                                <Link to="/events">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq">
                                    FAQ
                                </Link>
                            </li>
                        </ul>

                        <ul className="links__media">
                            <li>
                                <a href="https://www.youtube.com/channel/UCviBAYbplAMZ6RIGjxncS7Q" target="_blank" rel="noopener noreferrer">
                                    <img src={YouTube} alt="YouTube" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/grevo.restaurant/" target="_blank" rel="noopener noreferrer">
                                    <img src={Instagram} alt="Instagram" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=61584357611830" target="_blank" rel="noopener noreferrer">
                                    <img src={Facebook} alt="Facebook" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@grevorestaurant" target="_blank" rel="noopener noreferrer">
                                    <img src={TikTok} alt="TikTok" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <div className="copyrights">
                    <p>© 2025 Grevo</p>
                    <p>All rights reserved</p>
                </div>

            </div>
        </footer>
    )
}

export default Footer