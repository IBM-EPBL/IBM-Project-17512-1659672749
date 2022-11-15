"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HackathonModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackathonModule = void 0;
const common_1 = require("@nestjs/common");
const hackathon_controller_1 = require("./hackathon.controller");
const hackathon_service_1 = require("./hackathon.service");
const mongoose_1 = require("@nestjs/mongoose");
const hackathon_schema_1 = require("./schema/hackathon.schema");
let HackathonModule = HackathonModule_1 = class HackathonModule {
};
HackathonModule = HackathonModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            HackathonModule_1,
            mongoose_1.MongooseModule.forFeature([{ name: 'Hackathon', schema: hackathon_schema_1.hackathonSchema }]),
        ],
        controllers: [hackathon_controller_1.HackathonController],
        providers: [hackathon_service_1.HackathonService],
    })
], HackathonModule);
exports.HackathonModule = HackathonModule;
//# sourceMappingURL=hackathon.module.js.map