'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type QuestionType = "true_false" | "single" | "multiple";

interface QuizFormProps {
  onSubmit: (data: { QuestionType: QuestionType; textForQuiz: string }) => void;
}

export function QuizQuestionForm({ onSubmit }: QuizFormProps) {
  const [questionText, setQuestionText] = useState("");
  const [type, setType] = useState<QuestionType>("true_false");

  const handleSubmit = () => {
    if (!questionText.trim()) return;
    onSubmit({ QuestionType: type, textForQuiz: questionText });
    setQuestionText("");
  };

  return (
    <div className="border rounded-md p-4 space-y-4 bg-gray-50">
      <Select value={type} onValueChange={(value: QuestionType) => setType(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Тип вопроса" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true_false">Правда / Ложь</SelectItem>
          <SelectItem value="single">Один верный</SelectItem>
          <SelectItem value="multiple">Несколько верных</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Введите текст вопроса..."
      />

      <Button onClick={handleSubmit}>Добавить вопрос</Button>
    </div>
  );
}
