import { Sidebar } from "@/components/layout/sidebar";
import "./globals.css";
import {Toaster} from '@/components/ui/sonner';
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6">{children}</main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
