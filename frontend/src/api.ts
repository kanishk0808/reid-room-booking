import type { Room, Booking, CreateBookingRequest } from './types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5203'

class ApiError extends Error {
  status: number
  
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const fetchWithErrorHandling = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new ApiError(response.status, await response.text())
    }
    return response
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(0, 'Network error - check if backend is running')
    }
    throw error
  }
}

export const getRooms = async (): Promise<Room[]> => {
  const response = await fetchWithErrorHandling(`${API_BASE}/rooms`)
  return response.json()
}

export const getBookings = async (): Promise<Booking[]> => {
  const response = await fetchWithErrorHandling(`${API_BASE}/bookings`)
  return response.json()
}

export const createBooking = async (booking: CreateBookingRequest): Promise<Booking> => {
  const response = await fetchWithErrorHandling(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  })
  return response.json()
}

export const cancelBooking = async (bookingId: number): Promise<string> => {
  const response = await fetchWithErrorHandling(`${API_BASE}/bookings/${bookingId}`, {
    method: 'DELETE',
  })
  return response.text()
}