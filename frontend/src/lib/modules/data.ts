// lib/data/modules.ts
// Server-side data fetching logic
import { cookies } from 'next/headers';
import { IModule } from '@/types/module';

// Helper function to get auth token on the server
export async function getAuthToken(): Promise<string | undefined> {
	return (await cookies()).get('access_token')?.value;
}

export async function fetchModules(courseId: string): Promise<IModule[]> {
	const token = await getAuthToken(); // Get token on the server
	if (!token) {
		// Handle unauthenticated state appropriately
		console.error('No access token found');
		return []; // Or throw an error, redirect, etc.
	}

	// Use environment variable for API base URL
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050';
	try {
		const res = await fetch(`${apiUrl}/courses/${courseId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			// 'no-store' ensures data is fresh on every request to the server
			cache: 'no-store',
		});

		if (!res.ok) {
			// Log error details for debugging
			console.error(
				`Error fetching modules: ${res.status} ${res.statusText}`
			);
			// Depending on error type (e.g., 401), you might want to redirect
			// For now, return empty array on non-OK status
			return [];
		}

		const response = await res.json();
		// Basic validation if needed, assuming API returns IModule[]
		const modules = response.data;
		return modules as IModule[];
	} catch (error) {
		console.error('Fetch error for modules:', error);
		// Handle network errors or other exceptions
		return [];
	}
}

// Note: Deletion/creation logic will be in Client Components
// calling relevant API endpoints directly from the browser.
// Server Actions could be an alternative for mutations if preferred.
