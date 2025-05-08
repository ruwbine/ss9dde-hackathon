'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
	QuizData,
	QuestionType,
	GenerateQuizPayload,
	apiGenerateQuiz,
} from '@/lib/dashboard/recommendations/recommendations.api';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface AdaptiveQuizButtonProps {
	moduleId: string;
	onQuizGenerated: (quizData: QuizData) => void;
	onError: (error: Error) => void;
	defaultQuestionType?: QuestionType;
	token: any;
}

export const AdaptiveQuizButton: React.FC<AdaptiveQuizButtonProps> = ({
	moduleId,
	onQuizGenerated,
	token,
	onError,
	defaultQuestionType = 'single',
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [selectedQuestionType, setSelectedQuestionType] =
		useState<QuestionType>(defaultQuestionType);

	const handleGenerateQuiz = useCallback(async () => {
		if (!moduleId) {
			setError('Module ID is required to generate a quiz.');
			return;
		}
		if (!selectedQuestionType) {
			setError('Please select a question type.');
			return;
		}

		setIsLoading(true);
		setError(null);
		setSuccessMessage(null);

		const payload: GenerateQuizPayload = {
			moduleId,
			questionType: selectedQuestionType,
		};

		try {
			const response = await apiGenerateQuiz(payload, token);

			if (response.success && response.data && response.data.length > 0) {
				setSuccessMessage(
					response.data[0].quizQuestions[0]?.title
						? `Quiz "${response.data[0].quizQuestions[0].title}" generated!`
						: 'Quiz generated successfully!'
				);
				onQuizGenerated(response.data[0]);
				setTimeout(() => setSuccessMessage(null), 5000);
			} else {
				throw new Error(
					response.message ||
						'Quiz generation succeeded but no quiz data was returned.'
				);
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: 'An unknown error occurred.';
			setError(errorMessage);
			onError(new Error(errorMessage));
			setTimeout(() => setError(null), 7000);
		} finally {
			setIsLoading(false);
		}
	}, [moduleId, selectedQuestionType, onQuizGenerated, onError]);

	const questionTypeOptions: { value: QuestionType; label: string }[] = [
		{ value: 'single', label: 'Single Choice' },
		{ value: 'multiple', label: 'Multiple Choice' },
		{ value: 'true_false', label: 'True/False' },
	];

	return (
		<div className="flex flex-col items-start space-y-4 w-full">
			<div className="w-full space-y-2">
				<Label
					htmlFor="questionTypeSelect"
					className="text-sm font-medium text-gray-700">
					Question Type
				</Label>
				<Select
					value={selectedQuestionType}
					onValueChange={(value) =>
						setSelectedQuestionType(value as QuestionType)
					}
					disabled={isLoading}>
					<SelectTrigger id="questionTypeSelect" className="w-full">
						<SelectValue placeholder="Select question type" />
					</SelectTrigger>
					<SelectContent>
						{questionTypeOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Button
				onClick={handleGenerateQuiz}
				disabled={isLoading || !moduleId}
				className="w-full sm:w-auto px-6 py-3 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
				aria-label="Generate a new quiz with selected options">
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-5 w-5 animate-spin" />
						Generating Quiz...
					</>
				) : (
					'Generate New Quiz'
				)}
			</Button>

			{error && (
				<div className="mt-2 w-full flex items-center text-sm text-red-700 p-3 bg-red-50 border border-red-200 rounded-md">
					<AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
					{error}
				</div>
			)}

			{successMessage && (
				<div className="mt-2 w-full flex items-center text-sm text-green-700 p-3 bg-green-50 border border-green-200 rounded-md">
					<CheckCircle className="mr-2 h-5 w-5 flex-shrink-0" />
					{successMessage}
				</div>
			)}
		</div>
	);
};
