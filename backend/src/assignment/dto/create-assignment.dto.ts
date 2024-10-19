import {IsArray, IsNotEmpty, IsString, IsUUID} from "class-validator";
import {IAssignmentQuestion} from "../interfaces/assignment-question.interface";

export class CreateAssignmentDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @IsNotEmpty({ each: true })
    questions: IAssignmentQuestion[];

    @IsUUID()
    @IsNotEmpty()
    moduleId: string;
}
