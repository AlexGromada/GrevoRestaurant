import { NavLink } from "react-router-dom"

function NavigationBar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "accent" : "")}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/menu"
                        className={({ isActive }) => (isActive ? "accent" : "")}
                        end={false}>
                        Menu
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about-us"
                        className={({ isActive }) => (isActive ? "accent" : "")}>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/reservation"
                        className={({ isActive }) => (isActive ? "accent" : "")}>
                        Reservation
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar;