interface SideRoomProps {
    name: string
    color: string
}

export const SidebarRoom = ({ name, color }: SideRoomProps) => (
    <div className='w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 group text-slate-600 hover:bg-[#f7f3ee12] hover:text-cream'>
        <div className={`w-2 h-2 ${color} rounded-full`} />
        <span className='font-normal text-sm tracking-wide transition-all duration-300 text-[#f7f3eea6] group-hover:text-cream'>
            {name}
        </span>
    </div>
)