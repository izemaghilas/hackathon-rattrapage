import { ArrayNotEmpty, IsDefined, IsNotEmpty, IsUUID } from "class-validator";

export class CreateTrainingDto {
    @IsNotEmpty()
    @IsDefined()
    title: string;
  
    @IsNotEmpty()
    @IsDefined()
    description: string;
  
    @ArrayNotEmpty()
    skills: string[]

    @IsNotEmpty()
    @IsDefined()
    @IsUUID()
    userId: string;
}
