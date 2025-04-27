// types.ts

// Matches the structure from the backend quiz JSON
export interface BackendQuizOption {
	id: string;
	text: string;
}

export interface BackendQuizQuestion {
	id: string;
	text: string;
	type: 'single' | 'multiple' | 'true_false';
	options: BackendQuizOption[];
}

// Assuming the generation endpoint *might* return this structure
// If the generation endpoint just returns the array of questions directly,
// we might need to handle the quizId differently, perhaps using the first question's ID
// as a placeholder or requiring a separate generation ID from the backend.
// For now, let's assume the response includes a top-level structure with an id.
// If your actual generation endpoint just returns `BackendQuizQuestion[]`, we'll adjust.
export interface GeneratedQuizResponse {
	quizId: string; // Need this for the submission URL
	quizQuestions: BackendQuizQuestion[]; // Array of questions
	explanations: Explanation[]; // Existing type, assuming it stays the same
}

// Structure needed for the submission payload
export interface SubmissionAnswer {
	questionId: string;
	selectedOptionIds: string[]; // Array for multiple, single element for single/true_false
}

export interface SubmissionPayload {
	userId: string; // Placeholder for now
	answers: SubmissionAnswer[];
}

// Existing explanation type
export interface Explanation {
	term: string;
	description: string;
}

// Define a type for the map storing user answers
// Key: questionId, Value: array of selected option IDs
export type UserAnswers = Record<string, string[]>;
