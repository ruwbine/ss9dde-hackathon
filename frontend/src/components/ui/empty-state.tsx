'use client';

import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({
  title = "Курсы не найдены",
  description = "В данный момент нет доступных курсов. Пожалуйста, обратитесь к администратору или создайте новый курс.",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center border border-dashed border-gray-300 bg-gray-50 p-6 rounded-md text-gray-600",
        className
      )}
    >
      <FileQuestion className="h-10 w-10 mb-2" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
}
