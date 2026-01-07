import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const res = await fetch(
            "https://grevo-server.onrender.com/auth/check",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();

        if (!data.loggedIn) {
            localStorage.removeItem("token");
            return null;
        }

        return data.user;
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        const res = await fetch(
            "https://grevo-server.onrender.com/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("token", data.token);
        return data.user;
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password }, thunkAPI) => {
        const res = await fetch(
            "https://grevo-server.onrender.com/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            }
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
            throw new Error(data.message || "Registration failed");
        }

        const loginRes = await fetch(
            "https://grevo-server.onrender.com/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            }
        );

        const loginData = await loginRes.json();

        if (!loginRes.ok) {
            throw new Error("Login after registration failed");
        }

        localStorage.setItem("token", loginData.token);
        return loginData.user;
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.loading = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
