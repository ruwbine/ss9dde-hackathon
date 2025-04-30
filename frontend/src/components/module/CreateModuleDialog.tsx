// components/module/create-module-dialog.tsx
'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for refreshing

interface CreateModuleDialogProps {
	courseId: string;
	token: string;
	// onCreated prop is removed, router.refresh() handles the update
}

export function CreateModuleDialog({
	courseId,
	token,
}: CreateModuleDialogProps) {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleCreate = async () => {
		if (!title.trim() || !content.trim()) {
			alert('Пожалуйста, заполните название и контент.');
			return;
		}

		setIsLoading(true);
		// Use environment variable for API base URL
		const apiUrl =
			process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050';

		try {
			const res = await fetch(`${apiUrl}/modules`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					// Client-side requires different auth approach (e.g., local storage token or httpOnly cookies handled by backend proxy)
					// For simplicity here, omitting auth header on client-side fetch, adjust as needed for your auth flow
				},
				body: JSON.stringify({ title, content, courseId }),
			});

			if (res.ok) {
				// Module created successfully
				// Invalidate the cache for the current route segment
				// and trigger a re-fetch of data by the Server Component
				router.refresh();

				// Close dialog and reset state
				setOpen(false);
				setTitle('');
				setContent('');
				// Optionally show a success message (e.g., toast)
			} else {
				// Handle API error
				const errorData = await res
					.json()
					.catch(() => ({ message: 'Unknown error' }));
				console.error(
					`Error creating module: ${res.status} - ${errorData.message}`
				);
				alert(`Ошибка при создании модуля: ${errorData.message}`); // Simple alert for demo
			}
		} catch (error) {
			// Handle network error
			console.error('Network error during module creation:', error);
			alert('Произошла ошибка сети при создании модуля.'); // Simple alert for demo
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Добавить модуль</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Новый модуль</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{' '}
					{/* Added padding and grid gap */}
					<Input
						placeholder="Название модуля"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						disabled={isLoading} // Disable input while loading
					/>
					<Textarea
						placeholder="Контент модуля"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						disabled={isLoading} // Disable textarea while loading
						rows={5} // Give textarea some default rows
					/>
				</div>
				<Button onClick={handleCreate} disabled={isLoading}>
					{isLoading ? 'Сохранение...' : 'Сохранить'}
				</Button>
			</DialogContent>
		</Dialog>
	);
}
