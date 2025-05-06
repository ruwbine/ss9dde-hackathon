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
					</>
				)}
			</main>
		</div>
	);
}
