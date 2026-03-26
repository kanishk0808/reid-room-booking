const API = "http://localhost:5203";

export const getRooms = async () => {
  const res = await fetch(`${API}/rooms`);
  return res.json();
};

export const getBookings = async () => {
  const res = await fetch(`${API}/bookings`);
  return res.json();
};

export const createBooking = async (booking: any) => {
  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};