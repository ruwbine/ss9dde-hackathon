import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizResult } from './entities/scores.entity';
import { Question } from './entities/request-quiz-questions.entity';
import { Quiz } from './entities/request-quiz.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AiGeminiScoresService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @InjectRepository(QuizResult)
        private readonly quizResultRepository: Repository<QuizResult>,
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
    ) {}

    async calculateAndSaveScore(
        quizId: string,
        userId: string,
        answers: {
            questionId: string;
            selectedOptionIds: string[]; 
        }[]
    ): Promise<QuizResult> {
        const questions = await this.questionRepository.find({
            where: { quiz: { id: quizId } },
            relations: ['options'],
        });
    
        if (!questions.length) {
            throw new Error('No questions found for the quiz');
        }
    
        let score = 0;
    
        for (const question of questions) {
            const userAnswer = answers.find((a) => a.questionId === question.id);
            if (!userAnswer) continue;
    
            const selectedOptionIds = userAnswer.selectedOptionIds.sort();
            const correctOptionIds = question.options
                .filter((o) => o.isCorrect)
                .map((o) => o.id)
                .sort();
    
            let isCorrect = false;
    
            switch (question.type) {
                case 'single':
                case 'true_false':
                    isCorrect =
                        correctOptionIds.length === 1 &&
                        selectedOptionIds.length === 1 &&
                        correctOptionIds[0] === selectedOptionIds[0];
                    break;
    
                case 'multiple':
                    isCorrect =
                        correctOptionIds.length === selectedOptionIds.length &&
                        correctOptionIds.every((id, idx) => id === selectedOptionIds[idx]);
                    break;
            }
    
            if (isCorrect) {
                score++;
            }
        }
    
        const totalQuestions = questions.length;
        const percentage = (score / totalQuestions) * 100;
    
        const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    
        if (!quiz) {
            throw new Error('Quiz not found');
        }
    
        quiz.isCompleted = true;
        await this.quizRepository.save(quiz);
    
        const quizResult = this.quizResultRepository.create({
            userId,
            quiz,
            score,
            totalQuestions,
            percentage,
            completedAt: new Date(),
        });
    
        return this.quizResultRepository.save(quizResult);
    }

    async getRecentResultsByUser(userId: string): Promise<QuizResult[]> {
        return this.quizResultRepository.find({
          where: { userId },
          order: { completedAt: 'DESC' },
          take: 10,
          relations: {
            quiz: {
              tags: true,
            },
          },
        });
      }
      
      async calculateDifficulty(results: QuizResult[]): Promise<"easy" | "medium" | "hard"> {
        if (results.length === 0) return 'easy';
    
        const avg = results.reduce((sum, r) => sum + (r.percentage || 0), 0) / results.length;
    
        if (avg >= 80) return 'hard';
        if (avg < 50) return 'easy';
        return 'medium';
      }

      async countCompletedResultsByUser(userId: string): Promise<number> {
        return this.quizResultRepository.count({
          where: { userId },
        });
      }
      

}    