import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { CorporateModule } from './corporate/corporate.module';
import { JobModule } from './jobs/job.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkillsModule } from './skills/skills.module';
import { HackathonModule } from './hackathon/hackathon.module';

import { QuizModule } from './quiz/quiz.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://riyaz:popz@cluster0.ivmv0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    ScheduleModule.forRoot(),
    StudentModule,
    CorporateModule,
    JobModule,
    SkillsModule,
    HackathonModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
