import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  async getResponseDataById(id: string): Promise<any> {
    try {
      console.log(`Fetching RequestSimolifiedEntity with ID: ${id}...`);
      
      const requestSimplified = await this.requestSimplifiedRepository.findOne({
        where: { id },
      });
  
      if (!requestSimplified) {
        console.log('No RequestSimolifiedEntity found');
        throw new HttpException('Simplified text not found', HttpStatus.NOT_FOUND);
      }
  
      console.log('Fetching explanations...');
      const explanations = await this.explanationRepository.find();
  
      console.log('Fetching quizzes...');
      const quizzes = await this.quizRepository.find({
        relations: ['questions', 'questions.options'],
      });
  
      console.log('Data fetched successfully');
  
      const simplifiedText = `## Simplified Text:\n\n${requestSimplified.simplifiedText}`;
  
      const explanationResponse = explanations.map((explanation) => ({
        term: explanation.term,
        description: explanation.description,
      }));
  
      const quizQuestions = quizzes.map((quiz) => ({
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions.map((question) => ({
          text: question.text,
          options: question.options.map((option) => ({
            text: option.text,
            isCorrect: option.isCorrect,
          })),
        })),
        isCompleted: quiz.isCompleted,
      }));
  
      return {
        message: 'Request processed and result generated.',
        response: {
          simplifiedText,
          explanations: explanationResponse,
          quizQuestions: quizQuestions,
        },
      };
  
    } catch (error) {
      console.error('Error in getResponseData:', error);
      throw new HttpException('Error fetching data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async getAllIds(): Promise<string[]> {
    try {
      const ids = await this.requestSimplifiedRepository.find({
        select: ['id'], // Only select the ID field
      });

      return ids.map((item) => item.id);
    } catch (error) {
      throw new HttpException('Error fetching IDs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


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