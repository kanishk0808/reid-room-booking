import type { Room, Booking, CreateBookingRequest } from './types';

const API = import.meta.env.VITE_API_URL || "http://localhost:5203";

export const getRooms = async (): Promise<Room[]> => {
    try {
        const res = await fetch(`${API}/rooms`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('CORS')) {
            console.error('CORS Error: Check backend CORS configuration');
        }
        throw error;
    }
};

export const getBookings = async (): Promise<Booking[]> => {
    try {
        const res = await fetch(`${API}/bookings`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('CORS')) {
            console.error('CORS Error: Check backend CORS configuration');
        }
        throw error;
    }
};

export const createBooking = async (booking: CreateBookingRequest): Promise<Booking> => {
    try {
        const res = await fetch(`${API}/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking),
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        return res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('CORS')) {
            console.error('CORS Error: Check backend CORS configuration');
        }
        throw error;
    }
};

export const cancelBooking = async (bookingId: number): Promise<string> => {
    try {
        const res = await fetch(`${API}/bookings/${bookingId}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error(await res.text());
        }

        return res.text();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('CORS')) {
            console.error('CORS Error: Check backend CORS configuration');
        }
        throw error;
    }
};