import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDto } from './dto/quiz.dto';
import { QuizModel } from './interfaces/quiz.interface';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel('Quiz') private readonly quizModel: Model<QuizModel>,
    @InjectModel('Student') private readonly studentModel: Model<any>,
  ) {}

  async createQuiz(data: CreateDto[]) {
    const res = await this.quizModel.create(data);
    return res;
  }

  async getQuizByTopic(topic: string, id: string) {
    const res = await this.studentModel.findOne({
      $and: [{ _id: id }, { 'completed_quizzes.topic': topic }],
    });

    if (res === null) {
      const quizzes = await this.quizModel
        .aggregate()
        .project({
          topic: 1,
          type: 1,
          question: 1,
          options: 1,
          language: 1,
        })
        .match({ topic: topic })
        .sample(10);
      if (quizzes.length === 0) {
        throw new NotFoundException();
      }
      return quizzes;
    } else {
      throw new NotFoundException();
    }
  }

  async validateAnswers(answers: any[]) {
    const _questions = [];
    let Score = 0;
    answers.forEach((quiz: any) => {
      _questions.push(quiz.question);
    });
    const correct_answers = (await this.quizModel
      .find({ question: _questions })
      .select('-_id answer question')) as [];
    correct_answers.forEach(
      ({ answer, question }: { answer: string; question: string }) => {
        const value = answers.filter((val: any) => val.question === question);
        if (value.length === 1 && answer === value[0].answer) {
          Score++;
        }
      },
    );
    return {
      success: true,
      score: Score,
    };
  }
}
