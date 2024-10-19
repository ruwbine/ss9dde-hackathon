// src/components/Quiz.tsx

import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  options: Option[];
}

const API_URL = 'https://localhost:3000/quiz';

const Quiz: React.FC = () => {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Ошибка при получении вопросов');
        }
        const data = await response.json();
        setQuizQuestions(data);
      } catch (error) {
        setError('Не удалось загрузить вопросы');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].options.find(opt => opt.isCorrect)?.text) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinishQuiz = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].options.find(opt => opt.isCorrect)?.text) {
      setScore(score + 1);
    }
    setQuizCompleted(true);
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <Sidebar />
 (
        <div style={styles.resultContainer}>
          <h2>Ваш результат: {score} из {quizQuestions.length}</h2>
          <button onClick={() => window.location.reload()}>Попробовать снова</button>
        </div>
      ) : 
        <div>
          <h2>{quizQuestions[currentQuestionIndex].text}</h2>
          <div style={styles.optionsContainer}>
            {quizQuestions[currentQuestionIndex].options.map((option) => (
              <button
                key={option.text}
                onClick={() => handleOptionClick(option.text)}
                style={{
                  ...styles.optionButton,
                  backgroundColor: selectedOption === option.text ? '#f0f8ff' : '#fff',
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div style={styles.buttonContainer}>
            {currentQuestionIndex < quizQuestions.length - 1 ? (
              <button onClick={handleNextQuestion} style={styles.nextButton} disabled={!selectedOption}>
                Следующий вопрос
              </button>
            ) : (
              <button onClick={handleFinishQuiz} style={styles.finishButton} disabled={!selectedOption}>
                Завершить квиз
              </button>
            )}
          </div>
        </div>
    </>
  );
};

const styles = {
  quizContainer: {
    backgroundColor: '#F0F8FF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  optionsContainer: {
    margin: '20px 0',
  },
  optionButton: {
    padding: '10px 15px',
    border: '1px solid #2f70ff',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
    transition: 'background-color 0.3s',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  nextButton: {
    backgroundColor: '#2f70ff',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  finishButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  resultContainer: {
    marginTop: '20px',
  },
};

export default Quiz;
