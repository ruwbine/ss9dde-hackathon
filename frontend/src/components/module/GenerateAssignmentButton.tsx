// components/module/generate-assignment-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
// import { useRouter } from 'next/navigation'; // If generating assignment also requires a list refresh

interface GenerateAssignmentButtonProps {
	moduleId: string;
}

export function GenerateAssignmentButton({
	moduleId,
}: GenerateAssignmentButtonProps) {
	// const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleGenerate = async () => {
		setIsLoading(true);
		// Use environment variable for API base URL
		// Note: This fetch is on http://localhost:3000, potentially a separate service?
		// Ensure this URL is correct and accessible from the browser.
		const assignmentApiUrl =
			process.env.NEXT_PUBLIC_ASSIGNMENT_API_URL ||
			'http://localhost:3050';

		try {
			const res = await fetch(
				`${assignmentApiUrl}/modules/${moduleId}/generate-assignment`,
				{
					method: 'POST',
					// Add headers like Authorization if needed on the client-side fetch
				}
			);

			if (res.ok) {
				alert('Задание сгенерировано');
				// If generating an assignment adds it to a displayed list, uncomment router.refresh()
				// router.refresh();
			} else {
				const errorData = await res
					.json()
					.catch(() => ({ message: 'Unknown error' }));
				console.error(
					`Error generating assignment for module ${moduleId}: ${res.status} - ${errorData.message}`
				);
				alert(`Ошибка при генерации задания: ${errorData.message}`);
			}
		} catch (error) {
			console.error('Network error during assignment generation:', error);
			alert('Произошла ошибка сети при генерации задания.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button variant="outline" onClick={handleGenerate} disabled={isLoading}>
			{isLoading ? 'Генерация...' : 'Сгенерировать задание'}
		</Button>
	);
}
