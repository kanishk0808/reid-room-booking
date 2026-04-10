import { CircleUserRound, Pencil, X } from 'lucide-react'

interface BookingComponentProps {
  roomName: string
  title: string
  date: string
  timeRange: string
  userName: string
  roomColor?: string
  onEdit?: () => void
  onDelete?: () => void
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
  onDelete,
}: BookingComponentProps) {
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
        <CircleUserRound size={20} />
        <p className='font-mono text-sm'>{userName}</p>
      </div>

      <div className='flex gap-2 ml-auto'>
        <button type='button' className={buttonClasses} onClick={onEdit}>
          <Pencil size={15} />
        </button>
        <button type='button' className={buttonClasses} onClick={onDelete}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
