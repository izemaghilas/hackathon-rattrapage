import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
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

  async findAllUserQuiz(userId: string) {
    return await this.prisma.userQuiz.findFirst({
      where: {
        userId: userId,
      },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                answer: true,
              },
            },
          },
        },
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

  async createUserQuiz(createQuizDto: CreateQuizDto) {
    const { quizId, userId, questionsAndAnswers } = createQuizDto;

    // Update user to quiz completed
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        quizCompleted: true,
      },
    });

    // Create user quiz
    const userQuiz = await this.prisma.userQuiz.create({
      data: {
        userId: userId,
        quiz: {
          connect: {
            id: quizId,
          },
        },
      },
      select: {
        id: true,
        quizId: true,
      },
    });

    // Create answers
    for (const questionAndAnswer of questionsAndAnswers) {
      await this.prisma.answer.create({
        data: {
          questionId: questionAndAnswer.questionId,
          answer: questionAndAnswer.answer,
          userId: userId,
        },
      });

      await this.prisma.userQuiz.update({
        where: {
          id: userQuiz.id,
        },
        data: {
          quiz: {
            update: {
              questions: {
                update: {
                  where: {
                    id: questionAndAnswer.questionId,
                  },
                  data: {
                    answer: {
                      create: {
                        answer: questionAndAnswer.answer,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
  }
}
