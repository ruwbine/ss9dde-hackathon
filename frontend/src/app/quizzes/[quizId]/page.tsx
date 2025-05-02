// app/quizzes/[quizId]/page.tsx

import { QuizViewer } from "@/components/quizzez/QuizViewer";
import { getQuizById, getQuizQuestions } from "@/lib/quizzez/quizzez.api";
import { notFound } from "next/navigation";
import { QuizResponseDto, QuestionResponseDto } from '@/types/quizzez/quizzez.types';


// Define props type for the page component
interface QuizPageProps {
    params: {
        quizId: string; // Corresponds to the folder name [quizId]
    };
}

export default async function SingleQuizPage({ params }: QuizPageProps) {
    const { quizId } = params; // Get quizId directly from params

    let quiz: QuizResponseDto | null = null;
    let questions: QuestionResponseDto[] | null = null;
    let error: string | null = null;

    try {
        // Fetch the specific quiz data based on the ID from the URL
        quiz = await getQuizById(quizId);
        // Fetch questions separately
        const questionsData = await getQuizQuestions(quizId);
        questions = questionsData.data; // Assuming the API returns { data: [...] } structure

    } catch (err: any) {
        console.error(`Error fetching quiz ${quizId}:`, err);
        // If fetch fails for reasons other than 404 (which getQuizById handles by returning null)
        error = `Failed to load quiz: ${err.message}`;
    }

    // If getQuizById returned null (e.g., 404 from API) or if fetch failed
    // Also check if questions were fetched successfully
    if (!quiz || !questions) {
         // Only trigger notFound if there's no explicit error message and data is missing
        if (!error) {
             notFound(); // Show Next.js's default not found page if no quiz/questions and no explicit error
        }
    }


    // Pass the fetched quiz data and questions array to the Client Component
    // Ensure both quiz and questions are not null before passing
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
                quiz && questions && <QuizViewer quiz={quiz} questions={questions} />
            )}
        </div>
    );
}

// Optional: Generate static params if using generateStaticParams
// import { getAllQuizzes } from '@/lib/api'; // Need the list function
// export async function generateStaticParams() {
//   const quizzes = await getAllQuizzes();
//   return quizzes.map((quiz) => ({
//     quizId: quiz.id,
//   }));
// }
