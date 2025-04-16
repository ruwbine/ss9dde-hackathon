import { QuizOption as QuizOptionType } from "./QuizView";
import { QuizOption } from "./QuizOption";

interface Props {
  index: number;
  question: {
    text: string;
    type: "single" | "multiple" | "true_false";
    options: QuizOptionType[];
  };
}

export function QuizQuestion({ question, index }: Props) {
  return (
    <div className="border p-4 rounded-md space-y-3">
      <p className="font-medium">
        {index}. {question.text}
      </p>

      <div className="space-y-2">
        {question.options.map((opt, idx) => (
          <QuizOption
            key={idx}
            text={opt.text}
            type={question.type}
            name={`q_${index}`}
          />
        ))}
      </div>
    </div>
  );
}
