'use client';

import { CourseCard, ICourse } from "@/components/course/CourseCard";

const courses: ICourse[] = [
  { id: "1", title: "Алгоритмы", subject: "Информатика", isFavorite: false },
  { id: "2", title: "Анализ данных", subject: "Математика", isFavorite: true },
  { id: "3", title: "Ораторское искусство", subject: "Коммуникации", isFavorite: false },
];

export default function CoursesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Все курсы</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
