import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // если не подключён — создам ниже

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
}

export function SidebarItem({ icon, label, href }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
