import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Question {
  QuestionType: "true_false" | "single" | "multiple";
  textForQuiz: string;
}

export function QuizList({ questions }: { questions: Question[] }) {
  if (questions.length === 0) {
    return <p className="text-muted-foreground">Пока нет добавленных вопросов.</p>;
  }

  return (
    <div className="grid gap-4 mt-4">
      {questions.map((q, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Вопрос {index + 1} — {q.QuestionType}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{q.textForQuiz}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
