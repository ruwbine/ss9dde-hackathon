// QuizGeneratorDialog.tsx
'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { QuizView } from './QuizView';
import { toast } from 'sonner';
import { GeneratedQuizResponse, SubmissionPayload } from '@/types/types,';

type QuestionType = 'single' | 'multiple' | 'true_false';

export function QuizGeneratorDialog() {
	const [open, setOpen] = useState(false);
	const [textForQuiz, setTextForQuiz] = useState('');
	const [questionType, setQuestionType] = useState<QuestionType>('single');
	// Store the full generated response, including quizId and questions
	const [generatedData, setGeneratedData] =
		useState<GeneratedQuizResponse | null>(null);
	const [loading, setLoading] = useState(false);

	const handleGenerate = async () => {
		if (!textForQuiz.trim()) {
			toast.error('Введите тему или учебный текст');
			return;
		}

		setLoading(true);
		setGeneratedData(null); // Clear previous quiz
		try {
			const res = await fetch(
				'http://localhost:3050/ai-gemini/generate',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						QuestionType: questionType, // Ensure this matches backend expected payload
						textForQuiz: textForQuiz, // Ensure this matches backend expected payload
					}),
				}
			);

			if (!res.ok) {
				let errorMessage = 'Сервер вернул ошибку';
				try {
					const errorJson = await res.json();
					if (errorJson.message) {
						errorMessage = errorJson.message;
					}
				} catch (e) {
					// Ignore JSON parsing error if response wasn't JSON
				}
				throw new Error(errorMessage);
			}

			const data: GeneratedQuizResponse = await res.json();
			console.log('Generated Quiz Data:', data);

			// Validate the structure matches our expected GeneratedQuizResponse
			if (
				!data ||
				!data.quizId ||
				!Array.isArray(data.quizQuestions) ||
				data.quizQuestions.length === 0
			) {
				// Fallback: if quizId is missing but questions are there, use first question ID?
				// Or assume a backend issue if quizId isn't provided?
				// Let's assume quizId *must* be provided by the backend based on the submission URL.
				if (
					Array.isArray(data?.quizQuestions) &&
					data.quizQuestions.length > 0
				) {
					// We have questions but no quizId. This is problematic for submission.
					// Log a warning or error. For now, throw error as quizId is required for submit URL.
					console.warn(
						'Generated questions but missing quizId in response:',
						data
					);
				}
				throw new Error('Некорректный или неполный ответ от сервера');
			}

			setGeneratedData(data); // Store the full response
			toast.success('Квиз успешно сгенерирован!');
		} catch (error: any) {
			toast.error(
				'Ошибка генерации: ' + (error.message || 'Неизвестная ошибка')
			);
		} finally {
			setLoading(false);
		}
	};

	// Handle quiz submission received from QuizView
	const handleSubmitQuiz = async (payload: SubmissionPayload) => {
		if (!generatedData?.quizId) {
			// This case should ideally not happen if handleGenerate validates correctly,
			// but is a good safety check.
			console.error('Cannot submit: Quiz ID is missing.');
			toast.error('Ошибка отправки: ID квиза не найден.');
			throw new Error('Quiz ID is missing.'); // Throw to signal failure to QuizView
		}

		const submitUrl = `http://localhost:3050/ai-gemini/${generatedData.quizId}/submit`;
		console.log('Submitting quiz to:', submitUrl, 'with payload:', payload);

		try {
			const res = await fetch(submitUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				let errorMessage = 'Сервер вернул ошибку при отправке';
				try {
					const errorJson = await res.json();
					if (errorJson.message) {
						errorMessage = errorJson.message;
					}
				} catch (e) {
					// Ignore JSON parsing error
				}
				throw new Error(errorMessage);
			}

			const result = await res.json();
			console.log('Submission successful:', result);
			// Handle success, maybe show results or close dialog
			// For now, QuizView shows the success message via toast.
			// You might want to close the dialog or navigate here.
			// setOpen(false); // Example: Close dialog on success
		} catch (error: any) {
			console.error('Submission failed:', error);
			// QuizView already shows the toast error
			throw error; // Re-throw so QuizView can catch and handle its state
		}
	};

	const resetState = () => {
		setTextForQuiz('');
		setQuestionType('single');
		setGeneratedData(null); // Clear generated data on close/reset
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (!isOpen) resetState();
			}}>
			<DialogTrigger asChild>
				<Button variant="outline">Сгенерировать квиз</Button>
			</DialogTrigger>

			<DialogContent className="max-w-2xl flex flex-col h-[95vh]">
				{' '}
				{/* Use flex-col and height */}
				<DialogHeader className="flex-shrink-0">
					{' '}
					{/* Prevent header from shrinking */}
					<DialogTitle>Генерация квиза</DialogTitle>
				</DialogHeader>
				{!generatedData && (
					<div className="space-y-4 flex-shrink-0">
						{' '}
						{/* Prevent input area from shrinking */}
						<Input
							placeholder="Введите тему или текст"
							value={textForQuiz}
							onChange={(e) => setTextForQuiz(e.target.value)}
							disabled={loading}
						/>
						<Select
							value={questionType}
							onValueChange={(val) =>
								setQuestionType(val as QuestionType)
							}
							disabled={loading}>
							<SelectTrigger>
								<SelectValue placeholder="Тип вопроса" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="true_false">
									True / False
								</SelectItem>
								<SelectItem value="single">
									Один верный
								</SelectItem>
								<SelectItem value="multiple">
									Несколько верных
								</SelectItem>
							</SelectContent>
						</Select>
						<Button
							onClick={handleGenerate}
							disabled={loading}
							className="w-full">
							{loading ? 'Генерация...' : 'Сгенерировать'}
						</Button>
					</div>
				)}
				{generatedData && (
					<div className="mt-4 flex-grow flex flex-col overflow-hidden">
						{' '}
						{/* Allow QuizView to take space and scroll */}
						<QuizView
							quizId={generatedData.quizId} // Pass the quiz ID
							quizQuestions={generatedData.quizQuestions} // Pass the questions array
							explanations={generatedData.explanations}
							onSubmitQuiz={handleSubmitQuiz} // Pass the submission handler
						/>
						{/* Maybe move the "Generate another" button outside QuizView? */}
						{/* <Button className="mt-4 flex-shrink-0" variant="secondary" onClick={resetState}>
              Сгенерировать другой
            </Button> */}
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
