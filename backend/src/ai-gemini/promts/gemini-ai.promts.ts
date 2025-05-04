export function quizPromptTemplate(topic: string, type: 'single' | 'multiple' | 'true_false', moduleId: string) {
  return `
  You are a quiz generator. Strictly output a valid JSON ONLY — no extra text.
  
  Format:
  {
    "quiz": {
      "title": "string",
      "description": "string",
      "moduleId": "${moduleId}",
      "questions": [
        {
          "text": "string",
          "type": "${type}",
          "options": [
            { "text": "string", "isCorrect": true/false }
          ]
        }
      ]
    },
    "explanations": [
      { "term": "string", "description": "string" }
    ]
  }
  
  Quiz topic: "${topic}". Question type: "${type}".
  
  ${type === 'multiple'
    ? 'Each question should have 2-4 options, at least 2 correct.'
    : type === 'single'
    ? 'Each question should have only 1 correct option.'
    : 'Each question is a true/false statement.'
  }
  `;
}  