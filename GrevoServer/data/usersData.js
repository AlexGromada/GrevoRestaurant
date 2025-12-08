import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

export async function getUser(email) {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
}

export async function getUserById(userId) {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return res.rows[0];
}

export async function addUser(email, password, userName) {
    await pool.query(
        'INSERT INTO users (email, password, username) VALUES ($1, $2, $3)',
        [email, password, userName]
    );
}

export async function getCart(userId) {
    try {
        const res = await pool.query('SELECT items FROM cart WHERE user_id = $1', [userId]);
        const raw = res.rows[0]?.items;

        console.log("RAW DB CART:", raw);

        if (!raw) return [];

        return typeof raw === "string" ? JSON.parse(raw) : raw;

    } catch (err) {
        console.error("ERROR IN getCart:", err);
        throw err;
    }
}

export async function updateCart(userId, items) {
    const itemsJson = JSON.stringify(items);
    await pool.query(
        `INSERT INTO cart (user_id, items) VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET items = $2`,
        [userId, itemsJson]
    );
}

export async function getOrderHistory(userId) {
    const res = await pool.query('SELECT orders FROM order_history WHERE user_id = $1', [userId]);
    return res.rows[0]?.orders || [];
}

export async function addOrder(userId, order) {
    const currentOrdersRes = await pool.query(
        'SELECT orders FROM order_history WHERE user_id = $1',
        [userId]
    );

    let currentOrders = currentOrdersRes.rows[0]?.orders;

    if (!currentOrders) {
        currentOrders = [];
    }

    if (typeof currentOrders === "string") {
        currentOrders = JSON.parse(currentOrders);
    }

    const updatedOrders = [...currentOrders, order];

    await pool.query(
        `INSERT INTO order_history (user_id, orders) VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET orders = $2`,
        [userId, JSON.stringify(updatedOrders)]
    );
}
