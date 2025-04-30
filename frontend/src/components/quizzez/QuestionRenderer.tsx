// components/QuestionRenderer.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Adjust path// Adjust path
import { Checkbox } from '@/components/ui/checkbox'; // Adjust path
import { Label } from '@/components/ui/label'; // Adjust path
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
	QuestionResponseDto,
	QuestionOptionDto,
} from '@/types/quizzez/quizzez.types';

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
	// Optional: The correct answer option IDs for displaying results
	correctOptionIds?: string[];
}

export function QuestionRenderer({
	question,
	selectedOptionIds,
	onAnswerChange,
	showResult = false,
	correctOptionIds = [], // Assuming correct answers are known or can be derived
}: QuestionRendererProps) {
	const handleRadioChange = (value: string) => {
		// For single/true_false, only one option can be selected
		onAnswerChange(question.id, [value]);
	};

	const handleCheckboxChange = (optionId: string, checked: boolean) => {
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

	const isOptionCorrect = (optionId: string) =>
		correctOptionIds.includes(optionId);

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
								key={option.text}
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
				{showResult && correctOptionIds.length > 0 && (
					<div className="mt-4 p-3 bg-green-50 text-green-800 rounded border border-green-200">
						<p className="font-semibold">Correct Answer(s):</p>
						<ul>
							{question.options
								.filter((opt) => opt.isCorrect)
								.map((opt) => (
									<li key={opt.id} className="ml-4 list-disc">
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
