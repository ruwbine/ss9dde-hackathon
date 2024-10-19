import {IAssignmentQuestion} from "./assignment-question.interface";

export interface IAssignmentQuestionOption {
    id: string;
    optionText: string;
    isCorrect: boolean;
    question: IAssignmentQuestion;
}