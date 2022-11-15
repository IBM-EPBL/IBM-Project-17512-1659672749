import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from 'src/student/student.module';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizSchema } from './schema/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }]),
    StudentModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
