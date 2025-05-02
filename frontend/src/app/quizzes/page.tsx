// app/quizzes/page.tsx

import { QuizCard } from '@/components/quizzez/QuizCard';
import { getAllQuizzes } from '@/lib/quizzez/quizzez.api';

export default async function QuizzesPage() {
	let quizzes = [] as any[]; // Initialize with empty array and use 'any' temporarily
	let error: string | null = null;

	try {
		// Data fetching happens on the server during the request
		quizzes = await getAllQuizzes();
	} catch (err: any) {
		console.error('Error loading quizzes:', err);
		error = `Failed to load quizzes. Please try again. Error: ${err.message}`;
	}

	console.log(quizzes);
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">All Quizzes</h1>

			{error && (
				<div className="text-red-500 text-center py-4">{error}</div>
			)}

			{!error && quizzes.length === 0 && (
				<div className="text-center text-gray-600 py-8">
					No quizzes found.
				</div>
			)}

			{/* Display quizzes in a grid */}
			{!error && quizzes.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{quizzes.map((quiz) => (
						// Use quiz.id as the unique key
						<QuizCard key={quiz.id} quiz={quiz} />
					))}
				</div>
			)}
		</div>
	);
}
