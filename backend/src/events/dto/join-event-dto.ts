import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class JoinEventDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  eventId: string;
}
