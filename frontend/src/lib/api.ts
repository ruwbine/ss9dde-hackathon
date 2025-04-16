// src/lib/api.ts

export interface CourseDto {
    id: string;
    title: string;
    subject: string;
    isFavorite: boolean;
  }
  
  export async function fetchCourses(): Promise<CourseDto[]> {
    const res = await fetch("https://your-api.com/api/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // для next.js
    });
  
    if (!res.ok) {
      throw new Error("Ошибка загрузки курсов");
    }
  
    return res.json();
  }
  