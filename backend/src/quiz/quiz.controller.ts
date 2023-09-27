import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Post('createUserQuiz')
  createUserQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createUserQuiz(createQuizDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }
}
