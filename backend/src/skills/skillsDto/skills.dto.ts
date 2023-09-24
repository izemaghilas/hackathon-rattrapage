import { IsNotEmpty, IsEnum, IsDefined, IsInt } from 'class-validator';
import { SkillType } from '@prisma/client';

export class CreateSkillDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsInt()
  @IsNotEmpty()
  level: number;

  @IsNotEmpty()
  @IsEnum(SkillType)
  type: SkillType;
}
