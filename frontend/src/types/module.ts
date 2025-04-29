export interface IModule {
	id: string;
	title: string;
	content: string;
	courseId: string;
	createdAt: string; // Date как string для fetch
	updatedAt: string;
}
