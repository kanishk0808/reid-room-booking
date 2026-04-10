import { useMemo } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import RoomComponent from './components/RoomComponent'
import BookingComponent from './components/BookingComponent'
import type { Room } from './types'

const ROOMS: Room[] = [
  { id: 1, name: 'Eucalypt', capacity: 4, amenities: ['Projector', 'Whiteboard', 'TV', 'Video Call'], floor: 2 },
  { id: 2, name: 'Wattle', capacity: 6, amenities: ['Projector', 'Video Call'], floor: 1 },
  { id: 3, name: 'Cassia', capacity: 8, amenities: ['Whiteboard'], floor: 1 }
]

const ROOM_COLORS = ['bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500', 'bg-cyan-500']

const BOOKINGS = [
  { id: 1, roomName: 'Eucalypt', title: 'Team Sync', date: 'Aug 25', timeRange: '10:00 - 11:00', userName: 'Alice' },
  { id: 2, roomName: 'Wattle', title: 'Design Review', date: 'Aug 25', timeRange: '11:30 - 12:30', userName: 'Tom' },
  { id: 3, roomName: 'Cassia', title: 'Sprint Planning', date: 'Aug 25', timeRange: '14:00 - 15:00', userName: 'Maya' }
]

const HEADER_COLUMNS = [
  { label: 'Room', className: 'min-w-38' },
  { label: 'Title', className: 'flex-1' },
  { label: 'Date & Time', className: 'min-w-47' },
  { label: 'Booked By', className: 'min-w-30' },
  { label: '', className: 'w-24' }
]

function App() {
  const totalBookings = useMemo(() => BOOKINGS.length, [])
  const totalRooms = useMemo(() => ROOMS.length, [])

  const handleEdit = (id: number) => console.log('Edit', id)
  const handleDelete = (id: number) => console.log('Delete', id)

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex grow'>
        <Sidebar rooms={ROOMS} ROOM_COLORS={ROOM_COLORS} />

        <main className='flex flex-1 sm:flex-col md:flex-row p-8 mt-17 md:ml-70 gap-8 bg-cream'>
          <section className='flex flex-1 flex-col'>
            <div className='flex flex-col justify-between bg-warm-white border border-border p-5 rounded-2xl'>
              <p className='uppercase text-xs text-ink-60 tracking-widest font-semibold'>Total Bookings</p>
              <h1 className='heading'>{totalBookings}</h1>
              <p className='text-xs text-ink-60'>Across {totalRooms} rooms</p>
            </div>

            <div className='flex flex-col bg-warm-white border border-border rounded-2xl mt-8'>
              <div className='border-b border-border p-5'>
                <p className='heading text-lg'>Rooms</p>
              </div>
              <div className='flex flex-col p-5 gap-4'>
                {ROOMS.map((room, index) => (
                  <RoomComponent key={room.id} room={room} index={index} colors={ROOM_COLORS} />
                ))}
              </div>
            </div>
          </section>

          <section className='flex flex-2 flex-col bg-warm-white border border-border rounded-2xl'>
            <div className='border-b border-border p-5'>
              <p className='heading text-lg'>Reservations</p>
            </div>
            <div className='flex flex-row p-3 border-b border-border bg-cream'>
              {HEADER_COLUMNS.map(({ label, className }) => (
                <p key={label} className={`font-semibold text-ink-60 text-xs uppercase ${className}`}>
                  {label}
                </p>
              ))}
            </div>
            {BOOKINGS.map((booking) => (
              <BookingComponent
                key={booking.id}
                roomName={booking.roomName}
                title={booking.title}
                date={booking.date}
                timeRange={booking.timeRange}
                userName={booking.userName}
                onEdit={() => handleEdit(booking.id)}
                onDelete={() => handleDelete(booking.id)}
              />
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}

export default App