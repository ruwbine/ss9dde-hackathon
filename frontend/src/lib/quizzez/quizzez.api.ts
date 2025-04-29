// lib/api.ts

import { QuizResponseDto } from '@/types/quizzez/quizzez.types';

const API_BASE_URL = 'http://localhost:3050/ai-gemini';

export async function getAllQuizzes(): Promise<QuizResponseDto[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/getAll`, {
			// Optional: Add cache control if needed.
			// For frequently changing data, 'no-store' might be appropriate
			// For data that is stable during a build/request, 'force-cache' or default is fine
			cache: 'no-store', // Example: Opt-out of Next.js Data Cache for this fetch
		});

		if (!response.ok) {
			// Handle non-2xx responses
			const errorData = await response.text(); // or response.json() if backend sends error JSON
			console.error('API Error:', response.status, errorData);
			throw new Error(
				`Failed to fetch quizzes: ${response.status} ${response.statusText}`
			);
		}

		const data: QuizResponseDto[] = await response.json();
		// Note: If you were using class-transformer on the frontend, you'd
		// perform transformation here: plainToInstance(QuizResponseDto, data)
		// But for typical display components, relying on the type assertion is sufficient.
		console.log(data.data);
		return data.data;
	} catch (error) {
		console.error('Error fetching quizzes:', error);
		// Re-throw or return a specific error structure depending on desired handling in the page
		throw error;
	}
}

// Helper to fetch a single quiz (needed for the [quizId] page)
export async function getQuizById(id: string): Promise<any> {
	try {
		const response = await fetch(`${API_BASE_URL}/get/${id}`, {
			cache: 'no-store', // Example
		});

		if (!response.ok) {
			// Handle 404 specifically if needed
			if (response.status === 404) {
				return null; // Quiz not found
			}
			const errorData = await response.text();
			console.error(
				`API Error fetching quiz ${id}:`,
				response.status,
				errorData
			);
			throw new Error(
				`Failed to fetch quiz ${id}: ${response.status} ${response.statusText}`
			);
		}

		const data: QuizResponseDto = await response.json();
		return data;
	} catch (error) {
		console.error(`Error fetching quiz ${id}:`, error);
		throw error;
	}
}

// lib/api.ts
// (Keep the previous code for getAllQuizzes and getQuizById)

// Add type for the submission payload
export interface AnswerSubmission {
	questionId: string;
	selectedOptionIds: string[];
}

export interface QuizSubmissionPayload {
	answers: AnswerSubmission[];
}

export async function submitQuizAnswers(
	quizId: string,
	payload: QuizSubmissionPayload
): Promise<any> {
	// Adjust return type based on your backend response
	try {
		const response = await fetch(
			`http://localhost:3050/ai-gemini/submitQuizAnswers/${quizId}`,
			{
				// Assuming this is your submission endpoint
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Add any other headers like Authorization if needed
				},
				body: JSON.stringify(payload),
			}
		);

		if (!response.ok) {
			const errorData = await response.text();
			console.error(
				`API Error submitting quiz ${quizId}:`,
				response.status,
				errorData
			);
			throw new Error(
				`Failed to submit quiz ${quizId}: ${response.status} ${response.statusText}`
			);
		}

		// Assuming your backend returns some confirmation or result
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(`Error submitting quiz ${quizId}:`, error);
		throw error;
	}
}

// Keep getAllQuizzes and getQuizById from the previous step
// ...
