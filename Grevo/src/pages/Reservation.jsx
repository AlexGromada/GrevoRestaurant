import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { fetchBookedTables, submitReservation, clearReservationState } from "../store/slices/reservationsSlice.js";

import "../styles/pages/reservation.scss";

const baseTables = [
    { id: 1, name: "T1", seats: 2 },
    { id: 2, name: "T2", seats: 2 },
    { id: 3, name: "T3", seats: 4 },
    { id: 4, name: "T4", seats: 4 },
    { id: 5, name: "T5", seats: 6 },
    { id: 6, name: "T6", seats: 2 },
    { id: 7, name: "T7", seats: 8 },
    { id: 8, name: "T8", seats: 4 },
    { id: 9, name: "T9", seats: 2 },
];

const timeToMins = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
};

const getTodayStr = () => new Date().toLocaleDateString('en-CA');

function Reservation() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const { bookedTables, loading, error, successMessage } = useSelector((state) => state.reservations);

    const [date, setDate] = useState(getTodayStr());
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState(60);
    const [guests, setGuests] = useState(2);
    const [selectedTable, setSelectedTable] = useState(null);

    const availableDates = useMemo(() => {
        const dates = [];
        for (let i = 0; i <= 30; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            const value = d.toLocaleDateString('en-CA');
            const label = i === 0 
                ? `Today (${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`
                : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            dates.push({ value, label });
        }
        return dates;
    }, []);

    const availableTimes = useMemo(() => {
        if (!date) return [];
        const times = [];
        const isToday = date === getTodayStr();
        const now = new Date();
        const currentMins = now.getHours() * 60 + now.getMinutes();
        const closingTimeMins = 24 * 60;

        for (let h = 8; h <= 23; h++) {
            for (let m of [0, 30]) {
                const slotMins = h * 60 + m;
                if (isToday && slotMins <= currentMins + 30) continue;
                if (slotMins + duration > closingTimeMins) continue;

                const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                times.push(timeStr);
            }
        }
        return times;
    }, [date, duration]);

    useEffect(() => {
        if (availableTimes.length > 0 && !availableTimes.includes(time)) {
            setTime(availableTimes[0]);
        }
    }, [availableTimes, time]);

    useEffect(() => {
        if (date) {
            dispatch(fetchBookedTables(date));
            setSelectedTable(null);
        }
    }, [date, dispatch]);

    useEffect(() => {
        return () => dispatch(clearReservationState());
    }, [dispatch]);

    if (!token) {
        return (
            <>
                <Header />
                <main className="container reservation-main">
                    <div className="content">
                        <div className="auth-prompt">
                            <h2 className="auth-prompt__title">Want to secure your spot?</h2>
                            <p className="auth-prompt__text">Log in or create an account to book a table instantly.</p>
                            <Link className="auth-prompt__link" to="/authentication">
                                Go to Login / Register
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const checkIsTaken = useCallback((tableId) => {
        if (!time) return false;
        const reqStart = timeToMins(time);
        const reqEnd = reqStart + duration;

        return bookedTables.some((booking) => {
            if (booking.table_id !== tableId) return false;

            const bookStart = timeToMins(booking.time);
            const bookDuration = booking.duration || 60;
            const bookEnd = bookStart + bookDuration;

            return reqStart < bookEnd && reqEnd > bookStart;
        });
    }, [time, duration, bookedTables]);

    const suitableTables = useMemo(() => {
        return baseTables.filter((table) => table.seats >= Number(guests));
    }, [guests]);

    const areAllTablesTaken = suitableTables.length > 0 && suitableTables.every((table) => checkIsTaken(table.id));

    const handleTableSelect = (table) => {
        if (checkIsTaken(table.id)) return;
        setSelectedTable(table.id === selectedTable ? null : table.id);
    };

    const handleReservationSubmit = (e) => {
        e.preventDefault();
        if (!selectedTable || !date || !time) return;

        const reservationData = { tableId: selectedTable, date, time, duration, guests };

        dispatch(submitReservation(reservationData))
            .unwrap()
            .then(() => {
                dispatch(fetchBookedTables(date));
                setSelectedTable(null);
            })
            .catch(() => {});
    };

    return (
        <>
            <Header />

            <main className="container reservation-main">
                <div className="content">
                    <div className="reservation-booking">
                        <form className="booking-form" onSubmit={handleReservationSubmit}>
                            <h2 className="booking-form__title">Book a Table</h2>

                            {successMessage && <div className="booking-form__message booking-form__message--success">{successMessage}</div>}
                            {error && <div className="booking-form__message booking-form__message--error">{error}</div>}

                            <div className="booking-form__group">
                                <label className="booking-form__label">Date</label>
                                <select
                                    className="booking-form__input"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                >
                                    {availableDates.map(d => (
                                        <option key={d.value} value={d.value}>{d.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="booking-form__group">
                                <label className="booking-form__label">Duration</label>
                                <select
                                    className="booking-form__input"
                                    value={duration}
                                    onChange={(e) => {
                                        setDuration(Number(e.target.value));
                                        setSelectedTable(null);
                                    }}
                                >
                                    <option value={30}>30 Minutes</option>
                                    <option value={60}>1 Hour</option>
                                    <option value={90}>1 Hour 30 Mins</option>
                                    <option value={120}>2 Hours</option>
                                    <option value={180}>3 Hours</option>
                                </select>
                            </div>

                            <div className="booking-form__group">
                                <label className="booking-form__label">Time</label>
                                <select
                                    className="booking-form__input"
                                    value={time}
                                    onChange={(e) => {
                                        setTime(e.target.value);
                                        setSelectedTable(null);
                                    }}
                                    disabled={availableTimes.length === 0}
                                >
                                    {availableTimes.length === 0 ? (
                                        <option value="">No times available</option>
                                    ) : (
                                        availableTimes.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="booking-form__group">
                                <label className="booking-form__label">Guests</label>
                                <input
                                    type="number"
                                    className="booking-form__input"
                                    min="1"
                                    max="12"
                                    value={guests}
                                    onChange={(e) => {
                                        setGuests(Number(e.target.value));
                                        setSelectedTable(null);
                                    }}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="booking-form__submit"
                                disabled={!selectedTable || !date || !time || loading}
                            >
                                {loading ? "Processing..." : "Confirm Reservation"}
                            </button>
                        </form>

                        <div className="table-grid">
                            <h3 className="table-grid__title">Select an Available Table</h3>

                            {!date || !time ? (
                                <p className="table-grid__prompt">Please select a date and time to see availability.</p>
                            ) : suitableTables.length === 0 ? (
                                <div className="table-grid__empty-message">
                                    <h4>Party too large?</h4>
                                    <p>We're sorry, but we don't have individual tables that can accommodate {guests} guests.</p>
                                    <p>Please try splitting your party or contact the restaurant directly for large group bookings.</p>
                                </div>
                            ) : areAllTablesTaken ? (
                                <div className="table-grid__empty-message">
                                    <h4>Fully Booked!</h4>
                                    <p>It looks like all our tables for this party size are taken at this specific time.</p>
                                    <p>Try tweaking your reservation time or selecting a different date to find an open spot!</p>
                                </div>
                            ) : (
                                <>
                                    <div className="table-grid__layout">
                                        {suitableTables.map((table) => {
                                            const isTaken = checkIsTaken(table.id);
                                            return (
                                                <div
                                                    key={table.id}
                                                    onClick={() => handleTableSelect(table)}
                                                    className={`table-grid__card ${isTaken ? 'taken' : 'available'} ${selectedTable === table.id ? 'selected' : ''}`}
                                                >
                                                    <span className="table-grid__name">{table.name}</span>
                                                    <span className="table-grid__seats">{table.seats} Seats</span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="table-legend">
                                        <div className="table-legend__item"><span className="table-legend__box available"></span> Available</div>
                                        <div className="table-legend__item"><span className="table-legend__box taken"></span> Taken</div>
                                        <div className="table-legend__item"><span className="table-legend__box selected"></span> Selected</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}

export default Reservation;