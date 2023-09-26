import { Injectable } from '@nestjs/common';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.quiz.findMany({
      include: {
        questions: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.quiz.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: true,
      },
    });
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    const { quizId, userId, questionsAndAnswers } = updateQuizDto;

    for (const questionAndAnswer of questionsAndAnswers) {
      await this.prisma.question.updateMany({
        where: {
          quizId: questionAndAnswer.quizId,
        },
        data: {
          answer: questionAndAnswer.answer,
        },
      });
    }
  }
}
