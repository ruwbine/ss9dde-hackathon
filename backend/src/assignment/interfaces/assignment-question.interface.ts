import {IAssignmentQuestionOption} from "./assignment-question-option.interface";

export interface IAssignmentQuestion {
    id: string;
    questionText: string;
    correctAnswer: string;
    options: IAssignmentQuestionOption[];
}