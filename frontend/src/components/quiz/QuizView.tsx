import { QuizQuestion } from "./QuizQuestion";
import { ExplanationsList } from "./ExplanationsList";

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionData {
  text: string;
  type: "single" | "multiple" | "true_false";
  options: QuizOption[];
}

interface QuizData {
  title: string;
  description: string;
  questions: QuizQuestionData[];
}

interface Explanation {
  term: string;
  description: string;
}

interface Props {
  quizQuestions: QuizData;
  explanations: Explanation[];
}

export function QuizView({ quizQuestions, explanations }: Props) {
  

  return (
    <div className="max-h-[calc(100vh-40px)] overflow-y-auto px-2">
      <div>
        <h1 className="text-2xl font-bold">{quizQuestions[0].title}</h1>
        <p className="text-muted-foreground mt-1">{quizQuestions[0].description}</p>
      </div>

      <div className="space-y-6">
        {quizQuestions[0].questions.map((q, idx) => (
          <QuizQuestion key={idx} index={idx + 1} question={q} />
        ))}
      </div>

      {explanations.length > 0 && (
        <div className="mt-8">
          <ExplanationsList explanations={explanations} />
        </div>
      )}
    </div>
  );
}
