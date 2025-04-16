import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizResult } from './entities/scores.entity';
import { Question } from './entities/request-quiz-questions.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Quiz } from './entities/request-quiz.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AiGeminiScoresService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @InjectRepository(QuizResult)
        private readonly quizResultRepository: Repository<QuizResult>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
    ) {}

    async calculateAndSaveScore(
        quizId: string,
        userId: string,
        answers: { questionId: string; selectedOptionId: string }[],
    ): Promise<QuizResult> {
        const questions = await this.questionRepository.find({
            where: { quiz: { id: quizId } },
            relations: ['options'],
        });

        let score = 0;

        questions.forEach((question) => {
            const userAnswer = answers.find((a) => a.questionId === question.id);
            if (userAnswer) {
                const correctOption = question.options.find((o) => o.isCorrect);
                if (correctOption && correctOption.id === userAnswer.selectedOptionId) {
                    score++;
                }
            }
        });

        const totalQuestions = questions.length;
        const percentage = (score / totalQuestions) * 100;

        const user = await this.userRepository.findOne({ where: { id: userId } });
        const quiz = await this.quizRepository.findOne({ where: { id: quizId } });

        const quizResult = this.quizResultRepository.create({
            user: user as UserEntity, 
            quiz: quiz as Quiz,       
            score,
            totalQuestions,
            percentage,
            completedAt: new Date(),
        });

        return this.quizResultRepository.save(quizResult);
    }
}
