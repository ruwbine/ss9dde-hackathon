import { IOption, IQuestion, IQuiz } from "../interfaces/request.interface";
import { z } from 'zod';
import { OptionSchema, QuestionSchema, QuizSchema } from "../schemas/request.schema";

type OptionType = z.infer<typeof OptionSchema>;
type QuestionType = z.infer<typeof QuestionSchema>;
type QuizType = z.infer<typeof QuizSchema>;



export function buildQuizFromData(quizData: QuizType, moduleId: string): IQuiz {
  return {
    title: quizData.title,
    description: quizData.description,
    isCompleted: false,
    module: moduleId,
    questions: quizData.questions.map(buildQuestion),
  };
}

export function buildQuestion(question: QuestionType): IQuestion {
  return {
    text: question.text,
    type: question.type ?? inferQuestionType(question.options),
    options: question.options.map(buildOption),
  };
}

export function buildOption(option: OptionType): IOption {
  return {
    text: option.text,
    isCorrect: option.isCorrect,
  };
}

export function inferQuestionType(options: OptionType[]): 'single' | 'multiple' | 'true_false' {
  const lowercasedOptions = options.map(o => o.text.toLowerCase());

  if (lowercasedOptions.includes('true') && lowercasedOptions.includes('false') && options.length === 2) {
    return 'true_false';
  }
  
  const correctCount = options.filter(o => o.isCorrect).length;
  return correctCount > 1 ? 'multiple' : 'single';
}
