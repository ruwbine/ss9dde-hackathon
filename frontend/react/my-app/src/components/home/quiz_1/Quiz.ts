// src/types/QuizTypes.ts

export interface Option {
    text: string;
    isCorrect: boolean;
  }
  
  export interface Question {
    text: string;
    options: Option[];
  }
  
  export interface Quiz {
    title: string;
    description: string;
    questions: Question[];
  }
  
  export interface QuizResponse {
    simplifiedText: string;
    explanations: Array<{ term: string; description: string }>;
    quizQuestions: Quiz[];
  }
  