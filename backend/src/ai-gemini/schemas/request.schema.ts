import { z } from 'zod';

export const ExplonationSchema = z.object({
  term: z.string().min(1),
  description: z.string().min(1),
});

export const RequestSchema = z.object({
  explanations: z.array(ExplonationSchema).min(2),
  quizQuestions: z.array(z.string()),
});

export const OptionSchema = z.object({
  text: z.string().min(1),
  isCorrect: z.boolean(),
});

export const QuestionSchema = z.object({
  text: z.string().min(1),
  type: z.enum(['single', 'multiple', 'true_false']),
  options: z.array(OptionSchema).min(2),
});

export const QuizSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  moduleId: z.string().uuid().optional(),
  questions: z.array(QuestionSchema).min(1),
});

export const QuizDataSchema = z.object({
  quiz: QuizSchema,
  explanations: z.array(ExplonationSchema).optional(),
});
