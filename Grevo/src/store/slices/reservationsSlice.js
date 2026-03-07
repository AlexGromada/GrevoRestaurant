import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const API_URL = "https://grevo-server.onrender.com/auth";
const API_URL = "http://localhost:3000/auth";

export const fetchBookedTables = createAsyncThunk(
    "reservations/fetchBookedTables",
    async (date, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/reservations?date=${date}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const data = await response.json();
            if (!response.ok) return rejectWithValue(data.error);
            
            return data.bookedTables;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const submitReservation = createAsyncThunk(
    "reservations/submitReservation",
    async (reservationData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/reservations`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(reservationData)
            });

            const data = await response.json();
            if (!response.ok) return rejectWithValue(data.error);

            return data; 
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const reservationSlice = createSlice({
    name: "reservations",
    initialState: {
        bookedTables: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearReservationState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookedTables.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookedTables.fulfilled, (state, action) => {
                state.loading = false;
                state.bookedTables = action.payload;
            })
            .addCase(fetchBookedTables.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            .addCase(submitReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(submitReservation.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(submitReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearReservationState } = reservationSlice.actions;
export default reservationSlice.reducer;