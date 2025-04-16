export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl mt-4">Упс! Страница не найдена</p>
        <a
          href="/courses"
          className="mt-6 text-blue-500 underline hover:text-blue-700"
        >
          Вернуться на главную
        </a>
      </div>
    );
  }
  