import { ApiResponse } from "@/types/api/api-response.interface";

// src/lib/api.ts
export interface CourseDto {
	id: string;
	title: string;
	subject: string;
	isFavorite: boolean;
}

// src/lib/api/fetch-courses.ts

export async function fetchCourses(token: string): Promise<ApiResponse<any>> {
	const res = await fetch('http://localhost:3050/courses', {
		method: 'GET',
		credentials: 'include',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		cache: 'no-store',
	});


	if (!res.ok) throw new Error('Ошибка загрузки курсов');
	return res.json();
}
