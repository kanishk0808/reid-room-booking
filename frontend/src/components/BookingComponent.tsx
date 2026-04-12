import Modal from 'react-modal'
import { CircleUserRound, Pencil, Trash2, X } from 'lucide-react'
import { useState } from 'react'

interface BookingComponentProps {
    roomName: string
    title: string
    date: string
    timeRange: string
    userName: string
    roomColor?: string
    onEdit?: () => void
}

const buttonClasses = 'button-ghost hover:text-accent transition-all duration-300 p-2'

export default function BookingComponent({
    roomName,
    title,
    date,
    timeRange,
    userName,
    roomColor = 'bg-green-500',
    onEdit,
}: BookingComponentProps) {

    const [showCancelModal, setShowCancelModal] = useState(false)

    return (
        <div className='flex items-center gap-4 p-5 border-b border-border'>
            <div className='flex items-center gap-2 min-w-32.5'>
                <div className={`h-2 w-2 rounded-full ${roomColor}`} />
                <p className='font-mono text-sm'>{roomName}</p>
            </div>

            <p className='flex-1 font-mono font-semibold text-sm'>{title}</p>

            <div className='flex flex-col min-w-42.5 gap-1'>
                <p className='font-mono font-semibold text-sm'>{date}</p>
                <p className='text-ink-60 text-sm'>{timeRange}</p>
            </div>

            <div className='flex items-center gap-2 min-w-30'>
                <CircleUserRound size={20} strokeWidth={1} />
                <p className='font-mono text-sm'>{userName}</p>
            </div>

            <div className='flex gap-2 ml-auto'>
                {/* <button type='button' className={buttonClasses} onClick={onEdit}>
          <Pencil size={15} />
        </button> */}
                <button type='button' className={buttonClasses} onClick={() => setShowCancelModal(true)}>
                    <X size={16} />
                </button>
            </div>
            {/* Cancel Booking Modal */}
            <Modal
                isOpen={showCancelModal}
                onRequestClose={() => setShowCancelModal(false)}
                contentLabel="Cancel Booking"
                className="modal"
                overlayClassName="overlay"
            >
                <div className='flex flex-row justify-between items-center p-6 border-b border-border'>
                    <h2 className='heading'>Cancel Booking?</h2>
                    <div className='border border-border rounded-full p-1 hover:cursor-pointer hover:bg-cream hover:shadow-md' onClick={() => setShowCancelModal(false)}>
                        <X size={25} strokeWidth={1.2} />
                    </div>
                </div>
                <div className='flex flex-col items-center p-6'>
                    <Trash2 size={48} className='text-ink-60 mx-auto my-6' strokeWidth={1} />
                    <p className='text-center text-ink-60 font-mono text-sm text-wrap'>This will mark the booking as cancelled. The room will be freed up for others.</p>
                    <div className='flex justify-center gap-4 mt-6'>
                        <button className='button-ghost' onClick={() => setShowCancelModal(false)}>Keep it</button>
                        <button className='button-primary' onClick={() => {
                            setShowCancelModal(false)
                        }}>
                            Yes, Cancel
                        </button>
                    </div>

                </div>

                
            </Modal>
        </div>
    )
}
