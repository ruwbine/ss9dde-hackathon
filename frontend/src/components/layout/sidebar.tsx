'use client';

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarMenu } from "../sidebar/SidebarMenu";
import { Menu } from "lucide-react";

export function Sidebar() {
  return (
    <div className="md:w-64">
      {/* Mobile trigger */}
      <Sheet>
        <SheetTrigger className="md:hidden p-4">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] p-0">
          <SidebarMenu />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white shadow-sm">
        <SidebarMenu />
      </div>
    </div>
  );
}
