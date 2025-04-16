import { QuizView } from "@/components/quiz/QuizView";

export default async function QuizPage() {
  const res = await fetch("http://localhost:3050/quizzes/1");
  const { quiz, explanations } = await res.json();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <QuizView quiz={quiz} explanations={explanations} />
    </div>
  );
}
