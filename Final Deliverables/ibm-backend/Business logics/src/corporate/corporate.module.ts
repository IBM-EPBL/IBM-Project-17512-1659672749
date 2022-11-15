import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CorporateController } from './corporate.controller';
import { CorporateService } from './corporate.service';
import { CorporateSchema } from './schema/corporate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Corporate', schema: CorporateSchema }]),
  ],
  controllers: [CorporateController],
  providers: [CorporateService],
  exports: [
    MongooseModule.forFeature([{ name: 'Corporate', schema: CorporateSchema }]),
  ],
})
export class CorporateModule {}
