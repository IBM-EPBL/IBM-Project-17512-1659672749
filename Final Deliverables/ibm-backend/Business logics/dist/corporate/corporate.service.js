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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_utils_1 = require("../utils/auth.utils");
const decoding_utils_1 = require("../utils/decoding.utils");
const hashing_1 = require("../utils/hashing");
const jwt = require("jsonwebtoken");
let CorporateService = class CorporateService {
    constructor(corporateModel) {
        this.corporateModel = corporateModel;
    }
    async SignUp(data) {
        const { password } = data, rest = __rest(data, ["password"]);
        const decodedPassword = (0, decoding_utils_1.decode)(password);
        const hashedPassword = (0, hashing_1.hashPassword)(decodedPassword);
        const userData = Object.assign(Object.assign({}, rest), { password: hashedPassword });
        const newUser = new this.corporateModel(userData);
        await newUser.save();
        const token = (0, auth_utils_1.generateToken)(rest.email);
        const user = await this.corporateModel
            .findOne({ email: rest.email })
            .select('-password')
            .exec();
        return {
            success: true,
            token: token,
            data: user,
        };
    }
    async login(data) {
        const isVerified = await (0, hashing_1.verifyPassword)(data.email, data.password, this.corporateModel);
        if (isVerified) {
            const token = (0, auth_utils_1.generateToken)(data.email);
            const user = await this.corporateModel
                .findOne({ email: data.email })
                .select('-password')
                .exec();
            return {
                success: true,
                token: token,
                data: user,
            };
        }
        else {
            throw new common_1.ForbiddenException();
        }
    }
    async update(data) {
        const { email } = data, rest = __rest(data, ["email"]);
        const dataToUpdated = Object.assign(Object.assign({}, rest), { is_steps_completed: true });
        const res = await this.corporateModel
            .findOneAndUpdate({ email: email }, dataToUpdated, { new: true })
            .select('-password');
        if (res === null)
            throw new common_1.NotFoundException();
        else {
            return res;
        }
    }
    async isLoggedIn(request) {
        const auth = request.headers['authorization'];
        if (auth) {
            if (auth === 'Bearer null') {
            }
            else {
                const token = auth.split(' ')[1];
                try {
                    const decoded = jwt.verify(token, 'ajhasdhfjdafglkasfbsdjfd');
                    const user = await this.corporateModel
                        .findOne({ email: decoded.email })
                        .select('-password')
                        .exec();
                    if (user != null) {
                        return user;
                    }
                    else
                        throw new common_1.NotFoundException();
                }
                catch (err) {
                    throw new common_1.UnauthorizedException();
                }
            }
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async profileUpdate(data) {
        const { _id } = data, rest = __rest(data, ["_id"]);
        const res = await this.corporateModel.findOneAndUpdate({ _id: _id }, rest);
        if (res == null) {
            throw new common_1.NotFoundException();
        }
        return {
            success: true,
        };
    }
};
CorporateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Corporate')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CorporateService);
exports.CorporateService = CorporateService;
//# sourceMappingURL=corporate.service.js.map