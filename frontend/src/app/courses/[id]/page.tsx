// app/course/[id]/page.tsx
// This is the Server Component Page

import { CreateModuleDialog } from '@/components/module/CreateModuleDialog';
import { ModuleList } from '@/components/module/ModuleList';
import { QuizGeneratorDialog } from '@/components/quiz/QuizGeneratorDialog';
import { fetchModules, getAuthToken } from '@/lib/modules/data';

// This is a Server Component by default because it's async
export default async function CourseDetailPage({ params }) {
	// Type params correctly
	// params is already an object, no need to await it
	const token = await getAuthToken();
	const { id } = await params;

	// Fetch data on the server
	const modules = await fetchModules(id);
	console.log(modules);

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Модули курса</h1>
				<div className="flex gap-2">
					{/* Render Client Components directly */}
					{/* They handle their own state and interactions */}
					<QuizGeneratorDialog />
					<CreateModuleDialog courseId={id} token={token as string} />
				</div>
			</div>
			{/* Render the Server Component list, passing the fetched data */}
			{/* ModuleList component now correctly receives and maps the modules prop */}
			<ModuleList modules={modules} />
		</div>
	);
}
