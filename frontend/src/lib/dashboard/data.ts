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
  const mockUserData: QuizResult[] = [
    {
      "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
      "score": 4,
      "totalQuestions": 4,
      "percentage": 100,
      "completedAt": "2025-04-28T11:53:36.856Z",
      "quiz": {
        "id": "2e69dbb1-8bd2-4dc7-82cf-7cb7325761c9",
        "title": "Mental Health Awareness Quiz",
        "description": "Test your knowledge about mental health and well-being.",
        "isCompleted": true
      },
      "id": "08480651-f074-4299-8e1d-38556077db33"
    },
    {
        "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
        "score": 4,
        "totalQuestions": 4,
        "percentage": 100,
        "completedAt": "2025-04-28T11:53:36.856Z",
        "quiz": {
          "id": "2e69dbb1-8bd2-4dc7-82cf-7cb7325761c9",
          "title": "Mental Health Awareness Quiz",
          "description": "Test your knowledge about mental health and well-being.",
          "isCompleted": true
        },
        "id": "08480651-f074-4299-8e1d-38556077db33"
      },
      {
        "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
        "score": 4,
        "totalQuestions": 4,
        "percentage": 100,
        "completedAt": "2025-04-28T11:53:36.856Z",
        "quiz": {
          "id": "2e69dbb1-8bd2-4dc7-82cf-7cb7325761c9",
          "title": "Mental Health Awareness Quiz",
          "description": "Test your knowledge about mental health and well-being.",
          "isCompleted": true
        },
        "id": "08480651-f074-4299-8e1d-38556077db33"
      },
      {
        "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
        "score": 4,
        "totalQuestions": 4,
        "percentage": 100,
        "completedAt": "2025-04-28T11:53:36.856Z",
        "quiz": {
          "id": "2e69dbb1-8bd2-4dc7-82cf-7cb7325761c9",
          "title": "Mental Health Awareness Quiz",
          "description": "Test your knowledge about mental health and well-being.",
          "isCompleted": true
        },
        "id": "08480651-f074-4299-8e1d-38556077db33"
      },
    {
      "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
      "score": 3,
      "totalQuestions": 5,
      "percentage": 60,
      "completedAt": "2025-04-27T10:00:00.000Z",
      "quiz": {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "title": "Introduction to React Hooks",
        "description": "Learn the basics of useState and useEffect.",
        "isCompleted": true
      },
      "id": "1a2b3c4d-5e6f-7890-1234-567890abcdef"
    },
    {
      "userId": "ab55aa87-fe33-45ba-82e7-dd6adc74c7a1",
      "score": 7,
      "totalQuestions": 10,
      "percentage": 70,
      "completedAt": "2025-04-26T09:30:00.000Z",
      "quiz": {
        "id": "f0e1d2c3-b4a5-6789-0123-456789abcdef",
        "title": "CSS Flexbox Fundamentals",
        "description": "Master layout with Flexbox.",
        "isCompleted": true
      },
      "id": "abcdef01-2345-6789-abcd-ef0123456789"
    }
    // Add more mock data as needed
  ];
  
  // Simulate fetching data with a delay
  export async function fetchUserData(): Promise<QuizResult[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUserData);
      }, 500); // Simulate network delay of 500ms
    });
  }