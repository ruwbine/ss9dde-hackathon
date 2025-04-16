import {
  Book,
  Calendar,
  LogOut,
  Settings,
  User,
  BarChart2,
} from "lucide-react";
import { SidebarItem } from "./sidebarItem";

export function SidebarMenu() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SidebarItem icon={<Book />} label="Курсы" href="/courses" />
      <SidebarItem icon={<User />} label="Аккаунт" href="/account" />
      <SidebarItem icon={<Calendar />} label="Календарь" href="/calendar" />
      <SidebarItem icon={<Settings />} label="Настройки" href="/settings" />
      <SidebarItem icon={<BarChart2 />} label="Прогресс" href="/progress" />
      <SidebarItem icon={<LogOut />} label="Выход" href="/logout" />
    </div>
  );
}
