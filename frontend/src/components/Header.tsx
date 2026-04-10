import hamburger from '../assets/hamburger.svg'
import logo from '../../public/icon.svg'
import { useMemo } from 'react'

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
}

export const Header = () => {
    const formattedDate = useMemo(() =>
        new Date().toLocaleDateString('en-US', DATE_OPTIONS), []
    )

    return (
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
                <button className='button-primary' type='button'>+ New Booking</button>
            </div>
        </div>
    )
}