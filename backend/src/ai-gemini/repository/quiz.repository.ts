import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizTagEntity } from "src/ai-gemini/entities/tags.entity";
import { QuestionOption } from "src/ai-gemini/entities/request-quiz-options.entity";
import { Question } from "src/ai-gemini/entities/request-quiz-questions.entity";
import { Quiz } from "src/ai-gemini/entities/request-quiz.entity";
import { ExplanationEntity } from "src/ai-gemini/entities/requests-explonation.entity";
import { Explanation, IQuiz } from "src/ai-gemini/interfaces/request.interface";
import { ModuleEntity } from "src/modules/entities/module.entity";
import { Repository } from "typeorm";

@Injectable()
export class QuizDataService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizTagEntity)
    private tagRepository: Repository<QuizTagEntity>
  ) {}

  async saveQuizData(quizData: IQuiz, explanations: Explanation[], module: ModuleEntity): Promise<void> {
    console.log("Received quiz data:", quizData);  
  
    if (!quizData || !quizData.title || !quizData.description || !quizData.questions) {
      throw new Error("Invalid quiz data provided");
    }
  
    const quizEntity = new Quiz();
    quizEntity.title = quizData.title;
    quizEntity.description = quizData.description;
    quizEntity.isCompleted = false;
    quizEntity.module = module;
  
    if (!quizData.questions || quizData.questions.length === 0) {
      throw new Error("No questions provided in the quiz");
    }
  
    quizEntity.questions = quizData.questions.map((q) => {
      const questionEntity = new Question();
      questionEntity.text = q.text;
      questionEntity.type = q.type ?? 'single';
      questionEntity.quiz = quizEntity;
  
      questionEntity.options = q.options.map((o) => {
        const optionEntity = new QuestionOption();
        optionEntity.text = o.text;
        optionEntity.isCorrect = o.isCorrect;
        return optionEntity;
      });
  
      return questionEntity;
    });
  
    const explanationEntities = explanations.map((explanation) => {
      const explanationEntity = new ExplanationEntity();
      explanationEntity.term = explanation.term;
      explanationEntity.description = explanation.description;
      explanationEntity.quiz = quizEntity;
      return explanationEntity;
    });
  
    quizEntity.explanations = explanationEntities;
  
    const savedQuiz = await this.quizRepository.save(quizEntity);
  
    const uniqueTerms = [...new Set(explanations.map(e => e.term))];
    const tagEntities = uniqueTerms.map(term => {
      const tag = new QuizTagEntity();
      tag.tag = term;
      tag.quiz = savedQuiz;
      return tag;
    });
  
    await this.tagRepository.save(tagEntities);
  }
  

  }

