import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { InsightData } from '@/lib/dashboard/recommendations/recommendations.types';
import { RecommendationsSection } from './RecommendationSection';
import { TopicsSection } from './TopicsSection';

interface SkillsInsightsDashboardProps {
	// Assuming the parent component fetches and passes the first item from the 'data' array.
	// Or, it could pass the whole API response and this component extracts data[0].
	// For this example, we'll assume `insightData` is `apiResponse.data[0]`.
	insightData: InsightData | null | undefined;
}

export const SkillsInsightsDashboard: React.FC<
	SkillsInsightsDashboardProps
> = ({ insightData }) => {
	if (!insightData) {
		return (
			<div className="p-4 text-center text-gray-500">
				Loading skills insights or no data available...
			</div>
		);
	}

	const { topics, recommendations, summary, nextStep } = insightData;

	console.log(insightData);
	return (
		<div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen">
			{/* Optional: Display the summary and next step if needed */}
			<Card className="w-full bg-white shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-indigo-700">
						Learning Insights
					</CardTitle>
					{summary && (
						<CardDescription className="text-md text-gray-600 pt-1">
							{summary}
						</CardDescription>
					)}
				</CardHeader>
				{nextStep && (
					<CardContent>
						<p className="text-sm text-indigo-600 bg-indigo-50 p-3 rounded-md border border-indigo-200">
							<strong>Next Step:</strong> {nextStep}
						</p>
					</CardContent>
				)}
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="lg:col-span-1">
					<TopicsSection topics={topics} />
				</div>
				<div className="lg:col-span-1">
					<RecommendationsSection recommendations={recommendations} />
				</div>
			</div>
		</div>
	);
};
