'use client';

import { useState } from "react";
import { QuizQuestionForm } from "./QuizQuestionForm";
import { QuizList } from "./QuizList";

interface Question {
  QuestionType: "true_false" | "single" | "multiple";
  textForQuiz: string;
}

export function QuizCreator() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (q: Question) => {
    setQuestions((prev) => [...prev, q]);
  };

  const handleSubmitTest = () => {
    // Здесь ты отправляешь весь тест на бэкенд
    console.log("Тест отправлен:", questions);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Создание теста</h2>
      <QuizQuestionForm onSubmit={addQuestion} />
      <QuizList questions={questions} />
      {questions.length > 0 && (
        <button
          onClick={handleSubmitTest}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Отправить тест
        </button>
      )}
    </div>
  );
}
