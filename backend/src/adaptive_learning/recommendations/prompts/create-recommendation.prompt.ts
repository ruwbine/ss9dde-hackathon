export const createRecommendationsPrompts = (tags: string[], schema: any) => `
Please generate an array of JSON objects. Each object in the array should represent a recommendation for a student's weak topic within an adaptive learning system.

You should process these tags: ${tags}. It's a user's weak topics. Ensure that you should motivate student and write less. So try to follow only 15 words in every suggestion.

Each object in the array should have two properties:

topic: A string representing the specific weak topic (e.g., "Algebraic Equations," "Literary Analysis," "Chemical Bonding").
suggestion: A string containing a targeted, actionable recommendation designed to help the student improve in that weak topic.
The output should be a JSON array of objects, strictly adhering to the following example format:
${schema}
`