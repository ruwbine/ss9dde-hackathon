// components/module/module-card.tsx
'use client'; // This component uses client-side interactivity (DeleteButton)

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { IModule } from '@/types/module'; // Import the type
import { DeleteModuleButton } from './DeleteModuleButton';

interface ModuleCardProps {
	// Use consistent naming for props interfaces
	module: IModule;
	// onDelete prop is removed here, as DeleteModuleButton handles the action
}

export function ModuleCard({ module }: ModuleCardProps) {
	return (
		<Card>
			<CardHeader className="flex justify-between items-center">
				{' '}
				{/* Added items-center for better alignment */}
				<CardTitle className="text-lg">{module.title}</CardTitle>{' '}
				{/* Adjust title size if needed */}
				{/* Render the Client Component DeleteButton */}
				<DeleteModuleButton moduleId={module.id} />
			</CardHeader>
			{/* Use markdown rendering if content can have markdown, otherwise whitespace is fine */}
			<CardContent className="whitespace-pre-wrap">
				{module.content}
			</CardContent>
		</Card>
	);
}
