import {IModule} from "../../modules/interfaces/module.interface";

export class IAssignment {
    id: string;
    question: string;
    answerOption: string[];
    correctAnswer: string;
    moduleId: string;
    module?: IModule;
    createdAt: Date;
    updatedAt: Date;
}