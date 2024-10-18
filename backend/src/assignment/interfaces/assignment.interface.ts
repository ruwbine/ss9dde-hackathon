import {IModule} from "../../modules/interfaces/module.interface";

export class IAssignment {
    id: string;
    question: string;
    answerOptions: string[];
    correctAnswer: string;
    moduleId: string;
    module?: IModule;
    createdAt: Date;
    updatedAt: Date;
}