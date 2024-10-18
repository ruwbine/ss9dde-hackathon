export interface TextRequest {
    originalText: string; 
}

export interface Explanation {
    term: string; 
    description: string; 
}
  
export interface TextResponse {
    simplifiedText: string; 
    explanations: Explanation[]; 
    quizQuestions: string[]; 
}
  