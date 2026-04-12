import Modal from 'react-modal';
import hamburger from '../assets/hamburger.svg'
import logo from '../../public/icon.svg'
import { useMemo, useState } from 'react'
import { X } from 'lucide-react';
import type { Room } from '../types';

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
}

Modal.setAppElement('#root');

export const Header = ({ rooms }: { rooms: Room[] }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [bookingTitle, setBookingTitle] = useState('');
    const [bookingName, setBookingName] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [bookingStartTime, setBookingStartTime] = useState('');
    const [bookingEndTime, setBookingEndTime] = useState('');

    const formattedDate = useMemo(() =>
        new Date().toLocaleDateString('en-US', DATE_OPTIONS), []
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'bookingTitle':
                setBookingTitle(value);
                break;
            case 'bookingName':
                setBookingName(value);
                break;
            case 'bookingDate':
                setBookingDate(value);
                break;
            case 'bookingStartTime':
                setBookingStartTime(value);
                break;
            case 'bookingEndTime':
                setBookingEndTime(value);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className='header'>
                <div className='flex gap-6'>
                    <div className='md:hidden self-center'>
                        <img src={hamburger} alt='Menu Logo' width={25} height={25} />
                    </div>
                    <div className='flex gap-2 self-center'>
                        <img src={logo} alt='RoomFlow Logo' width={32} height={32} />
                        <h1 className='heading'>RoomFlow</h1>
                    </div>
                    <div className=' border border-border bg-cream px-3 py-1.5 rounded-full self-center'>
                        <p className='font-mono text-sm text-slate-500'>{formattedDate}</p>
                    </div>
                </div>
                <div className='flex gap-6'>
                    <button className='button-primary' type='button' onClick={() => setIsOpen(true)}>+ New Booking</button>
                </div>
            </div>
            {/* New booking Modal */}
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setIsOpen(false)}
                    contentLabel="Create New Booking"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <div className='flex flex-row justify-between items-center p-6 border-b border-border'>
                        <h2 className='heading'>Create New Booking</h2>
                        <div className='border border-border rounded-full p-1 hover:cursor-pointer hover:bg-cream hover:shadow-md' onClick={() => setIsOpen(false)}>
                            <X size={25} strokeWidth={1.2} />
                        </div>
                    </div>

                    <form className='flex flex-col p-6 gap-4'>

                        <p className='text-ink-60 uppercase text-xs font-semibold tracking-widest'>Select Room</p>
                        <div className='grid grid-cols-2 gap-3'>
                            {
                                rooms.map(room => (
                                    <div
                                        key={room.id}
                                        className={`flex flex-row items-center gap-3 border rounded-lg p-3 hover:bg-cream hover:border-accent hover: cursor-pointer hover:shadow-sm transition-all duration-300 ${selectedRoom?.id === room.id ? 'bg-white border-2 border-accent' : 'border-border'}`}
                                        onClick={() => setSelectedRoom(room)}>
                                        <div className={`w-2 h-2 rounded-full ${room.color}`} />
                                        <div className='flex flex-col'>
                                            <p className='font-mono font-semibold text-sm'>{room.name}</p>
                                            <p className='font-mono text-xs text-ink-60'>up to {room.capacity} people</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <p className='text-ink-60 uppercase text-xs font-semibold tracking-widest'>Booking Title</p>
                        <input
                            type='text'
                            name='bookingTitle'
                            value={bookingTitle}
                            onChange={(e) => handleChange(e)}
                            placeholder='e.g. Q3 Planning Meeting'
                            className='border border-border h-10 rounded-lg px-3 focus:bg-cream outline-accent'
                        />

                        <p className='text-ink-60 uppercase text-xs font-semibold tracking-widest'>Booked By</p>
                        <input
                            type='text'
                            name='bookingName'
                            value={bookingName}
                            onChange={(e) => handleChange(e)}
                            placeholder='Your Name' 
                            className='border border-border h-10 rounded-lg px-3 focus:bg-cream outline-accent' 
                            />

                        <p className='text-ink-60 uppercase text-xs font-semibold tracking-widest'>Date</p>
                        <input
                            type='date'
                            name='bookingDate'
                            value={bookingDate}
                            onChange={(e) => handleChange(e)}
                            className='border border-border h-10 rounded-lg px-3 focus:bg-cream outline-accent' />

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <p className='text-ink-60 uppercase text-xs font-semibold tracking-widest pb-4'>Start Time</p>
                                <input
                                    type='time'
                                    name='bookingStartTime'
                                    value={bookingStartTime}
                                    onChange={(e) => handleChange(e)}
                                    className='border border-border h-10 w-full rounded-lg px-3 focus:bg-cream outline-accent' />
                            </div>
                            <div>
                                <p className='text-ink-60 uppercase text-xs font-semibold tracking-widest pb-4'>End Time</p>
                                <input
                                    type='time'
                                    name='bookingEndTime'
                                    value={bookingEndTime}
                                    onChange={(e) => handleChange(e)}
                                    className='border border-border h-10 w-full rounded-lg px-3 focus:bg-cream outline-accent' />
                            </div>
                        </div>

                        <div className='flex gap-4 mt-4 justify-end'>
                            <button type='button' className='button-ghost' onClick={() => setIsOpen(false)}>Cancel</button>
                            <button type='submit' className='button-primary' onClick={()=>console.log(selectedRoom, bookingTitle, bookingName, bookingDate, bookingStartTime, bookingEndTime)}>Save Booking</button>
                        </div>

                    </form>
                </Modal>
            </div>
        </>
    )
}