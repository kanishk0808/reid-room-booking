export interface Room {
  id: number
  name: string
  capacity: number
  floor: number
  amenities: string[]
}

export interface Booking {
  id: number
  roomId: number
  room?: Room
  title: string
  startTime: string
  endTime: string
  userName: string
}

export interface CreateBookingRequest {
  roomId: number
  title: string
  startTime: string
  endTime: string
  userName: string
}