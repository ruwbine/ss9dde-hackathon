import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateModuleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsUUID()
    @IsNotEmpty()
    courseId: string;
}
