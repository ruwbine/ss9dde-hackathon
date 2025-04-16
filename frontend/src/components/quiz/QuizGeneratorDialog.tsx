'use client';

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { QuizView } from "./QuizView";

type QuestionType = "single" | "multiple" | "true_false";

export function QuizGeneratorDialog() {
  const [open, setOpen] = useState(false);
  const [textForQuiz, setTextForQuiz] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("single");
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3050/ai-gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          QuestionType: questionType,
          textForQuiz: textForQuiz,
        }),
      });

      const data = await res.json();
      setGeneratedQuiz(data);
    } catch (error) {
      console.error("Ошибка генерации:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Сгенерировать квиз</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Генерация квиза</DialogTitle>
        </DialogHeader>

        {!generatedQuiz && (
          <div className="space-y-4">
            <Input
              placeholder="Введите тему или учебный текст"
              value={textForQuiz}
              onChange={(e) => setTextForQuiz(e.target.value)}
              disabled={loading}
            />

            <Select value={questionType} onValueChange={(val) => setQuestionType(val as QuestionType)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип вопроса" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true_false">True / False</SelectItem>
                <SelectItem value="single">Один правильный</SelectItem>
                <SelectItem value="multiple">Несколько правильных</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? "Генерация..." : "Сгенерировать"}
            </Button>
          </div>
        )}

        {generatedQuiz && (
          <div className="mt-4">
            <QuizView quiz={generatedQuiz.quiz} explanations={generatedQuiz.explanations} />
            <Button className="mt-4" variant="secondary" onClick={() => setGeneratedQuiz(null)}>
              Сгенерировать другой
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
