import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Injectable()
export class TrainingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTrainingDto) {
    return this.prisma.training.create({ data: dto });
  }

  findAll() {
    return this.prisma.training.findMany({
      include: {
        user: true,
      },
    });
  }

  findByUserId(userId: string) {
    return this.prisma.training.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} training`;
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return `This action updates a #${id} training`;
  }

  remove(id: number) {
    return `This action removes a #${id} training`;
  }
}
