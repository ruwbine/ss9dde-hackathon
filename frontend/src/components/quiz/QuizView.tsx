// QuizView.tsx
import { useState } from 'react'; // Import useState
import { QuizQuestion } from './QuizQuestion';
import { ExplanationsList } from './ExplanationsList'; // Make sure ExplanationsList uses the Explanation type
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

import { toast } from 'sonner'; // Assuming you use sonner for toasts
import {
	BackendQuizQuestion,
	Explanation,
	SubmissionPayload,
	UserAnswers,
	SubmissionAnswer,
} from '@/types/types,';

// Update Props to match the expected data structure and add quizId/onSubmit
interface Props {
	quizId: string; // Need quizId for the submission endpoint
	quizQuestions: BackendQuizQuestion[]; // Array of questions
	explanations: Explanation[];
	// Callback to handle submission (passed down from QuizGeneratorDialog)
	onSubmitQuiz: (payload: SubmissionPayload) => Promise<void>;
}

export function QuizView({
	quizId,
	quizQuestions,
	explanations,
	onSubmitQuiz,
}: Props) {
	// State to store user's answers: { questionId: [selectedOptionId1, selectedOptionId2], ... }
	const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionSuccess, setSubmissionSuccess] = useState(false); // Optional: Track if submitted

	// Handler for when an option is selected/deselected
	const handleOptionChange = (
		questionId: string,
		optionId: string,
		isSelected: boolean
	) => {
		setUserAnswers((prevAnswers) => {
			const currentSelections = prevAnswers[questionId] || [];
			let newSelections: string[];

			if (
				quizQuestions.find((q) => q.id === questionId)?.type ===
				'multiple'
			) {
				// For multiple choice, add or remove the option ID
				if (isSelected) {
					// Add if not already present
					newSelections = [...currentSelections, optionId].filter(
						(v, i, a) => a.indexOf(v) === i
					);
				} else {
					// Remove
					newSelections = currentSelections.filter(
						(id) => id !== optionId
					);
				}
			} else {
				// For single choice or true_false, replace with the new option ID if selected, or empty if deselected (shouldn't happen with radio)
				newSelections = isSelected ? [optionId] : [];
			}

			// Return the updated state
			return {
				...prevAnswers,
				[questionId]: newSelections,
			};
		});
	};

	// Prepare the submission payload
	const prepareSubmissionPayload = (): SubmissionPayload => {
		const answers: SubmissionAnswer[] = Object.keys(userAnswers).map(
			(questionId) => {
				// Ensure all questions are included, even if no answer was selected yet (empty array)
				const selectedOptionIds = userAnswers[questionId] || [];
				return {
					questionId: questionId,
					selectedOptionIds: selectedOptionIds,
				};
			}
		);

		// Optional: Filter out questions with no answers if backend requires it
		// const answers: SubmissionAnswer[] = Object.keys(userAnswers)
		//     .filter(questionId => userAnswers[questionId] && userAnswers[questionId].length > 0)
		//     .map(questionId => ({
		//         questionId: questionId,
		//         selectedOptionIds: userAnswers[questionId],
		//     }));

		// TODO: Replace with actual user ID from authentication context or other source
		const userId = 'ab55aa87-fe33-45ba-82e7-dd6adc74c7a1'; // Placeholder User ID

		return {
			userId: userId,
			answers: answers,
		};
	};

	// Handle the submission click
	const handleSubmit = async () => {
		const payload = prepareSubmissionPayload();

		// Basic validation: Check if at least one option is selected for each question
		const allQuestionsAnswered = quizQuestions.every(
			(q) => userAnswers[q.id] && userAnswers[q.id].length > 0
		);

		if (!allQuestionsAnswered && quizQuestions.length > 0) {
			// This check might be too strict if some questions *can* be skipped.
			// Adjust validation based on your quiz rules.
			// For 'multiple' type, length check > 0 is fine. For 'single', length must be 1.
			// Let's refine validation slightly: single/true_false need 1, multiple can have >=0 or >0
			const hasMissingAnswers = quizQuestions.some((q) => {
				const selected = userAnswers[q.id] || [];
				if (q.type === 'single' || q.type === 'true_false') {
					return selected.length !== 1;
				}
				// For multiple, allow 0 selections, or require at least one if necessary
				// return selected.length === 0; // Uncomment if multiple *must* have at least one selection
				return false; // Default: multiple can have 0 selections
			});

			if (hasMissingAnswers) {
				toast.warning(
					'Пожалуйста, выберите ответ для каждого вопроса с одним верным ответом.'
				);
				return;
			}
		}

		setIsSubmitting(true);
		try {
			await onSubmitQuiz(payload); // Call the submit handler passed from parent
			setSubmissionSuccess(true); // Mark as submitted
			toast.success('Квиз успешно отправлен!');
			// Optionally disable further changes or show results
		} catch (error: any) {
			toast.error(
				'Ошибка отправки квиза: ' +
					(error.message || 'Неизвестная ошибка')
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Initialize userAnswers state when quizQuestions change
	// This ensures the state is ready even if the user doesn't interact with a question
	useState(() => {
		const initialAnswers: UserAnswers = {};
		quizQuestions.forEach((q) => {
			initialAnswers[q.id] = []; // Start with empty array for each question
		});
		setUserAnswers(initialAnswers);
	}, [quizQuestions]);

	// Prevent submitting if no questions are loaded or already submitted
	const canSubmit =
		quizQuestions.length > 0 && !isSubmitting && !submissionSuccess;

	return (
		<div className="max-h-[calc(100vh-40px)] overflow-y-auto px-2 flex flex-col">
			{' '}
			{/* Use flex-col to push submit button down */}
			{/* Title and Description are not in the backend quiz JSON structure provided,
                so I'm removing them to match the actual backend data.
                If your *generation* endpoint returns them, you'll need to keep them
                and adjust the types accordingly. Based on the provided QUIZ JSON,
                it's just an array of questions.
            */}
			{/*
            <div>
                <h1 className="text-2xl font-bold">{quizQuestions[0].title}</h1>
                <p className="text-muted-foreground mt-1">
                    {quizQuestions[0].description}
                </p>
            </div>
            */}
			<div className="space-y-6 flex-grow">
				{' '}
				{/* flex-grow pushes submit to bottom */}
				{quizQuestions.map((q, idx) => (
					<QuizQuestion
						key={q.id} // Use question ID as key
						index={idx + 1}
						question={q}
						selectedOptionIds={userAnswers[q.id] || []} // Pass selected IDs for this question
						onOptionChange={handleOptionChange} // Pass the handler down
					/>
				))}
			</div>
			{explanations.length > 0 && (
				<div className="mt-8">
					<ExplanationsList explanations={explanations} />
				</div>
			)}
			{/* Submit button */}
			{quizQuestions.length > 0 && (
				<div className="mt-6 sticky bottom-0 bg-white pb-2 pt-2 border-t">
					{' '}
					{/* Make sticky */}
					{submissionSuccess ? (
						<div className="text-center text-green-600 font-semibold">
							Квиз успешно отправлен!
						</div>
					) : (
						<Button
							onClick={handleSubmit}
							disabled={!canSubmit} // Disable if submitting or no questions
							className="w-full">
							{isSubmitting ? 'Отправка...' : 'Отправить Квиз'}
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
