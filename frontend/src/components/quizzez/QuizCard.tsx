// components/QuizCard.tsx
'use client'; // This marks it as a Client Component

import Link from 'next/link';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'; // Adjust path if needed
import { QuizResponseDto } from '@/types/quizzez/quizzez.types';

interface QuizCardProps {
	quiz: QuizResponseDto;
}

export function QuizCard({ quiz }: QuizCardProps) {
	return (
		<Link href={`/quizzes/${quiz.id}`} passHref>
			{/* Use a div or other element that Link can wrap, and make it block/inline-block
          to fill its container. The Card itself can have interactive styles. */}
			<Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
				<CardHeader>
					<CardTitle>{quiz.title}</CardTitle>
					{/* Optional: Add a checkmark or similar for completed */}
					{quiz.isCompleted && (
						<span className="text-sm text-green-600 font-semibold mt-1">
							Completed!
						</span>
					)}
				</CardHeader>
				<CardContent className="flex-grow">
					{' '}
					{/* flex-grow makes content fill space */}
					<CardDescription className="text-gray-600 line-clamp-3">
						{quiz.description}
					</CardDescription>{' '}
					{/* line-clamp for description */}
				</CardContent>
				{/* Optional: Add footer or more details here */}
			</Card>
		</Link>
	);
}
