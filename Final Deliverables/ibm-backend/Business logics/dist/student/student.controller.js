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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_utils_1 = require("../utils/auth.utils");
const student_service_1 = require("./student.service");
const student_dto_1 = require("./dto/student.dto");
let StudentController = class StudentController {
    constructor(service, studentModel) {
        this.service = service;
        this.studentModel = studentModel;
    }
    isLogged(request) {
        return this.service.isLoggedIn(request);
    }
    Signup(data) {
        return this.service.SignUp(data);
    }
    Login(params) {
        return this.service.login(params);
    }
    async update(request, data) {
        const isAuthorized = await (0, auth_utils_1.verifyRequest)(request, this.studentModel);
        if (isAuthorized)
            return this.service.update(data);
    }
    async updateContactDetails(data) {
        return this.service.updateContactDetails(data);
    }
    async updateSkills(data) {
        return this.service.updateSkills(data);
    }
    async updateEducation(data) {
        return this.service.updateEducation(data);
    }
    async parser(request, body) {
        const isAuthorized = await (0, auth_utils_1.verifyRequest)(request, this.studentModel);
        if (isAuthorized)
            return this.service.parser(body);
    }
    getQuizData(id) {
        return this.service.getQuizData(id);
    }
    updateQuiz(data) {
        return this.service.updateQuiz(data);
    }
    async getAllStudents() {
        const data = await this.service.getAllStudents();
        return data;
    }
    async getStudentsById(params) {
        const data = await this.service.getStudentsById(params);
        return data;
    }
};
__decorate([
    (0, common_1.Get)('/is-logged'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "isLogged", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.SignupDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "Signup", null);
__decorate([
    (0, common_1.Get)('/login'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "Login", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, student_dto_1.StudentDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/update-contact-details'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_dto_1.ContactDetailsDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateContactDetails", null);
__decorate([
    (0, common_1.Put)('/update-skills'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateSkills", null);
__decorate([
    (0, common_1.Put)('/update-education'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "updateEducation", null);
__decorate([
    (0, common_1.Post)('/resume-parser'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, student_dto_1.ParserDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "parser", null);
__decorate([
    (0, common_1.Get)('/quiz-data'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getQuizData", null);
__decorate([
    (0, common_1.Put)('/add-quiz-result'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "updateQuiz", null);
__decorate([
    (0, common_1.Get)('/get-all-students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getAllStudents", null);
__decorate([
    (0, common_1.Get)('/getStudentsById'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getStudentsById", null);
StudentController = __decorate([
    (0, common_1.Controller)('student'),
    __param(1, (0, mongoose_1.InjectModel)('Student')),
    __metadata("design:paramtypes", [student_service_1.StudentService,
        mongoose_2.Model])
], StudentController);
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map