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
exports.CorporateController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_utils_1 = require("../utils/auth.utils");
const corporate_service_1 = require("./corporate.service");
const corporate_dto_1 = require("./dto/corporate.dto");
let CorporateController = class CorporateController {
    constructor(service, corporateModel) {
        this.service = service;
        this.corporateModel = corporateModel;
    }
    isLogged(request) {
        return this.service.isLoggedIn(request);
    }
    Signup(data) {
        return this.service.SignUp(data);
    }
    async ProfileUpdate(request, data) {
        const isAuthorized = await (0, auth_utils_1.verifyRequest)(request, this.corporateModel);
        if (isAuthorized)
            return this.service.profileUpdate(data);
    }
    Login(params) {
        return this.service.login(params);
    }
    async update(request, data) {
        const isAuthorized = await (0, auth_utils_1.verifyRequest)(request, this.corporateModel);
        if (isAuthorized)
            return this.service.update(data);
    }
};
__decorate([
    (0, common_1.Get)('/is-logged'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CorporateController.prototype, "isLogged", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [corporate_dto_1.SignupDto]),
    __metadata("design:returntype", void 0)
], CorporateController.prototype, "Signup", null);
__decorate([
    (0, common_1.Put)('/profile-update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, corporate_dto_1.UpdateDto]),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "ProfileUpdate", null);
__decorate([
    (0, common_1.Get)('/login'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [corporate_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], CorporateController.prototype, "Login", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, corporate_dto_1.createCorporateDto]),
    __metadata("design:returntype", Promise)
], CorporateController.prototype, "update", null);
CorporateController = __decorate([
    (0, common_1.Controller)('corporate'),
    __param(1, (0, mongoose_1.InjectModel)('Corporate')),
    __metadata("design:paramtypes", [corporate_service_1.CorporateService,
        mongoose_2.Model])
], CorporateController);
exports.CorporateController = CorporateController;
//# sourceMappingURL=corporate.controller.js.map