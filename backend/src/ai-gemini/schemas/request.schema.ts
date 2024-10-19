import { z } from 'zod';

export const ExplonationSchema = z.object({
  term: z.string().min(1),        
  description: z.string().min(1)   
});


export const RequestSchema = z.object({
  simplifiedText: z.string(),
  explanations: z.array(ExplonationSchema).min(2),
  quizQuestions: z.array(z.string()),
});


export const OptionSchema = z.object({          
  text: z.string().min(1),          
  isCorrect: z.boolean()            
});


export const QuestionSchema = z.object({        
  text: z.string().min(1),          
  options: z.array(OptionSchema).min(2) 
});


export const QuizSchema = z.object({         
  title: z.string().min(1),         
  description: z.string().min(1),   
  questions: z.array(QuestionSchema).min(1)  
});

export const QuizDataSchema = z.object({
  quiz: QuizSchema,                 
  explanations: z.array(ExplonationSchema).optional()  
});


const jsonData = {
};

try {
  QuizDataSchema.parse(jsonData);  
  console.log("Валидация прошла успешно");
} catch (e) {
  console.error(e.errors);  
}
