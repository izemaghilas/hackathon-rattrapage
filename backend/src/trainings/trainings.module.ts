import { Module } from '@nestjs/common';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TrainingsController],
  providers: [TrainingsService, PrismaService],
})
export class TrainingsModule {}
