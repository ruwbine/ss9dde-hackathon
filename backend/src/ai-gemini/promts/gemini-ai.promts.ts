export function quizPromptTemplate(topic: string, type: 'single' | 'multiple' | 'true_false', moduleId: string) {
  return `
You are a quiz generator. Generate a JSON in the following format:
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

Quiz topic: "${topic}". Question type: **${type}**.

${
  type === 'multiple'
    ? 'Each question should have between two and four answer options, and **at least two must be correct**.'
    : type === 'single'
    ? 'Each question must have only one correct option.'
    : 'Each question is a statement, and the correct answer must be either true or false.'
}
`;
}
