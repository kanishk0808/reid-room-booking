import { useState, useMemo } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import type { Room } from './types'

const ROOMS: Room[] = [
  { id: 1, name: "Room A", capacity: 4, floor: 1, amenities: [] },
  { id: 2, name: "Room B", capacity: 6, floor: 1, amenities: [] },
  { id: 3, name: "Room C", capacity: 8, floor: 2, amenities: [] }
]

const ROOM_COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500']

function App() {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [rooms] = useState<Room[]>(ROOMS)

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex grow'>
        <Sidebar rooms={rooms} ROOM_COLORS={ROOM_COLORS} />
        <div className='flex grow bg-cream ml-0 md:ml-70'>
          <div className='p-6 w-full'>
            <h2 className='text-2xl font-semibold mb-4'>{activeItem}</h2>
            <p>Content for {activeItem} will go here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App