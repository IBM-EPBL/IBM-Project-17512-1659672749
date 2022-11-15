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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackathonController = void 0;
const common_1 = require("@nestjs/common");
const hackathon_service_1 = require("./hackathon.service");
let HackathonController = class HackathonController {
    constructor(hackathonService) {
        this.hackathonService = hackathonService;
    }
    postHackathon() {
        return this.hackathonService.postHackathon();
    }
    getHackathon() {
        return this.hackathonService.getHackathon();
    }
};
__decorate([
    (0, common_1.Post)('/post-hackathon'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HackathonController.prototype, "postHackathon", null);
__decorate([
    (0, common_1.Get)('/get-hackathon'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HackathonController.prototype, "getHackathon", null);
HackathonController = __decorate([
    (0, common_1.Controller)('hackathon'),
    __metadata("design:paramtypes", [hackathon_service_1.HackathonService])
], HackathonController);
exports.HackathonController = HackathonController;
//# sourceMappingURL=hackathon.controller.js.map