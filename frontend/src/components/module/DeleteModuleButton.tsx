// components/module/delete-module-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Use useRouter for refreshing
import { useState } from 'react';

interface DeleteButtonProps {
	moduleId: string;
}

export function DeleteModuleButton({ moduleId }: DeleteButtonProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleDelete = async () => {
		setIsLoading(true);
		// Use environment variable for API base URL
		const apiUrl =
			process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050';

		try {
			const res = await fetch(`${apiUrl}/modules/${moduleId}`, {
				method: 'DELETE',
				// Add headers if required (e.g., Authorization - though often not for simple deletes)
				// headers: { 'Authorization': `Bearer ${getTokenFromLocalStorageOrCookie()}` } // Client-side token access differs
				// For this example, assuming endpoint doesn't require auth or handles it differently
			});

			if (res.ok) {
				// Invalidate the cache for the current route segment
				// and trigger a re-fetch of data by the Server Component
				router.refresh();
				// Optionally show a success message (e.g., toast)
			} else {
				// Handle API error (e.g., show error message)
				const errorData = await res
					.json()
					.catch(() => ({ message: 'Unknown error' }));
				console.error(
					`Error deleting module ${moduleId}: ${res.status} - ${errorData.message}`
				);
				alert(`Ошибка при удалении модуля: ${errorData.message}`); // Simple alert for demo
			}
		} catch (error) {
			// Handle network error
			console.error('Network error during module deletion:', error);
			alert('Произошла ошибка сети при удалении модуля.'); // Simple alert for demo
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant="destructive"
			size="sm"
			onClick={handleDelete}
			disabled={isLoading}>
			{isLoading ? 'Удаление...' : 'Удалить'}
		</Button>
	);
}
