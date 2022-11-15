"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const student_module_1 = require("./student/student.module");
const corporate_module_1 = require("./corporate/corporate.module");
const job_module_1 = require("./jobs/job.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const skills_module_1 = require("./skills/skills.module");
const hackathon_module_1 = require("./hackathon/hackathon.module");
const quiz_module_1 = require("./quiz/quiz.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://riyaz:popz@cluster0.ivmv0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`),
            schedule_1.ScheduleModule.forRoot(),
            student_module_1.StudentModule,
            corporate_module_1.CorporateModule,
            job_module_1.JobModule,
            skills_module_1.SkillsModule,
            hackathon_module_1.HackathonModule,
            quiz_module_1.QuizModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map