// app/quizzes/loading.tsx

import { Skeleton } from '@/components/ui/skeleton'; // You might need to add Skeleton: npx shadcn-ui@latest add skeleton

export default function Loading() {
	// You can render a simple loading spinner or skeleton cards
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">All Quizzes</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map(
					(
						_,
						i // Render 6 skeleton cards as a placeholder
					) => (
						<Skeleton key={i} className="h-[200px] w-full" />
					)
				)}
			</div>
		</div>
	);
}
