'use client';

import { useState } from 'react';
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

export function CreateCourseDialog({
	onCreated,
	token,
}: {
	onCreated?: () => void;
	token: string;
}) {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);

	const handleCreate = async () => {
		if (!title.trim() || !description.trim()) return;

		setLoading(true);
		try {
			const response = await fetch('http://localhost:3050/courses', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				credentials: 'include',
				body: JSON.stringify({ title, description }),
			});

			if (!response.ok) throw new Error('Ошибка создания курса');

			if (onCreated) onCreated();
			setTitle('');
			setDescription('');
			setOpen(false);
		} catch (e) {
			alert('Ошибка при создании курса');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="ml-auto">Создать курс</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Новый курс</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<Input
						placeholder="Название курса"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Textarea
						placeholder="Описание курса"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Button
						onClick={handleCreate}
						disabled={loading}
						className="w-full">
						{loading ? 'Создание...' : 'Создать'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
