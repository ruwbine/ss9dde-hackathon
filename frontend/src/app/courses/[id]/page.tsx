import { cookies } from 'next/headers';
import { IModule } from '@/types/module';
import { CreateModuleDialog } from '@/components/module/CreateModuleDialog';
import { ModuleList } from '@/components/module/ModuleList';
import { QuizGeneratorDialog } from '@/components/quiz/QuizGeneratorDialog';

async function fetchModules(
	courseId: string,
	token: string
): Promise<IModule[]> {
	const res = await fetch(
		`http://localhost:3050/courses/${courseId}/modules`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			cache: 'no-store',
		}
	);

	if (!res.ok) return [];
	return res.json();
}

export default async function CourseDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const token = (await cookies()).get('access_token')?.value || '';
	const modules = await fetchModules(params.id, token);

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Модули курса</h1>
				<div className="flex gap-2">
					<QuizGeneratorDialog />
					<CreateModuleDialog courseId={params.id} />
				</div>
			</div>
			<ModuleList modules={modules} />
		</div>
	);
}
