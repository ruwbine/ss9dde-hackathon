
export interface Explanation {
    term: string; 
    description: string; 
}
  
export interface TextResponse {
    explanations: Explanation[]; 
    quizQuestions: IQuiz[]; 
}



export interface IOption {        
    text: string;        
    isCorrect: boolean;  
  }
  
 
  export type QuestionType = 'single' | 'multiple' | 'true_false';

  export interface IQuestion {        
    text: string;
    type?:QuestionType;          
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
  