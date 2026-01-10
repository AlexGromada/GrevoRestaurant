import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return [];

        const res = await fetch(
            "https://grevo-server.onrender.com/auth/cart",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();
        return data.products || [];
    }
);

export const syncCart = createAsyncThunk(
    "cart/syncCart",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const cartItems = state.cart.items;

        const token = localStorage.getItem("token");
        if (!token) return;

        await fetch(
            "https://grevo-server.onrender.com/auth/cart",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ products: cartItems }),
            }
        );
    }
);

export const checkout = createAsyncThunk(
    "cart/checkout",
    async (orderPayload, { dispatch, rejectWithValue }) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("https://grevo-server.onrender.com/auth/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(orderPayload),
            });

            if (!res.ok) throw new Error("Failed to create order");

            dispatch(clearCart());
            dispatch(syncCart());

            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: false,
        syncing: false
    },
    reducers: {
        addToCart(state, action) {
            const item = state.items.find(i => i.id === action.payload.id);

            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        increaseQuantity(state, action) {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity(state, action) {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        clearCart(state) {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchCart.rejected, (state) => {
                state.items = [];
                state.loading = false;
            })

            .addCase(syncCart.pending, (state) => {
                state.syncing = true;
            })
            .addCase(syncCart.fulfilled, (state) => {
                state.syncing = false;
            })
            .addCase(syncCart.rejected, (state) => {
                state.syncing = false;
            });
    },
});

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;