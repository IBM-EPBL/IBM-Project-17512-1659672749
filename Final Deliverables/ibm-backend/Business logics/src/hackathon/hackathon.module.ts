import { Module } from '@nestjs/common';
import { HackathonController } from './hackathon.controller';
import { HackathonService } from './hackathon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { hackathonSchema } from './schema/hackathon.schema';
@Module({
  imports: [
    HackathonModule,
    MongooseModule.forFeature([{ name: 'Hackathon', schema: hackathonSchema }]),
  ],
  controllers: [HackathonController],
  providers: [HackathonService],
})
export class HackathonModule {}
