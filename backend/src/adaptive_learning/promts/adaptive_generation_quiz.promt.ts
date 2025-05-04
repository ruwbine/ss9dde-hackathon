export function quizAdaptivePromptTemplate(
  topicsByCategory: Record<'strong' | 'weak' | 'improving' | 'declining', string[]>,
  questionType: 'single' | 'multiple' | 'true_false',
  moduleId: string,
  difficulty: 'easy' | 'medium' | 'hard' // добавлен параметр сложности
): string {
  const allTopics = [
    ...topicsByCategory.strong,
    ...topicsByCategory.weak,
    ...topicsByCategory.improving,
    ...topicsByCategory.declining
  ].join(', ');

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
            "type": "${questionType}",
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

    Quiz topics: "${allTopics}". Question type: "${questionType}". Difficulty: "${difficulty}".

    ${questionType === 'multiple'
      ? 'Each question should have 2-4 options, at least 2 correct.'
      : questionType === 'single'
      ? 'Each question should have only 1 correct option.'
      : 'Each question is a true/false statement.'}

    Make the quiz "${difficulty}" in difficulty.
  `;
}




