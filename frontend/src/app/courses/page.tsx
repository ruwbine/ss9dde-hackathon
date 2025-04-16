'use client';

import { CourseCard } from "@/components/course/CourseCard";
import { CreateCourseDialog } from "@/components/course/CreateCourseDialog";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorMessage } from "@/components/ui/error-message";
import { CourseDto, fetchCourses } from "@/lib/api";
import { useState, useEffect } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (err: any) {
      setError(err.message || "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Все курсы</h1>
        <CreateCourseDialog onCreated={load} />
      </div>

      {error && (
        <ErrorMessage
          title="Не удалось загрузить курсы"
          description="Пожалуйста, попробуйте позже или обратитесь к администратору."
        />
      )}

      {!loading && !error && courses.length === 0 && <EmptyState />}

      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
