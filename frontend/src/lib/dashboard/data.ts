// lib/data.ts

export interface QuizResult {
	userId: string;
	score: number;
	totalQuestions: number;
	percentage: number;
	completedAt: string; // ISO 8601 timestamp
	quiz: {
		id: string;
		title: string;
		description: string;
		isCompleted: boolean; // This seems redundant if it's in the result, but keeping for type safety
	};
	id: string; // QuizResult session ID
}

// Simulated backend data
// const mockUserData: QuizResult[] = [
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 4,
//     "totalQuestions": 4,
//     "percentage": 100,
//     "completedAt": "2025-04-28T11:53:36.856Z",
//     "quiz": {
//       "id": "2e69dbb1-8bd2-4dc7-82cf-7cb7325761c9",
//       "title": "Mental Health Awareness Quiz",
//       "description": "Test your knowledge about mental health and well-being.",
//       "isCompleted": true
//     },
//     "id": "completion-session-01"
//   },
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 3,
//     "totalQuestions": 4,
//     "percentage": 75,
//     "completedAt": "2025-04-27T14:00:00.000Z",
//     "quiz": {
//       "id": "2e69dbb1-8bd2-4dc7-82cf-7cb7325761c9",
//       "title": "Mental Health Awareness Quiz",
//       "description": "Test your knowledge about mental health and well-being.",
//       "isCompleted": true
//     },
//     "id": "completion-session-02"
//   },
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 5,
//     "totalQuestions": 5,
//     "percentage": 100,
//     "completedAt": "2025-04-27T10:30:00.000Z",
//     "quiz": {
//       "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
//       "title": "Introduction to React Hooks",
//       "description": "Learn the basics of useState and useEffect.",
//       "isCompleted": true
//     },
//     "id": "completion-session-03"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 4,
//     "totalQuestions": 5,
//     "percentage": 80,
//     "completedAt": "2025-04-26T16:15:00.000Z",
//     "quiz": {
//       "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
//       "title": "Introduction to React Hooks",
//       "description": "Learn the basics of useState and useEffect.",
//       "isCompleted": true
//     },
//     "id": "completion-session-04"
//   },
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 3,
//     "totalQuestions": 5,
//     "percentage": 60,
//     "completedAt": "2025-04-26T11:00:00.000Z",
//     "quiz": {
//       "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
//       "title": "Introduction to React Hooks",
//       "description": "Learn the basics of useState and useEffect.",
//       "isCompleted": true
//     },
//     "id": "completion-session-05"
//   },
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 10,
//     "totalQuestions": 10,
//     "percentage": 100,
//     "completedAt": "2025-04-25T09:30:00.000Z",
//     "quiz": {
//       "id": "f0e1d2c3-b4a5-6789-0123-456789abcdef",
//       "title": "CSS Flexbox Fundamentals",
//       "description": "Master layout with Flexbox.",
//       "isCompleted": true
//     },
//     "id": "completion-session-06"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 8,
//     "totalQuestions": 10,
//     "percentage": 80,
//     "completedAt": "2025-04-24T14:00:00.000Z",
//     "quiz": {
//       "id": "f0e1d2c3-b4a5-6789-0123-456789abcdef",
//       "title": "CSS Flexbox Fundamentals",
//       "description": "Master layout with Flexbox.",
//       "isCompleted": true
//     },
//     "id": "completion-session-07"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 6,
//     "totalQuestions": 10,
//     "percentage": 60,
//     "completedAt": "2025-04-24T10:00:00.000Z",
//     "quiz": {
//       "id": "f0e1d2c3-b4a5-6789-0123-456789abcdef",
//       "title": "CSS Flexbox Fundamentals",
//       "description": "Master layout with Flexbox.",
//       "isCompleted": true
//     },
//     "id": "completion-session-08"
//   },
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 8,
//     "totalQuestions": 8,
//     "percentage": 100,
//     "completedAt": "2025-04-23T15:30:00.000Z",
//     "quiz": {
//       "id": "quiz-javascript-async",
//       "title": "JavaScript Async/Await",
//       "description": "Understand asynchronous JavaScript patterns.",
//       "isCompleted": true
//     },
//     "id": "completion-session-09"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 6,
//     "totalQuestions": 8,
//     "percentage": 75,
//     "completedAt": "2025-04-23T11:00:00.000Z",
//     "quiz": {
//       "id": "quiz-javascript-async",
//       "title": "JavaScript Async/Await",
//       "description": "Understand asynchronous JavaScript patterns.",
//       "isCompleted": true
//     },
//     "id": "completion-session-10"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 5,
//     "totalQuestions": 8,
//     "percentage": 62.5,
//     "completedAt": "2025-04-22T17:00:00.000Z",
//     "quiz": {
//       "id": "quiz-javascript-async",
//       "title": "JavaScript Async/Await",
//       "description": "Understand asynchronous JavaScript patterns.",
//       "isCompleted": true
//     },
//     "id": "completion-session-11"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 12,
//     "totalQuestions": 12,
//     "percentage": 100,
//     "completedAt": "2025-04-22T13:30:00.000Z",
//     "quiz": {
//       "id": "quiz-rest-apis",
//       "title": "Understanding REST APIs",
//       "description": "Basics of designing and interacting with RESTful services.",
//       "isCompleted": true
//     },
//     "id": "completion-session-12"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 10,
//     "totalQuestions": 12,
//     "percentage": 83.33,
//     "completedAt": "2025-04-21T10:00:00.000Z",
//     "quiz": {
//       "id": "quiz-rest-apis",
//       "title": "Understanding REST APIs",
//       "description": "Basics of designing and interacting with RESTful services.",
//       "isCompleted": true
//     },
//     "id": "completion-session-13"
//   },
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 7,
//     "totalQuestions": 7,
//     "percentage": 100,
//     "completedAt": "2025-04-20T16:45:00.000Z",
//     "quiz": {
//       "id": "quiz-db-normalization",
//       "title": "Database Normalization Basics",
//       "description": "Learn about 1NF, 2NF, and 3NF.",
//       "isCompleted": true
//     },
//     "id": "completion-session-14"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 5,
//     "totalQuestions": 7,
//     "percentage": 71.43,
//     "completedAt": "2025-04-20T11:30:00.000Z",
//     "quiz": {
//       "id": "quiz-db-normalization",
//       "title": "Database Normalization Basics",
//       "description": "Learn about 1NF, 2NF, and 3NF.",
//       "isCompleted": true
//     },
//     "id": "completion-session-15"
//   },
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 15,
//     "totalQuestions": 15,
//     "percentage": 100,
//     "completedAt": "2025-04-19T14:00:00.000Z",
//     "quiz": {
//       "id": "quiz-algorithms-beginner",
//       "title": "Algorithms & Data Structures (Beginner)",
//       "description": "Introduction to basic algorithms and data structures.",
//       "isCompleted": true
//     },
//     "id": "completion-session-16"
//   },
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 12,
//     "totalQuestions": 15,
//     "percentage": 80,
//     "completedAt": "2025-04-18T10:00:00.000Z",
//     "quiz": {
//       "id": "quiz-algorithms-beginner",
//       "title": "Algorithms & Data Structures (Beginner)",
//       "description": "Introduction to basic algorithms and data structures.",
//       "isCompleted": true
//     },
//     "id": "completion-session-17"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 9,
//     "totalQuestions": 15,
//     "percentage": 60,
//     "completedAt": "2025-04-17T15:30:00.000Z",
//     "quiz": {
//       "id": "quiz-algorithms-beginner",
//       "title": "Algorithms & Data Structures (Beginner)",
//       "description": "Introduction to basic algorithms and data structures.",
//       "isCompleted": true
//     },
//     "id": "completion-session-18"
//   },
//   {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 6,
//     "totalQuestions": 6,
//     "percentage": 100,
//     "completedAt": "2025-04-16T11:00:00.000Z",
//     "quiz": {
//       "id": "quiz-cloud-intro",
//       "title": "Introduction to Cloud Computing",
//       "description": "Basics of cloud platforms and services.",
//       "isCompleted": true
//     },
//     "id": "completion-session-19"
//   },
//    {
//     "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
//     "score": 4,
//     "totalQuestions": 6,
//     "percentage": 66.67,
//     "completedAt": "2025-04-15T17:00:00.000Z",
//     "quiz": {
//       "id": "quiz-cloud-intro",
//       "title": "Introduction to Cloud Computing",
//       "description": "Basics of cloud platforms and services.",
//       "isCompleted": true
//     },
//     "id": "completion-session-20"
//   }
// ]

// Simulate fetching data with a delay
export async function fetchUserData(token): Promise<QuizResult[]> {
	try {
		const response = await fetch(
			`http://localhost:3050/scores/get_scores`,
			{
				// Assuming this is your submission endpoint
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					// Add any other headers like Authorization if needed
				},
			}
		);

		if (!response.ok) {
			const errorData = await response.text();
			console.error(
				`API Error fetching scores data`,
				response.status,
				errorData
			);
		}

		const server_response = await response.json();
		return server_response.data;
	} catch (error) {
		throw new Error(`Failed to fetch data: `, error);
	}
}

export async function getInsightData(token) {
	const response = await fetch(
		'http://localhost:3050/adaptive-learning/insights',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) {
		const errorData = await response.text();
		console.error(
			`API Error fetching scores insights`,
			response.status,
			errorData
		);
	}

	const server_response = await response.json();
	console.log(server_response.data[0]);
	return server_response.data;
}
