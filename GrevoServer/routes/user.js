import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUser, getUserById, addUser, getCart, updateCart, getOrderHistory, addOrder, getReservationsByDate, addReservation } from '../data/usersData.js';

const router = express.Router();

// Auth middleware to protect routes
function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.id;
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
}

// Registration route
router.post('/register', async (req, res) => {
    const { email, password} = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        await addUser(email, hashed);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Registration failed" });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUser(email);
        if (!user) {
            return res.json({ loggedIn: false, message: "Email or password is incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ loggedIn: false, message: "Email or password is incorrect" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const { password: _, ...userData } = user;
        res.json({ loggedIn: true, token, user: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ loggedIn: false, message: "Login failed" });
    }
});

// Check if user is logged in
router.get('/check', authMiddleware, async (req, res) => {
    try {
        const user = await getUserById(req.userId);
        if (!user) return res.json({ loggedIn: false });
        const { password, ...userData } = user;
        res.json({ loggedIn: true, user: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ loggedIn: false });
    }
});

// Cart routes
router.get('/cart', authMiddleware, async (req, res) => {
    const products = await getCart(req.userId);
    res.json({ products });
});

router.post('/cart', authMiddleware, async (req, res) => {
    const { products } = req.body;
    await updateCart(req.userId, products);
    res.json({ success: true });
});

// Orders routes
router.get('/orders', authMiddleware, async (req, res) => {
    const orders = await getOrderHistory(req.userId);
    res.json({ orders });
});

router.post('/orders', authMiddleware, async (req, res) => {
    const { products, totalPrice } = req.body;

    const order = {
        dishes: products,
        total: totalPrice,
        date: new Date().toISOString(),
    };

    await addOrder(req.userId, order);

    res.json({ success: true });
});

// Reservations Routes
router.get('/reservations', authMiddleware, async (req, res) => {
    const { date } = req.query;
    
    if (!date) return res.status(400).json({ error: "Date is required" });

    try {
        const bookedTables = await getReservationsByDate(date);
        res.json({ bookedTables });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch reservations" });
    }
});

router.post('/reservations', authMiddleware, async (req, res) => {
    const { tableId, date, time, duration, guests } = req.body;

    if (!tableId || !date || !time || !duration || !guests) {
        return res.status(400).json({ error: "Missing reservation details" });
    }

    try {
        await addReservation(req.userId, tableId, date, time, duration, guests);
        res.json({ success: true, message: "Reservation confirmed!" });
    } catch (err) {
        if (err.message === "Table is already booked for this time.") {
            return res.status(409).json({ success: false, error: err.message });
        }
        res.status(500).json({ success: false, error: "Failed to create reservation" });
    }
});

export default router;