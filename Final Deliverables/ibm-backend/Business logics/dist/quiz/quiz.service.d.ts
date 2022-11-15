import { Model } from 'mongoose';
import { CreateDto } from './dto/quiz.dto';
import { QuizModel } from './interfaces/quiz.interface';
export declare class QuizService {
    private readonly quizModel;
    private readonly studentModel;
    constructor(quizModel: Model<QuizModel>, studentModel: Model<any>);
    createQuiz(data: CreateDto[]): Promise<(import("mongoose").Document<unknown, any, QuizModel> & QuizModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getQuizByTopic(topic: string, id: string): Promise<any[]>;
    validateAnswers(answers: any[]): Promise<{
        success: boolean;
        score: number;
    }>;
}
