import {IsArray, IsBoolean, IsNotEmpty, IsString, IsUUID, ValidateNested} from "class-validator";
import {IAssignmentQuestion} from "../interfaces/assignment-question.interface";
import {IAssignment} from "../interfaces/assignment.interface";
import {Type} from "class-transformer";

export class CreateAssignmentDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => AssignmentQuestionClass)
    questions: IAssignmentQuestion[];

    @IsUUID()
    @IsNotEmpty()
    moduleId: string;
}

class AssignmentQuestionClass {
    @IsString()
    @IsNotEmpty()
    questionText: string;

    @IsString()
    @IsNotEmpty()
    correctAnswer: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AssignmentQuestionOptionClass) // Опции также валидируем как вложенные объекты
    options: AssignmentQuestionOptionClass[];
}

class AssignmentQuestionOptionClass {
    @IsString()
    @IsNotEmpty()
    optionText: string;

    @IsBoolean()
    @IsNotEmpty()
    isCorrect: boolean;
}
