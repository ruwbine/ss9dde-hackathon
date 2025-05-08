export type QuestionType = 'single' | 'multiple' | 'true_false';

// Payload for the API request
export interface GenerateQuizPayload {
	moduleId: string;
	questionType: QuestionType;
}

// Structure for explanations in the API response
export interface Explanation {
	term: string;
	description: string;
}

// Structure for quiz options in the API response
export interface QuizOption {
	text: string;
	isCorrect: boolean;
}

// Structure for individual questions in the API response
export interface Question {
	text: string;
	type: QuestionType;
	options: QuizOption[];
}

// Structure for the details of a quiz in the API response
export interface QuizDetails {
	title: string;
	description: string;
	isCompleted: boolean;
	module: string; // Corresponds to moduleId
	questions: Question[];
}

// Structure for the 'data' field in the API response
export interface QuizData {
	explanations: Explanation[];
	quizQuestions: QuizDetails[]; // API returns an array, typically with one quiz
}

// Overall structure for a successful API response
export interface GenerateQuizApiResponse {
	success: boolean;
	statusCode: number;
	timestamp: string;
	data: QuizData[];
}

// Structure for an API error response
export interface ApiErrorResponse {
	success: boolean; // Typically false for errors
	statusCode: number;
	timestamp?: string;
	message: string;
	error?: any;
}

/**
 * Calls the API to generate a new quiz.
 * @param payload - Data to send with the request (moduleId, questionType).
 * @returns A promise that resolves with the API response.
 */
export const apiGenerateQuiz = async (
	payload: GenerateQuizPayload,
	token: any
): Promise<GenerateQuizApiResponse> => {
	const endpoint = 'http://localhost:3050/adaptive-learning/generate'; // Ensure correct protocol

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(payload), // Payload is now mandatory and structured
		});

		const responseData: GenerateQuizApiResponse | ApiErrorResponse =
			await response.json();

		if (
			!response.ok ||
			(responseData && 'success' in responseData && !responseData.success)
		) {
			const errorResponse = responseData as ApiErrorResponse;
			console.error('API Error:', errorResponse);
			throw new Error(
				errorResponse.message ||
					`Failed to generate quiz. Status: ${response.status}`
			);
		}

		// Ensure the response is actually a success response before casting
		if (!responseData.success) {
			// This case should ideally be caught by !response.ok, but as a fallback:
			const errorResponse = responseData as ApiErrorResponse;
			console.error('API Error (success:false):', errorResponse);
			throw new Error(
				errorResponse.message ||
					`API indicated failure for generating quiz.`
			);
		}

		return responseData as GenerateQuizApiResponse;
	} catch (error) {
		console.error('Network or parsing error in apiGenerateQuiz:', error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error(
			'An unexpected error occurred while generating the quiz.'
		);
	}
};
