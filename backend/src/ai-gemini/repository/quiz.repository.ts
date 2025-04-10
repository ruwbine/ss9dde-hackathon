import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionOption } from "src/ai-gemini/entities/request-quiz-options.entity";
import { Question } from "src/ai-gemini/entities/request-quiz-questions.entity";
import { Quiz } from "src/ai-gemini/entities/request-quiz.entity";
import { ExplanationEntity } from "src/ai-gemini/entities/requests-explonation.entity";
import { Explanation, IQuiz } from "src/ai-gemini/interfaces/request.interface";
import { Repository } from "typeorm";

@Injectable()
export class QuizDataService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>
    
  ) {}

  async saveQuizData(quizData: IQuiz, explanations: Explanation[]): Promise<void> {
    const explanationsEntities = explanations.map(explanation => {
      const explanationEntity = new ExplanationEntity();
      explanationEntity.term = explanation.term;
      explanationEntity.description = explanation.description;
      return explanationEntity;
    });

    const quizEntity = new Quiz();
    quizEntity.title = quizData.title;
    quizEntity.description = quizData.description;
    quizEntity.isCompleted = false;
    quizEntity.explanations = explanationsEntities;

    quizEntity.questions = quizData.questions.map(q => {
      const questionEntity = new Question();
      questionEntity.text = q.text;
      questionEntity.quiz = quizEntity;

      questionEntity.options = q.options.map(o => {
        const optionEntity = new QuestionOption();
        optionEntity.text = o.text;
        optionEntity.isCorrect = o.isCorrect;
        return optionEntity;
      });

      return questionEntity;
    });

    await this.quizRepository.save(quizEntity);
  }
}
