import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/request-quiz.entity';
import { Question } from './entities/request-quiz-questions.entity';
import { ExplanationEntity } from './entities/requests-explonation.entity';
import { QuestionOption } from './entities/request-quiz-options.entity';
import { PublicQuestionResponseDto } from './dto/public-option.dto';
import { QuizResult } from './entities/scores.entity';

@Injectable()
export class AiGeminiDataService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @InjectRepository(ExplanationEntity)
        private readonly explanationRepository : Repository<ExplanationEntity>,
        @InjectRepository(QuestionOption)
        private readonly questionOptionRepository: Repository<QuestionOption>,
        @InjectRepository(QuizResult)
        private readonly quizResultRepository: Repository<QuizResult>,
    ) {}

    async getAllQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find({ relations: ['questions', 'explanations'] });
    }

    async getQuizById(id: string): Promise<Quiz> {
        const quiz = await this.quizRepository.findOne({ where: { id }, relations: ['questions', 'explanations'] });
        if (!quiz) {
            throw new Error(`Quiz with id ${id} not found`);
        }
        return quiz;
    }


    async deleteQuiz(id: string): Promise<void> {
        const quiz = await this.quizRepository.findOne({
          where: { id },
          relations: ['questions', 'explanations'],
        });
      
        if (!quiz) {
          throw new NotFoundException(`Quiz with id ${id} not found`);
        }
      
        await this.questionRepository.remove(quiz.questions);
        await this.explanationRepository.remove(quiz.explanations);
        await this.quizRepository.remove(quiz);

      }

      async updateQuestion(
        questionId: string,
        updateData: {
          text?: string;
          type?: 'single' | 'multiple' | 'true_false';
          options?: {
            id?: string;
            text: string;
            isCorrect: boolean;
          }[];
        }
      ): Promise<Question> {
        const question = await this.questionRepository.findOne({
          where: { id: questionId },
          relations: ['options'],
        });
      
        if (!question) {
          throw new NotFoundException(`Question with id ${questionId} not found`);
        }
        if (updateData.text !== undefined) question.text = updateData.text;
        if (updateData.type !== undefined) question.type = updateData.type;
      
        if (updateData.options) {
          await this.questionOptionRepository.delete({ question: { id: question.id } });
      
          const newOptions = updateData.options.map(opt =>
            this.questionOptionRepository.create({
              text: opt.text,
              isCorrect: opt.isCorrect,
              question: question,
            })
          );
      
          question.options = await this.questionOptionRepository.save(newOptions);
        }
      
        return this.questionRepository.save(question);
      }
      
      async getQuizzesByModuleId(moduleId: string): Promise<Quiz[]> {
        return this.quizRepository.find({
          where: {
            module: { id: moduleId },
          },
          relations: ['module'],
        });
      }

       
      
      async getUserQuizResults(userId: string) {
        const results = await this.quizResultRepository.find({
          where: { userId },
          relations: ['quiz'], 
          order: { completedAt: 'DESC' }, 
        });
    
        return results.map((result) => ({
          ...result, 
          quiz: {
            ...result.quiz, 
            id: result.quiz.id,
            title: result.quiz.title,
            description: result.quiz.description,
            isCompleted: result.quiz.isCompleted,
          },
        }));
      }


      async getQuestions(quizId: string): Promise<PublicQuestionResponseDto[]> {
        const questions = await this.questionRepository
          .createQueryBuilder('question')
          .leftJoinAndSelect('question.options', 'option') 
          .where('question.quizId = :quizId', { quizId })
          .getMany();
      
        return this.mapQuestions(questions);
      }
      
      async mapQuestions(questions: any[]): Promise<PublicQuestionResponseDto[]> {
        return questions.map(question => ({
          id: question.id,
          text: question.text,
          type: question.type,
          options: question.options.map((option: { id: string; text: string;  }) => ({
            id: option.id,
            text: option.text,
          })),
        }));
      }
      

async getQuestionsByModuleId(moduleId: string): Promise<PublicQuestionResponseDto[]> {
  const quizzes = await this.getQuizzesByModuleId(moduleId);
  const allQuestions = await Promise.all(
    quizzes.map(quiz => this.getQuestions(quiz.id))
  );
  return allQuestions.flat();
}

async getQuizByTitle(title: string): Promise<Quiz> {
  const quiz = await this.quizRepository.findOne({
    where: { title },
    relations: ['questions', 'explanations', 'module', 'tags'],
  });

  if (!quiz) {
    throw new NotFoundException(`Quiz with title "${title}" not found`);
  }

  return quiz;
}

}