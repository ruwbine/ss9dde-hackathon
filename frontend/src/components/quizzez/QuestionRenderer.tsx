// components/QuestionRenderer.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Adjust path
import { Checkbox } from '@/components/ui/checkbox'; // Adjust path
import { Label } from '@/components/ui/label'; // Adjust path
import {
	QuestionResponseDto,
	QuestionOptionDto,
} from '@/types/quizzez/quizzez.types';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface QuestionRendererProps {
	question: QuestionResponseDto;
	// State to track current selection for this question
	// For 'single'/'true_false', it's [optionId] or []
	// For 'multiple', it's [optionId, optionId, ...]
	selectedOptionIds: string[];
	// Callback function to update the state in the parent component
	onAnswerChange: (questionId: string, selectedIds: string[]) => void;
	// Optional: Flag to show correct/incorrect answers after submission/completion
	showResult?: boolean;
	// The correct answer option IDs for displaying results - Keep for potential future use or if backend provides them separately
	// correctOptionIds?: string[]; // Removed as the current rendering logic uses option.isCorrect
}

export function QuestionRenderer({
	question,
	selectedOptionIds,
	onAnswerChange,
	showResult = false,
}: // correctOptionIds = [], // Removed from props
QuestionRendererProps) {
	const handleRadioChange = (value: string) => {
		// For single/true_false, only one option can be selected
		// Only allow changes if not showing results
		if (!showResult) {
			onAnswerChange(question.id, [value]);
		}
	};

	const handleCheckboxChange = (optionId: string, checked: boolean) => {
		// Only allow changes if not showing results
		if (showResult) return;

		let newSelectedIds = [...selectedOptionIds];
		if (checked) {
			newSelectedIds.push(optionId);
		} else {
			newSelectedIds = newSelectedIds.filter((id) => id !== optionId);
		}
		onAnswerChange(question.id, newSelectedIds);
	};

	const isOptionSelected = (optionId: string) =>
		selectedOptionIds.includes(optionId);

	// This function is not used in the current render logic but can be kept if needed
	// const isOptionCorrect = (optionId: string) =>
	//     correctOptionIds.includes(optionId);

	// Helper to determine classes based on result state
	const getOptionClasses = (option: QuestionOptionDto) => {
		const classes = ['flex items-center space-x-2'];
		const isSelected = isOptionSelected(option.id);

		if (showResult) {
			// If showing results, mark correct answers
			if (isSelected) {
				// If showing results, mark selected but incorrect answers
				classes.push('text-blue-700 font-semibold');
				classes.push('bg-blue-100 p-2 rounded'); // Highlight selected and incorrect
			} else {
				// Default for options not selected and not correct when showing results
				classes.push('text-gray-700');
			}
		} else {
			// Default classes when not showing results
			classes.push('text-gray-700');
			if (isSelected) {
				classes.push('font-semibold'); // Maybe highlight selected option while taking quiz
			}
		}

		classes.push('transition-colors'); // Add transition for smoother hover/state changes

		return classes.join(' ');
	};

	return (
		<Card className="mb-6">
			<CardHeader>
				<CardTitle className="text-lg">{question.text}</CardTitle>
				<p className="text-sm text-gray-500 capitalize">
					{question.type.replace('_', ' ')} answer
				</p>
			</CardHeader>
			<CardContent>
				{question.type === 'single' ||
				question.type === 'true_false' ? (
					<RadioGroup
						value={selectedOptionIds[0] || ''} // RadioGroup expects a single string value
						onValueChange={handleRadioChange}
						className="space-y-3"
						disabled={showResult} // Disable input if showing results
					>
						{question.options.map((option) => (
							<div
								key={option.id}
								// Apply classes based on option state and showResult
								className={getOptionClasses(option)}>
								<RadioGroupItem
									value={option.id}
									id={`q${question.id}-opt${option.id}`}
								/>
								<Label
									htmlFor={`q${question.id}-opt${option.id}`}>
									{option.text}
								</Label>
							</div>
						))}
					</RadioGroup>
				) : (
					// type === 'multiple'
					<div className="space-y-3">
						{question.options.map((option) => (
							<div
								key={option.id}
								// Apply classes based on option state and showResult
								className={getOptionClasses(option)}>
								<Checkbox
									id={`q${question.id}-opt${option.id}`}
									checked={isOptionSelected(option.id)}
									onCheckedChange={(checked) =>
										handleCheckboxChange(
											option.id,
											!!checked
										)
									}
									disabled={showResult} // Disable input if showing results
								/>
								<Label
									htmlFor={`q${question.id}-opt${option.id}`}>
									{option.text}
								</Label>
							</div>
						))}
					</div>
				)}
				{/* Display correct answers block only if showResult is true and there are correct options */}
				{showResult &&
					question.options.some((opt) => opt.isCorrect) && (
						<div className="mt-4 p-3 bg-green-50 text-green-800 rounded border border-green-200">
							<p className="font-semibold">Correct Answer(s):</p>
							<ul>
								{question.options
									.filter((opt) => opt.isCorrect)
									.map((opt) => (
										<li
											key={opt.id}
											className="ml-4 list-disc">
											{opt.text}
										</li>
									))}
							</ul>
						</div>
					)}
			</CardContent>
		</Card>
	);
}
