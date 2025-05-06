import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	CheckCircle2,
	AlertTriangle,
	ArrowUpCircle,
	ArrowDownCircle,
	Zap,
} from 'lucide-react';
import { TopicCategory, TopicPill } from './TopicPill';
import { Topics } from '@/lib/dashboard/recommendations/recommendations.types';

interface TopicsSectionProps {
	topics: Topics;
}

const TopicCategoryDisplay: React.FC<{
	title: string;
	topics: string[];
	category: TopicCategory;
	icon: React.ReactNode;
}> = ({ title, topics, category, icon }) => {
	if (!topics || topics.length === 0) {
		return null; // Don't render the section if there are no topics for this category
	}

	return (
		<div className="mb-6">
			<div className="flex items-center mb-3">
				{icon}
				<h3 className="text-lg font-semibold text-gray-700">{title}</h3>
			</div>
			{topics.length > 0 ? (
				<div className="flex flex-wrap gap-2">
					{topics.map((topic) => (
						<TopicPill
							key={`${category}-${topic}`}
							topic={topic}
							category={category}
						/>
					))}
				</div>
			) : (
				<p className="text-sm text-gray-500 italic">
					No {category} topics identified.
				</p>
			)}
		</div>
	);
};

export const TopicsSection: React.FC<TopicsSectionProps> = ({ topics }) => {
	const categoryDetails: Array<{
		id: TopicCategory;
		title: string;
		icon: React.ReactNode;
		data: string[];
	}> = [
		{
			id: 'strong',
			title: 'Strong Topics',
			icon: <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />,
			data: topics.strong,
		},
		{
			id: 'weak',
			title: 'Weak Topics',
			icon: <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />,
			data: topics.weak,
		},
		{
			id: 'improving',
			title: 'Improving Topics',
			icon: <ArrowUpCircle className="w-5 h-5 mr-2 text-blue-500" />,
			data: topics.improving,
		},
		{
			id: 'declining',
			title: 'Declining Topics',
			icon: <ArrowDownCircle className="w-5 h-5 mr-2 text-yellow-500" />,
			data: topics.declining,
		},
	];

	// Filter out categories with no topics
	const activeCategories = categoryDetails.filter(
		(cat) => cat.data && cat.data.length > 0
	);

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center">
					<Zap className="w-6 h-6 mr-2 text-indigo-600" />
					<CardTitle className="text-xl font-bold text-gray-800">
						Your Skill Areas
					</CardTitle>
				</div>
				<CardDescription>
					Overview of your performance in different topics.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{activeCategories.length > 0 ? (
					activeCategories.map((cat) => (
						<TopicCategoryDisplay
							key={cat.id}
							title={cat.title}
							topics={cat.data}
							category={cat.id}
							icon={cat.icon}
						/>
					))
				) : (
					<p className="text-sm text-gray-500 italic text-center py-4">
						No topic data available to display.
					</p>
				)}
			</CardContent>
		</Card>
	);
};
