export const quizPromptTemplate = (topic: string) => `
Generate a quiz and explanations for the topic "${topic}".
Return a JSON object strictly matching the following TypeScript schema:

type QuizData = {
  quiz: {
    title: string;
    description: string;
    questions: {
      text: string;
      options: { text: string; isCorrect: boolean }[]; 
    }[];
  };
  explanations?: { 
    term: string;  // The term/keyword for the explanation
    description: string;  // The explanation of the term
  }[];
}

The questions must be based on the explanations and related to the topic. Provide at least 3 questions and at least 2 explanations, where each explanation should have a term and description that explains a concept related to the topic.

Respond ONLY with JSON and nothing else.
`;

