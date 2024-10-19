import {IAssignment} from "../../interfaces/assignment.interface";
import {IAssignmentSubmissionAnswer} from "./assignment-submission-answer.interface";

export interface IAssignmentSubmission {
    id: string;
    userId: string;
    assignment: IAssignment;
    correctCount: number;
    incorrectCount: number;
    isCompleted: boolean;
    answers: IAssignmentSubmissionAnswer[];
}