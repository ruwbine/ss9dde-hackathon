import {IModule} from "../../modules/interfaces/module.interface";
import {IAssignmentQuestion} from "./assignment-question.interface";

export class IAssignment {
    id: string;
    questions: IAssignmentQuestion[]
    description: string;
    moduleId: string;
    module?: IModule;
    createdAt: Date;
    updatedAt: Date;
}