import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuizDto {
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsArray()
  @IsNotEmpty()
  questionsAndAnswers;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
