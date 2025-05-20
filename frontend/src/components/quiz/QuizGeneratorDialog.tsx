/* eslint-disable @typescript-eslint/no-explicit-any */
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

type QuestionType = 'single' | 'multiple' | 'true_false';

export function QuizGeneratorDialog() {
	const [open, setOpen] = useState(false);
	const [textForQuiz, setTextForQuiz] = useState('');
	const [questionType, setQuestionType] = useState<QuestionType>('single');
	const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const handleGenerate = async () => {
		if (!textForQuiz.trim()) {
			toast.error('Введите тему или учебный текст');
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(
				'http://localhost:3050/ai-gemini/generate',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						QuestionType: questionType,
						textForQuiz: textForQuiz,
						moduleId: 'efb7ae9e-2e03-4135-8ded-7dcc320358e4',
					}),
				}
			);

			if (!res.ok) {
				throw new Error('Сервер вернул ошибку');
			}

			const response = await res.json();
			console.log(response);
			const data = response.data[0];
			console.log(data);

			if (
				!data.quizQuestions[0] ||
				!data.quizQuestions[0].questions?.length
			) {
				throw new Error('Некорректный ответ от сервера');
			}

			setGeneratedQuiz(data);
			toast.success('Квиз успешно сгенерирован!');
		} catch (error: any) {
			toast.error(
				'Ошибка генерации: ' + (error.message || 'Неизвестная ошибка')
			);
		} finally {
			setLoading(false);
		}
	};

	const resetState = () => {
		setTextForQuiz('');
		setQuestionType('single');
		setGeneratedQuiz(null);
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

			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Генерация квиза</DialogTitle>
				</DialogHeader>

				{!generatedQuiz && (
					<div className="space-y-4">
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

				{generatedQuiz && (
					<div className="mt-4">
						<QuizView
							quizQuestions={generatedQuiz.quizQuestions}
							explanations={generatedQuiz.explanations}
						/>
						<Button
							className="mt-4"
							variant="secondary"
							onClick={resetState}>
							Сгенерировать другой
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
