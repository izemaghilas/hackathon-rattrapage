import { IsDateString, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsDefined()
  teamName: string;

  @IsNotEmpty()
  @IsDefined()
  updatedAt: string;
}

export class UpdateTeamDto {
  @IsNotEmpty()
  @IsDefined()
  teamName: string;
}
