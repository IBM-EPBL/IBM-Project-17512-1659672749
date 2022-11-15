import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateDto } from './dto/quiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/create')
  async create(@Body() data: CreateDto[]) {
    return this.quizService.createQuiz(data);
  }

  @Get('/get-quiz')
  getQuiz(@Query('topic') topic: any, @Query('id') id: string) {
    return this.quizService.getQuizByTopic(topic, id);
  }

  @Post('/validate-answers')
  getValidation(@Body() data) {
    return this.quizService.validateAnswers(data);
  }
}
