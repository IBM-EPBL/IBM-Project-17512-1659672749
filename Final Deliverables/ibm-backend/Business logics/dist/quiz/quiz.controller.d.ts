/// <reference types="mongoose" />
import { CreateDto } from './dto/quiz.dto';
import { QuizService } from './quiz.service';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    create(data: CreateDto[]): Promise<(import("mongoose").Document<unknown, any, import("./interfaces/quiz.interface").QuizModel> & import("./interfaces/quiz.interface").QuizModel & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getQuiz(topic: any, id: string): Promise<any[]>;
    getValidation(data: any): Promise<{
        success: boolean;
        score: number;
    }>;
}
