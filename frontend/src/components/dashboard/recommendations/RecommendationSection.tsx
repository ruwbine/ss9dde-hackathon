import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from '@/components/ui/card';
import { Recommendation } from '@/lib/dashboard/recommendations/recommendations.types';
import { Lightbulb } from 'lucide-react';

interface RecommendationsSectionProps {
	recommendations: Recommendation[];
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
	recommendations,
}) => {
	if (!recommendations || recommendations.length === 0) {
		return (
			<Card className="w-full mt-6">
				<CardHeader>
					<div className="flex items-center">
						<Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
						<CardTitle className="text-xl font-bold text-gray-800">
							Recommendations
						</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-gray-500 italic">
						No specific recommendations at this time. Keep up the
						good work!
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full mt-6">
			<CardHeader>
				<div className="flex items-center">
					<Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
					<CardTitle className="text-xl font-bold text-gray-800">
						Personalized Recommendations
					</CardTitle>
				</div>
				<CardDescription>
					Suggestions to help you improve and grow.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="space-y-4">
					{recommendations.map((rec, index) => (
						<li
							key={index}
							className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
							<h4 className="font-semibold text-md text-gray-700 mb-1">
								{rec.topic}
							</h4>
							<p className="text-sm text-gray-600">
								{rec.suggestion}
							</p>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};
