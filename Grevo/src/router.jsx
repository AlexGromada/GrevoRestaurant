import { createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import FoodMenu from "./pages/FoodMenu.jsx";
import MenuItemPage from "./pages/MenuItemPage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Reservation from "./pages/Reservation.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AuthenticationPage from "./pages/AuthenticationPage.jsx";
import Cart from "./pages/Cart.jsx";

export default createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/menu",
        element: <FoodMenu />,
    },
    {
        path: "/menu/menu-item/:id",
        element: <MenuItemPage />,
    },
    {
        path: "/about-us",
        element: <AboutUs />,
    },
    {
        path: "/reservation",
        element: <Reservation />,
    },
    {
        path: "/contact-us",
        element: <ContactUs />,
    },
    {
        path: "/profile",
        element: <UserProfile />,
    },
    {
        path: "/authentication",
        element: <AuthenticationPage/>,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
]);