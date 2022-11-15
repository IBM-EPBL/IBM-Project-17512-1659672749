import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hackathonScrapper, devPostScrapper } from 'src/utils/scrapper.utils';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class HackathonService {
  constructor(
    @InjectModel('Hackathon')
    private readonly hackathonModel: Model<any>,
  ) {}
  async getHackathon() {
    const data = await this.hackathonModel.find();
    return data;
  }
  async postHackathon() {
    const hackathon = await devPostScrapper();

    hackathon.map(async (data) => {
      await new this.hackathonModel(data).save();
    });
    return {
      success: true,
      description: 'Hackathons added successfully',
      data: hackathon,
    };
  }

  @Cron('0 0 0 * * *')
  async scarpHackathons() {
    await this.hackathonModel.deleteMany({});
    const hackathon = await devPostScrapper();

    hackathon.map(async (data) => {
      await new this.hackathonModel(data).save();
    });
  }
}
