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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_utils_1 = require("../utils/auth.utils");
const decoding_utils_1 = require("../utils/decoding.utils");
const hashing_1 = require("../utils/hashing");
const jwt = require("jsonwebtoken");
const scrapper_utils_1 = require("../utils/scrapper.utils");
let StudentService = class StudentService {
    constructor(studentModel, skillModel) {
        this.studentModel = studentModel;
        this.skillModel = skillModel;
    }
    async SignUp(data) {
        const { password } = data, rest = __rest(data, ["password"]);
        const decodedPassword = (0, decoding_utils_1.decode)(password);
        const hashedPassword = (0, hashing_1.hashPassword)(decodedPassword);
        const userData = Object.assign(Object.assign({}, rest), { password: hashedPassword });
        const newUser = new this.studentModel(userData);
        await newUser.save();
        const token = (0, auth_utils_1.generateToken)(rest.email);
        const user = await this.studentModel
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
        const isVerified = await (0, hashing_1.verifyPassword)(data.email, data.password, this.studentModel);
        if (isVerified) {
            const token = (0, auth_utils_1.generateToken)(data.email);
            const user = await this.studentModel
                .findOne({ email: data.email })
                .populate({
                path: 'recommended_jobs',
                populate: {
                    path: 'posted_by',
                    select: 'company_name company_logo',
                },
                select: '_id title description ',
            })
                .select('-password -_skills_private')
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
        const { email, name } = data, rest = __rest(data, ["email", "name"]);
        const profile = data.profile;
        const skills = data.skills;
        let hackerrank = null;
        let leetcode = null;
        let Hackerrank = {
            badges: [],
            certificates: [],
        };
        let Leetcode = {};
        profile.forEach((link) => {
            if (link.match('hackerrank.com'))
                hackerrank = link;
            if (link.match('leetcode.com'))
                leetcode = link;
        });
        if (hackerrank != null) {
            Hackerrank = await (0, scrapper_utils_1.HackerrankScrapper)(hackerrank);
        }
        if (Leetcode != null) {
            Leetcode = await (0, scrapper_utils_1.LeetcodeScrapper)(leetcode);
        }
        const _newSkills = [];
        const _skills = skills.map((skill) => {
            _newSkills.push({
                skill: skill.skill.replace(/[.,-?;:!\s]/g, '').toLowerCase(),
            });
            return {
                skill: skill.skill.replace(/[.,-?;:!\s]/g, '').toLowerCase(),
                level: skill.level,
            };
        });
        _newSkills.forEach(async (skill) => {
            try {
                const data = new this.skillModel(skill);
                await data.save();
            }
            catch (_a) { }
        });
        const updatedData = Object.assign(Object.assign({}, rest), { is_steps_completed: true, hackerrank_data: Hackerrank, leetcode_data: Leetcode, _skills_private: _skills });
        const res = await this.studentModel.findOneAndUpdate({ email: email }, updatedData, { new: true });
        if (res === null)
            throw new common_1.NotFoundException();
        else {
            return res;
        }
    }
    async parser(data) {
        global.Publisher.publish('get-resume-from-node', JSON.stringify({
            filename: data.file_name,
            blob: data.data_url,
        }));
        let flag = false;
        let parseData = {};
        await sleep(15000);
        function sleep(ms) {
            return new Promise((resolve) => {
                global.Subscriber.on('message', (channel, message) => {
                    parseData = JSON.parse(message);
                    flag = true;
                    resolve(100);
                });
                setTimeout(resolve, ms);
            });
        }
        if (flag) {
            return {
                success: true,
                parse_data: parseData['parse_data'],
            };
        }
        else {
            throw new common_1.RequestTimeoutException();
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
                    const user = await this.studentModel
                        .findOne({ email: decoded.email })
                        .populate({
                        path: 'recommended_jobs',
                        populate: {
                            path: 'posted_by',
                            select: 'company_name company_logo',
                        },
                        select: '_id title description location is_closed',
                    })
                        .select('-password -_skills_private -device_id')
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
    async getAllStudents() {
        const students = await this.studentModel.find();
        return students;
    }
    async getStudentsById(id) {
        const students = await this.studentModel.findOne({ _id: id });
        return students;
    }
    async updateContactDetails(data) {
        const { _id } = data, rest = __rest(data, ["_id"]);
        const res = await this.studentModel.findOneAndUpdate({ _id: _id }, rest);
        if (res == null) {
            throw new common_1.NotFoundException();
        }
        return {
            success: true,
        };
    }
    async updateSkills(data) {
        const { _id, skills } = data;
        const _skills = skills.map((skill) => {
            return {
                skill: skill.skill.replace(/[.,-?;:!\s]/g, '').toLowerCase(),
                level: skill.level,
            };
        });
        const res = await this.studentModel.findByIdAndUpdate({ _id: _id }, { skills: skills, _skills_private: _skills });
        if (res == null) {
            throw new common_1.NotFoundException();
        }
        return {
            success: true,
        };
    }
    async updateEducation(data) {
        const { _id, education } = data;
        const res = await this.studentModel.findByIdAndUpdate({ _id: _id }, { education: education });
        if (res == null) {
            throw new common_1.NotFoundException();
        }
        return {
            success: true,
        };
    }
    async updateQuiz(data) {
        const { _id, quiz_data } = data;
        const res = await this.studentModel.findOneAndUpdate({ _id: _id }, {
            $push: {
                completed_quizzes: quiz_data,
            },
        });
        if (res == null) {
            throw new common_1.NotFoundException();
        }
        return {
            success: true,
        };
    }
    async getQuizData(id) {
        const res = await this.studentModel
            .findOne({ _id: id })
            .select('completed_quizzes');
        if (res === null) {
            throw new common_1.NotFoundException();
        }
        else {
            return res;
        }
    }
};
StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Student')),
    __param(1, (0, mongoose_1.InjectModel)('Skill')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map