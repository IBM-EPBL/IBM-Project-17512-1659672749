"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let QuizService = class QuizService {
    constructor(quizModel, studentModel) {
        this.quizModel = quizModel;
        this.studentModel = studentModel;
    }
    async createQuiz(data) {
        const res = await this.quizModel.create(data);
        return res;
    }
    async getQuizByTopic(topic, id) {
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
                throw new common_1.NotFoundException();
            }
            return quizzes;
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async validateAnswers(answers) {
        const _questions = [];
        let Score = 0;
        answers.forEach((quiz) => {
            _questions.push(quiz.question);
        });
        const correct_answers = (await this.quizModel
            .find({ question: _questions })
            .select('-_id answer question'));
        correct_answers.forEach(({ answer, question }) => {
            const value = answers.filter((val) => val.question === question);
            if (value.length === 1 && answer === value[0].answer) {
                Score++;
            }
        });
        return {
            success: true,
            score: Score,
        };
    }
};
QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Quiz')),
    __param(1, (0, mongoose_1.InjectModel)('Student')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map