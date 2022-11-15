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
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const job_service_1 = require("./job.service");
const job_dto_1 = require("./dto/job.dto");
let JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    getalljobs() {
        return this.jobService.getAllJobs();
    }
    getJobsCount(_id) {
        return this.jobService.getTotalJobs(_id);
    }
    getJobByCategory(params) {
        return this.jobService.getJobByCategory(params);
    }
    getJobByCompany(params) {
        return this.jobService.getJobByCompany(params);
    }
    getJobById(params) {
        return this.jobService.getJobsById(params);
    }
    getJobByIdStats(params) {
        return this.jobService.getJobByIdForStats(params);
    }
    getJobByFilter(params) {
        return this.jobService.filter(params.name, params.location);
    }
    createJob(data) {
        return this.jobService.createJob(data);
    }
    updateJob(data) {
        return this.jobService.updateJob(data);
    }
    addCandidatate(data) {
        return this.jobService.addCandidate(data);
    }
};
__decorate([
    (0, common_1.Get)('/getalljobs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getalljobs", null);
__decorate([
    (0, common_1.Get)('/jobs-count'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getJobsCount", null);
__decorate([
    (0, common_1.Get)('/getJobByCategory'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.CategoryJobDto]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getJobByCategory", null);
__decorate([
    (0, common_1.Get)('/filter-company'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getJobByCompany", null);
__decorate([
    (0, common_1.Get)('/getJobById'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getJobById", null);
__decorate([
    (0, common_1.Get)('/getJobByIdStats'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getJobByIdStats", null);
__decorate([
    (0, common_1.Get)('/filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getJobByFilter", null);
__decorate([
    (0, common_1.Post)('/createJob'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.JobDto]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Put)('/updateJob'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Put)('/add-candidate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.AddCandidateDto]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "addCandidatate", null);
JobController = __decorate([
    (0, common_1.Controller)('job'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map