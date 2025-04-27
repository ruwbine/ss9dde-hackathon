// ExplanationsList.tsx// Import the type

import { Explanation } from '@/types/types,';

export function ExplanationsList({
	explanations,
}: {
	explanations: Explanation[];
}) {
	return (
		<div className="mt-6 p-4 border border-dashed rounded-md bg-gray-50">
			<h3 className="font-semibold mb-2">Пояснения:</h3>
			<ul className="space-y-1 text-sm text-gray-700">
				{explanations.map((item, i) => (
					<li key={i}>
						{' '}
						{/* Using index as key is okay here if the list is static and won't be reordered */}
						<strong>{item.term}</strong>: {item.description}
					</li>
				))}
			</ul>
		</div>
	);
}
