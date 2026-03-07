import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import NavigationMenuPopup from "./NavigationMenuPopup"
import NavigationBar from "./NavigationBar"
import Logo from "../assets/logo.svg"
import NavigationMenuIcon from "../assets/menu.svg"
import Cart from "../assets/cart.svg"
import CartActive from "../assets/cartActive.svg"
import ProfilePicture from "../assets/profilePicture.svg"
import ProfilePictureActive from "../assets/profilePictureActive.svg"

import '../styles/components/header.scss'
import { useEffect, useState } from "react"
import { checkAuth } from "../store/slices/authSlice"

function Header() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [MenuState, setMenuState] = useState(false)

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setMenuState(false);
            }
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);



    return (
        <header className="container header">
            <div className="content header-content" style={{ display: `${MenuState ? 'none' : 'flex'}` }}>
                <div className="header__nav">
                    <NavLink to="/">
                        <img src={Logo} alt="logo" />
                    </NavLink>
                    <NavigationBar />
                </div>
                <div className="user-data">
                    <NavLink
                        to={user ? "/cart" : "/authentication"}>
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
                <img className="navigation-menu-icon" onClick={() => setMenuState(true)} src={NavigationMenuIcon} alt="navigation menu icon" />
            </div>
            <div className="content header-popup" style={{ display: `${!MenuState ? 'none' : 'flex'}` }}>
                <NavigationMenuPopup user={user} switchFunction={setMenuState} />
            </div>
        </header>
    )
}

export default Header