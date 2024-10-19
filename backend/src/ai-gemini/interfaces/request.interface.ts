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
    quizQuestions: IQuiz[]; 
}



export interface IOption {        
    text: string;        
    isCorrect: boolean;  
  }
  
 
  export interface IQuestion {        
    text: string;           
    options: IOption[];     
  }
  
  export interface IQuiz {           
    title: string;
    description: string;          
    questions: IQuestion[]; 
    isCompleted: boolean;
  }
  
  export interface IAnswer {
    questionId: string;      
    selectedOptionId: string;  
  }
  
  
  export interface IQuizSubmission {          
    userId: string;         
    quiz: IQuiz;             
    answers: IAnswer[];      
    correctCount: number;    
    incorrectCount: number;  
  }
  