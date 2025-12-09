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
                setCart(cartData.products);

            } catch (err) {
                console.error("Error fetching user data:", err);
                setUser(null);
                setCart([]);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!user || !token) return;

        const updateCartOnServer = async () => {
            try {
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

        if (cart.length === 0) {
            const fetchOrders = async () => {
                try {
                    const ordersRes = await fetch("https://grevo-server.onrender.com/auth/orders", {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    const ordersData = await ordersRes.json();
                    setOrders(ordersData.orders);
                } catch (err) {
                    console.error("Failed to fetch orders:", err);
                }
            };
            fetchOrders();
        }

    }, [cart, user]);

    return (
        <UserDataContext.Provider value={{ user, setUser, cart, setCart, orders, setOrders, loading }}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserDataProvider;