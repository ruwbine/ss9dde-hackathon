// src/lib/api.ts

import { request } from 'http';

export interface CourseDto {
	id: string;
	title: string;
	subject: string;
	isFavorite: boolean;
}

export async function fetchCourses(): Promise<CourseDto[]> {
	const token = localStorage.getItem('access_token');

	const res = await fetch('http://localhost:3050/courses', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		cache: 'no-store', // для next.js
	});

	if (!res.ok) {
		throw new Error('Ошибка загрузки курсов');
	}

	return res.json();
}
