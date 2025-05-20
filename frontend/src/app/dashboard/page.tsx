// app/dashboard/page.tsx

import { Metadata } from 'next';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ScorePercentageChart } from '@/components/dashboard/ScorePercentageChart';
import {
	fetchUserData,
	getInsightData,
	QuizResult,
} from '@/lib/dashboard/data';
import { QuizCompletionTable } from '@/components/dashboard/QuizCompletionOverview';
import { getAuthToken } from '@/lib/modules/data';
import { SkillsInsightsDashboard } from '@/components/dashboard/recommendations/SkillsInsights';
import { AdaptiveLearningQuizSection } from '@/components/dashboard/generate-adaptive/AdaptiveLearningQuizSection';
import { QuizData } from '@/lib/dashboard/recommendations/recommendations.api';

export const metadata: Metadata = {
	title: 'Dashboard | Adaptive Learning Platform',
	description:
		'User dashboard showcasing learning progress and quiz results.',
};

// This is a Server Component by default in app directory
export default async function DashboardPage() {
	const token = await getAuthToken();
	let userData: QuizResult[] = [];
	let error: string | null = null;

	const insightsData = await getInsightData(token);
	try {
		// Fetch data directly in the server component
		const data = await fetchUserData(token);
		userData = data;
		// Sort data by completion date, most recent first, if not already sorted by backend
		userData.sort(
			(a, b) =>
				new Date(b.completedAt).getTime() -
				new Date(a.completedAt).getTime()
		);
	} catch (err) {
		console.error('Failed to fetch user data:', err);
		error = 'Failed to load dashboard data.';
		// In a real app, you might render a specific error component
	}

	const currentModuleId = 'efb7ae9e-2e03-4135-8ded-7dcc320358e4';
	// const currentModuleId = null; // Example for testing missing module ID

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
		<div className="flex min-h-screen w-full flex-col">
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<h1 className="text-3xl font-bold tracking-tight">
					Кабинет успеваемости студента
				</h1>

				{error ? (
					<div className="text-center text-red-500">{error}</div>
				) : (
					<>
						{/* Overview Section */}
						<DashboardOverview data={userData} />

						{/* Performance Chart Section */}
						<ScorePercentageChart results={userData} />

						{/* Recent Completions Table */}
						<QuizCompletionTable results={userData} />
						<SkillsInsightsDashboard
							insightData={insightsData[0]}
						/>
						<AdaptiveLearningQuizSection
							moduleId={currentModuleId}
							token={token}
						/>
					</>
				)}
			</main>
		</div>
	);
}
