import type { Room } from "../types";

export default function RoomComponent({ room, index, colors }: { room: Room; index: number; colors: string[] }) {
    console.log(room) // Log the room object to see its structure and properties
    return (
        <div className='flex flex-row border border-border rounded-lg hover:bg-[#fefdfa] hover:border-accent hover:shadow-md transition-all duration-300'>
            <div className={`w-1 h-full rounded-l-lg ${colors[index % colors.length]}`} />
            <div className='flex flex-col p-3 gap-2'>
                <p className='font-mono font-semibold text-sm'>{room.name}</p>
                <p className='font-mono text-sm text-ink-60'>⬡ {room.capacity} people · Floor {room.floor}</p>
                <div className='flex flex-row gap-2 mt-2 flex-wrap'>
                    {room.amenities.map(amenity => (
                        <p key={amenity} className='font-mono text-xs text-ink-60 border border-border bg-cream rounded-full py-1 px-3'>{amenity}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
