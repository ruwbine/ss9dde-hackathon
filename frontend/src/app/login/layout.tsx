export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body className="min-h-screen flex items-center justify-center bg-gray-100">
				{children}
			</body>
		</html>
	);
}
