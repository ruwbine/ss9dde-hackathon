import { Badge } from '@/components/ui/badge';
import { useMemo } from 'react';

export type TopicCategory = 'strong' | 'weak' | 'improving' | 'declining';

interface TopicPillProps {
	topic: string;
	category: TopicCategory;
}

export const TopicPill: React.FC<TopicPillProps> = ({ topic, category }) => {
	const categoryStyles = useMemo(() => {
		switch (category) {
			case 'strong':
				return 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200';
			case 'weak':
				return 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200';
			case 'improving':
				return 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200';
			case 'declining':
				return 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200';
			default:
				return 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200';
		}
	}, [category]);

	return (
		<Badge
			variant="outline"
			className={`px-3 py-1 text-sm rounded-full transition-colors duration-150 ${categoryStyles}`}>
			{topic}
		</Badge>
	);
};
