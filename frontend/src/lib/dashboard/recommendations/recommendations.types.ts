export interface ScoreHistoryItem {
	quizId: string;
	score: number;
	total: number;
	percentage: number;
	date: string;
	tags: string[];
}

export interface Topics {
	strong: string[];
	weak: string[];
	improving: string[];
	declining: string[];
}

export interface Recommendation {
	topic: string;
	suggestion: string;
}

export interface InsightData {
	summary: string;
	topics: Topics;
	scoreHistory: ScoreHistoryItem[];
	recommendations: Recommendation[];
	nextStep: string;
}
