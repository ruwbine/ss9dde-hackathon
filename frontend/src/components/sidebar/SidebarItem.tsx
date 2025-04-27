import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
}

export function SidebarItem({ icon, label, href, onClick }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition",
        isActive
          ? "bg-gray-200 text-black"
          : "text-gray-700 hover:bg-gray-100 hover:text-black"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
