// app/quizzes/[quizId]/page.tsx

// Adjust path

import { QuizViewer } from '@/components/quizzez/QuizViewer';
import { getQuizById, getQuizQuestions } from '@/lib/quizzez/quizzez.api';
import { notFound } from 'next/navigation'; // For handling 404

// Define props type for the page component
interface QuizPageProps {
	params: {
		quizId: string; // Corresponds to the folder name [quizId]
	};
}

export default async function SingleQuizPage({ params }: QuizPageProps) {
	const { quizId } = await params; // Get quizId directly from params

	let quiz = null;
	let questions = null;
	let error: string | null = null;

	try {
		// Fetch the specific quiz data based on the ID from the URL
		quiz = await getQuizById(quizId); 
		questions = await getQuizQuestions(quizId)// Ensure getQuizById returns QuizResponseDto | null
	} catch (err: any) {
		console.error(`Error fetching quiz ${quizId}:`, err);
		// If fetch fails for reasons other than 404 (which getQuizById handles by returning null)
		error = `Failed to load quiz: ${err.message}`;
	}

	// If getQuizById returned null (e.g., 404 from API) or if fetch failed
	if (!quiz && !error) {
		notFound(); // Show Next.js's default not found page if no quiz and no explicit error
	}

	// Pass the fetched quiz data to the Client Component
	return (
		<div className="container mx-auto py-8">
			{error ? (
				<div className="text-red-500 text-center py-8">
					<h1 className="text-3xl font-bold mb-4">
						Error Loading Quiz
					</h1>
					<p>{error}</p>
				</div>
			) : (
				// Ensure quiz is not null before passing it
				quiz && <QuizViewer quiz={quiz} questions={questions.data} />
			)}
		</div>
	);
}

// Optional: Generate static params if using generateStaticParams
// import { getAllQuizzes } from '@/lib/api'; // Need the list function
// export async function generateStaticParams() {
//   const quizzes = await getAllQuizzes();
//   return quizzes.map((quiz) => ({
//     quizId: quiz.id,
//   }));
// }
