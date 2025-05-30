import { Sidebar } from '@/components/layout/sidebar';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const token = (await cookies().then((cookie) => cookie)).get(
		'access_token'
	);

	return (
		<html lang="ru">
			<body className="flex min-h-screen">
				{token && <Sidebar />}
				<main
					className={
						token ? 'flex-1 md:ml-64 p-6' : 'flex-1 md-64 p-6'
					}>
					{children}
				</main>
				{<Toaster richColors position="top-right" />}
			</body>
		</html>
	);
}
