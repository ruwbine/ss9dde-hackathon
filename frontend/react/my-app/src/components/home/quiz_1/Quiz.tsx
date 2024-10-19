// src/components/Quiz.tsx

import React, { useEffect, useState } from 'react';
import { QuizResponse, Question } from './Quiz';
import './Quiz.scss'; // Импортируем стили

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://localhost:3000')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: QuizResponse) => {
        const quiz = data.quizQuestions[0];
        setQuestions(quiz.questions);
        setLoading(false);
      })
      .catch((error) => {
        setError('Не удалось загрузить вопросы квиза');
        setLoading(false);
      });
  }, []);

  const handleOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      alert('Правильно!');
    } else {
      alert('Неправильно!');
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="quiz-container">
      <h1>Квиз</h1>
      {questions.map((question, index) => (
        <div key={index} className="quiz-question">
          <h2>{question.text}</h2>
          <div className="options">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option.isCorrect)}
                className="quiz-option-button"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
