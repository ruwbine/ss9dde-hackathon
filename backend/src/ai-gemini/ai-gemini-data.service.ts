import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Quiz } from './entities/request-quiz.entity';
import { Question } from './entities/request-quiz-questions.entity';
import { ExplanationEntity } from './entities/requests-explonation.entity';
import { QuestionOption } from './entities/request-quiz-options.entity';

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
      
      async getQuestions(quizId: string): Promise<Question[]> {
        return this.questionRepository.find({
          where: {
            quiz: { id: quizId },
          },
          relations: ['options'],
        });
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
      
}