import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsSchema } from './schema/Skills.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Skill', schema: SkillsSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'Skill', schema: SkillsSchema }]),
  ],
})
export class SkillsModule {}
