// lib/types.ts

// Note: The decorators like @Expose, @Type, etc., are primarily for
// class-transformer and class-validator on the backend or in a specific
// data layer. On the frontend client/server components, they mostly serve
// as type annotations if you're not running the transformation/validation logic.
// We include them here as per your interfaces, but their runtime effect
// is not utilized in the React components below.

export interface QuestionOptionDto {
	text: string;
	id: string;
}

export interface QuestionResponseDto {
	id: string;

	text: string;

	type: 'single' | 'multiple' | 'true_false';

	options: QuestionOptionDto[];
}

export interface ExplanationResponseDto {
	id: string;

	term: string;

	description: string;
}

export interface QuizResponseDto {
	id: string;

	title: string;

	description: string;

	isCompleted: boolean;

	questions: QuestionResponseDto[]; // Array of QuestionResponseDto

	explanations: ExplanationResponseDto[]; // Array of ExplanationResponseDto
}

// Update DTOs are not directly used in the display part, but kept for completeness
export interface UpdateQuestionOptionDto {
	id?: string;

	text: string;

	isCorrect: boolean;
}

export interface UpdateQuestionDto {
	text?: string;

	type?: 'single' | 'multiple' | 'true_false';

	options?: UpdateQuestionOptionDto[];
}
