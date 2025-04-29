import { SidebarItem } from './SidebarItem';
import {
	Book,
	Calendar,
	LogOut,
	Settings,
	User,
	BarChart2,
} from 'lucide-react';

interface SidebarMenuProps {
	onNavigate?: () => void;
}

export function SidebarMenu({ onNavigate }: SidebarMenuProps) {
	const handleClick = () => {
		if (onNavigate) onNavigate();
	};

	return (
		<div className="flex flex-col gap-2 p-4">
			<SidebarItem
				icon={<Book />}
				label="Курсы"
				href="/courses"
				onClick={handleClick}
			/>
			{/* <SidebarItem icon={<User />} label="Аккаунт" href="/account" onClick={handleClick} /> */}
			{/* <SidebarItem icon={<Calendar />} label="Календарь" href="/calendar" onClick={handleClick} /> */}
			{/* <SidebarItem icon={<Settings />} label="Настройки" href="/settings" onClick={handleClick} /> */}
			<SidebarItem
				icon={<BarChart2 />}
				label="Прогресс"
				href="/dashboard"
				onClick={handleClick}
			/>
			<SidebarItem
				icon={<LogOut />}
				label="Выход"
				href="/logout"
				onClick={handleClick}
			/>
		</div>
	);
}
