"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModule = void 0;
const common_1 = require("@nestjs/common");
const job_controller_1 = require("./job.controller");
const job_service_1 = require("./job.service");
const mongoose_1 = require("@nestjs/mongoose");
const job_schema_1 = require("./schema/job.schema");
const skills_module_1 = require("../skills/skills.module");
const student_module_1 = require("../student/student.module");
const corporate_module_1 = require("../corporate/corporate.module");
let JobModule = class JobModule {
};
JobModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Job', schema: job_schema_1.JobSchema }]),
            skills_module_1.SkillsModule,
            student_module_1.StudentModule,
            corporate_module_1.CorporateModule,
        ],
        controllers: [job_controller_1.JobController],
        providers: [job_service_1.JobService],
    })
], JobModule);
exports.JobModule = JobModule;
//# sourceMappingURL=job.module.js.map