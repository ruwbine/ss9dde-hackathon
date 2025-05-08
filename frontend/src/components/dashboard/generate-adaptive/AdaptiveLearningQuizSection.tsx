'use client'; // Make this a client component

import { QuizData } from '@/lib/dashboard/recommendations/recommendations.api';
import React from 'react';
import { AdaptiveQuizButton } from './AdaptiveQuizButton';

interface AdaptiveLearningQuizSectionProps {
	moduleId: string | null | undefined; // Can be null or undefined if not available
	token: any;
}

export const AdaptiveLearningQuizSection: React.FC<
	AdaptiveLearningQuizSectionProps
> = ({ moduleId, token }) => {
	const handleQuizSuccess = (generatedQuizData: QuizData) => {
		console.log('Quiz generated successfully! Data:', generatedQuizData);
		if (
			generatedQuizData.quizQuestions &&
			generatedQuizData.quizQuestions.length > 0
		) {
			const quizTitle = generatedQuizData.quizQuestions[0].title;
			// alert(`Quiz "${quizTitle}" created! Check console for details.`);
			// Potentially navigate to the quiz or update UI
			// e.g., router.push(`/quiz/${generatedQuizData.quizQuestions[0].id}`); // Assuming quiz has an ID
		} else {
			// alert("Quiz generated, but it seems empty. Check console.");
		}
	};

	const handleQuizError = (error: Error) => {
		console.error('Failed to generate quiz:', error.message);
		// alert(`Error generating quiz: ${error.message}`);
	};

	return (
		<section className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
			<h2 className="text-xl font-semibold text-gray-700 mb-3">
				Adaptive Learning Quiz
			</h2>
			<p className="text-gray-600 mb-5 text-sm md:text-base">
				Generate a personalized quiz for module:{' '}
				<code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-700 text-xs">
					{moduleId || 'N/A'}
				</code>
				.
			</p>

			{moduleId ? (
				<AdaptiveQuizButton
					moduleId={moduleId}
					token={token}
					onQuizGenerated={handleQuizSuccess}
					onError={handleQuizError}
				/>
			) : (
				<div className="p-4 text-center text-red-500 bg-red-50 border border-red-200 rounded-md">
					Cannot generate quiz: Module ID is missing.
				</div>
			)}
		</section>
	);
};
