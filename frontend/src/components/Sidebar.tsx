import type { Room } from "../types"
import { MenuItem } from "./MenuItem"
import { SidebarRoom } from "./SidebarRoom"
import { useMemo, useState } from "react"
import { LayoutDashboard, CalendarDays, ClipboardMinus, Cog } from 'lucide-react'

const ROOMS: Room[] = [
    { id: 1, name: "Room A", capacity: 4 },
    { id: 2, name: "Room B", capacity: 6 },
    { id: 3, name: "Room C", capacity: 8 }
]

const ROOM_COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500']

const MENU_ITEMS = [
    { id: 'home', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', name: 'Calendar', icon: CalendarDays },
    { id: 'reports', name: 'Reports', icon: ClipboardMinus },
    { id: 'settings', name: 'Settings', icon: Cog },
]

export const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard')
    const [rooms, setRooms] = useState<Room[]>(ROOMS)


    const menuData = useMemo(() =>
        MENU_ITEMS.map(item => ({
            ...item,
            icon: <item.icon size={activeItem === item.name ? 17 : 15} />
        })), [activeItem]
    )

    return (
        <div className='flex flex-col w-70 bg-ink p-5'>
            <div className='flex items-center gap-3 pb-5'>
                <div className='w-2 h-2 bg-accent rounded-full' />
                <h1 className='heading text-white'>Bookings</h1>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-[#f7f3ee59] uppercase pl-3 text-xs font-semibold tracking-widest'>Menu</p>
                {menuData.map(item => (
                    <MenuItem
                        key={item.id}
                        icon={item.icon}
                        name={item.name}
                        isActive={activeItem === item.name}
                        onClick={() => setActiveItem(item.name)}
                    />
                ))}
            </div>
            <div className='flex flex-1 flex-col mt-3 justify-end'>
                <p className='text-[#f7f3ee59] uppercase pl-3 mb-3 mt-2 text-xs font-semibold tracking-widest'>Rooms</p>
                {rooms.map((room, index) => (
                    <SidebarRoom
                        key={room.id}
                        name={room.name}
                        color={ROOM_COLORS[index % ROOM_COLORS.length]}
                    />
                ))}
            </div>
        </div>
    )
}