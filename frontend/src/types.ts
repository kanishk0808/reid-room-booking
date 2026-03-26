export interface Room {
    id: number;
    name: string;
    capacity: number;
}

export interface Booking {
    id: number;
    roomId: number;
    room?: Room;
    startTime: string;
    endTime: string;
    userName: string;
}

export interface CreateBookingRequest {
    roomId: number;
    startTime: string;
    endTime: string;
    userName: string;
}