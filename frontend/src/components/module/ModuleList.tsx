// components/module/module-list.tsx// ModuleCard will be a Client Component
import { IModule } from '@/types/module';
import { ModuleCard } from './ModuleCard';

interface ModuleListProps {
	modules: IModule[]; // Correctly type the prop and expect the data
}

// This component remains a Server Component, it just renders the data
export function ModuleList({ modules }: ModuleListProps) {
	// Correctly check the length of the passed modules array
	if (!modules || modules.length === 0) {
		return <p className="text-muted-foreground">Пока нет модулей</p>;
	}

	return (
		<div className="grid gap-4">
			{/* Map over the actual modules data */}
			{modules.map((mod) => (
				// ModuleCard is a Client Component and will handle its own interactivity (like delete)
				<ModuleCard key={mod.id} module={mod} />
			))}
		</div>
	);
}
