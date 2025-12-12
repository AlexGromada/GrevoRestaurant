import { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext(null);

function UserDataProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartLoaded, setCartLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const checkRes = await fetch("https://grevo-server.onrender.com/auth/check", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const checkData = await checkRes.json();

                if (!checkData.loggedIn) {
                    setUser(null);
                    setCart([]);
                    setOrders([]);
                    setCartLoaded(true);
                    return;
                }

                setUser(checkData.user);

                const ordersRes = await fetch("https://grevo-server.onrender.com/auth/orders", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const ordersData = await ordersRes.json();
                setOrders(ordersData.orders);

                const cartRes = await fetch("https://grevo-server.onrender.com/auth/cart", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const cartData = await cartRes.json();
                setCart(cartData.products || []);
                setCartLoaded(true);

            } catch (err) {
                console.error("Error fetching user data:", err);
                setUser(null);
                setCart([]);
                setOrders([]);
                setCartLoaded(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!user || !cartLoaded) return;

        const updateCartOnServer = async () => {
            try {
                await fetch("https://grevo-server.onrender.com/auth/cart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ products: cart }),
                });
            } catch (err) {
                console.error("Failed to update cart on server:", err);
            }
        };

        updateCartOnServer();
    }, [cart, user, cartLoaded]);

    return (
        <UserDataContext.Provider value={{ user, setUser, cart, setCart, orders, setOrders, loading }}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserDataProvider;