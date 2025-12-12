import { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext(null);

function UserDataProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchInitialData = async () => {
            try {
                const checkRes = await fetch("https://grevo-server.onrender.com/auth/check", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const checkData = await checkRes.json();
                if (!checkData.loggedIn) {
                    setUser(null);
                    setCart([]);
                    setOrders([]);
                    return;
                }

                setUser(checkData.user);

                const cartRes = await fetch("https://grevo-server.onrender.com/auth/cart", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const cartData = await cartRes.json();
                setCart(cartData.products || []);

                const ordersRes = await fetch("https://grevo-server.onrender.com/auth/orders", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const ordersData = await ordersRes.json();
                setOrders(ordersData.orders || []);
            } catch (err) {
                console.error("Error fetching initial data:", err);
                setUser(null);
                setCart([]);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("https://grevo-server.onrender.com/auth/orders", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                setOrders(data.orders || []);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            }
        };

        fetchOrders();
    }, [user]);

    useEffect(() => {
        if (!user) return;

        const updateCartOnServer = async () => {
            try {
                const token = localStorage.getItem("token");
                await fetch("https://grevo-server.onrender.com/auth/cart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ products: cart }),
                });
            } catch (err) {
                console.error("Failed to update cart on server:", err);
            }
        };

        updateCartOnServer();
    }, [cart, user]);

    return (
        <UserDataContext.Provider value={{ user, setUser, cart, setCart, orders, setOrders, loading }}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserDataProvider;