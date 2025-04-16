'use client';

import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarMenu } from "../sidebar/SidebarMenu";
import { Menu } from "lucide-react";

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Кнопка — должна быть вне main! */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white shadow-md rounded-md md:hidden"
      >
        <Menu />
      </button>

      {/* Mobile сайдбар */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[250px] p-0">
          <SidebarMenu onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop сайдбар */}
      <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white shadow-sm fixed left-0 top-0 z-40">
        <SidebarMenu />
      </div>
    </>
  );
}
