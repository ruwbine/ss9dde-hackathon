import { cookies } from 'next/headers';

import { CourseCard } from '@/components/course/CourseCard';
import { CreateCourseDialog } from '@/components/course/CreateCourseDialog';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorMessage } from '@/components/ui/error-message';
import { fetchCourses } from '@/lib/api';

export default async function CoursesPage() {
	const token = (await cookies()).get('access_token')?.value;
	let courses = [];

	try {
		courses = await fetchCourses(token || '');
	} catch (error) {
		return (
			<div className="p-6">
				<ErrorMessage
					title="Ошибка загрузки курсов"
					description="Проверьте подключение или повторите позже."
				/>
			</div>
		);
	}

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Все курсы</h1>
				<CreateCourseDialog token={token as string} />
			</div>

			{courses.length === 0 ? (
				<EmptyState />
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{courses.map((course) => (
						<CourseCard key={course.id} course={course} />
					))}
				</div>
			)}
		</div>
	);
}
