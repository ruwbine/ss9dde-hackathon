'use client';

import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ErrorMessage({
  title = "Произошла ошибка",
  description = "Нет данных. Пожалуйста, обратитесь к администратору.",
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center border border-red-300 bg-red-50 p-6 rounded-md text-red-700",
        className
      )}
    >
      <AlertTriangle className="h-10 w-10 mb-2" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
}
