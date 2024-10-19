import { HttpException, Injectable } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { QuestionOption } from '../entities/request-quiz-options.entity';
import { Quiz } from '../entities/request-quiz.entity';
import { RequestSimolifiedEntity } from '../entities/request-simplified-text.entity';
import { Question } from '../entities/request-quiz-questions.entity';
import { ExplanationEntity } from '../entities/requests-explonation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResponseRepository {
  constructor(
    @InjectRepository(RequestSimolifiedEntity)
    private readonly requestSimplifiedRepository: Repository<RequestSimolifiedEntity>,

    @InjectRepository(ExplanationEntity)
    private readonly explanationRepository: Repository<ExplanationEntity>,

    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async saveResponseData(parsedResult: any) {
    const requestSimplifiedEntity = new RequestSimolifiedEntity();
    requestSimplifiedEntity.simplifiedText = parsedResult.simplifiedText;
    await this.requestSimplifiedRepository.save(requestSimplifiedEntity);

    const explanations = parsedResult.explanations.map((explanation: any) => {
      const explanationEntity = new ExplanationEntity();
      explanationEntity.term = explanation.term;
      explanationEntity.description = explanation.description;
      return explanationEntity;
    });
    await this.explanationRepository.save(explanations);

    const quizEntities = parsedResult.quizQuestions.map((quizQuestion: any) => {
      const quizEntity = new Quiz();
      quizEntity.title = quizQuestion.title;
      quizEntity.description = quizQuestion.description;
      quizEntity.isCompleted = quizQuestion.isCompleted;

      const questions = quizQuestion.questions.map((question: any) => {
        const questionEntity = new Question();
        questionEntity.text = question.text;

        const options = question.options.map((option: any) => {
          const optionEntity = new QuestionOption();
          optionEntity.text = option.text;
          optionEntity.isCorrect = option.isCorrect;
          return optionEntity;
        });

        questionEntity.options = options; 
        return questionEntity;
      });

      quizEntity.questions = questions;
      return quizEntity;
    });

    await this.quizRepository.save(quizEntities); 
}

}