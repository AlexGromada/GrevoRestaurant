import { NavLink } from "react-router-dom"

import NavigationBar from "./NavigationBar"
import Cart from "../assets/cart.svg"
import CartActive from "../assets/cartActive.svg"
import ProfilePicture from "../assets/profilePicture.svg"
import ProfilePictureActive from "../assets/profilePictureActive.svg"
import Close from "../assets/close.svg"

import '../styles/components/navigationMenuPopup.scss'

function NavigationMenuPopup({ user, switchFunction }) {

    return (
        <>
            <div className="navigation-menu-container" onClick={() => switchFunction(false)}>
                <div className="menu content" onClick={(e) => e.stopPropagation()}>

                    <div className="menu__icons">

                        <div className="cart-and-profile">
                            <NavLink
                                to="/cart">
                                {({ isActive }) => (
                                    <img src={isActive ? CartActive : Cart} alt="Cart" />
                                )}
                            </NavLink>
                            <NavLink to={user ? "/profile" : "/authentication"}>
                                {({ isActive }) => (
                                    <img src={isActive ? ProfilePictureActive : ProfilePicture} alt="Profile" />
                                )}
                            </NavLink>
                        </div>

                        <img onClick={() => switchFunction(false)} src={Close} alt="close" />
                    </div>


                    <div className="menu__list">
                        <NavigationBar />
                    </div>

                </div>
            </div>
        </>
    )
}

export default NavigationMenuPopup