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
exports.HackathonService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const scrapper_utils_1 = require("../utils/scrapper.utils");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
let HackathonService = class HackathonService {
    constructor(hackathonModel) {
        this.hackathonModel = hackathonModel;
    }
    async getHackathon() {
        const data = await this.hackathonModel.find();
        return data;
    }
    async postHackathon() {
        const hackathon = await (0, scrapper_utils_1.devPostScrapper)();
        hackathon.map(async (data) => {
            await new this.hackathonModel(data).save();
        });
        return {
            success: true,
            description: 'Hackathons added successfully',
            data: hackathon,
        };
    }
    async scarpHackathons() {
        await this.hackathonModel.deleteMany({});
        const hackathon = await (0, scrapper_utils_1.devPostScrapper)();
        hackathon.map(async (data) => {
            await new this.hackathonModel(data).save();
        });
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HackathonService.prototype, "scarpHackathons", null);
HackathonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Hackathon')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], HackathonService);
exports.HackathonService = HackathonService;
//# sourceMappingURL=hackathon.service.js.map