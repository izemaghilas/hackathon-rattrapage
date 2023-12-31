import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('quizByUser/:id')
  async findQuizUser(@Param('id') id: string) {
    return await this.quizService.findAllUserQuiz(id);
  }

  @Get()
  async findAll() {
    return await this.quizService.findAll();
  }

  @Post('createUserQuiz')
  async createUserQuiz(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.createUserQuiz(createQuizDto);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.quizService.findOne(id);
  }
}
