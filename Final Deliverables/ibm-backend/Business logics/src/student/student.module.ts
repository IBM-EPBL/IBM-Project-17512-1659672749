import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './schema/student.schema';
import { SkillsModule } from 'src/skills/skills.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    SkillsModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
})
export class StudentModule {}
