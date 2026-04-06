import type { ReactNode } from "react"

interface MenuItemProps {
	icon: ReactNode
	name: string
	isActive?: boolean
	onClick: () => void
}

export const MenuItem = ({ icon, name, isActive = false, onClick }: MenuItemProps) => {
	const baseClasses = 'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer'
	const activeClasses = isActive 
		? 'text-cream bg-[#c8522a38]' 
		: 'text-slate-600 hover:bg-[#f7f3ee12] hover:text-cream'
	
	const iconClasses = isActive 
		? 'text-accent' 
		: 'text-[#f7f3eea6] group-hover:text-cream'
	
	const textClasses = isActive
		? 'font-semibold text-cream'
		: 'font-normal text-[#f7f3eea6] group-hover:text-cream'

	return (
		<button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
			<span className={`transition-colors duration-300 ${iconClasses}`}>
				{icon}
			</span>
			<span className={`text-sm tracking-wide transition-all duration-300 ${textClasses}`}>
				{name}
			</span>
		</button>
	)
}