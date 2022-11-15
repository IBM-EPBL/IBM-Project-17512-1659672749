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
exports.JobService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("../utils/firebase-admin");
let JobService = class JobService {
    constructor(jobModel, skillModel, studentModel, corporateModel) {
        this.jobModel = jobModel;
        this.skillModel = skillModel;
        this.studentModel = studentModel;
        this.corporateModel = corporateModel;
    }
    async createJob(data) {
        const skills = await this.skillModel.find();
        const skillsDB = skills.map((skill) => skill.skill);
        const keyQualification = data.key_qualifiations.replace(/\n/g, ' ');
        const Discription = data.description.replace(/\n/g, ' ');
        const Additional = data.additional_requirements.replace(/\n/g, ' ');
        const _required_skills = [];
        const _required_skills_text = [];
        keyQualification.split(' ').forEach((word) => {
            const sanitizeWord = word.replace(/[.,-?;:!\s]/g, '').toLowerCase();
            if (/^[0-9a-zA-Z]+$/.test(sanitizeWord)) {
                const parsedSkills = skillsDB.filter((skill) => sanitizeWord === skill);
                parsedSkills.forEach((skill) => {
                    _required_skills.push(new RegExp(skill, 'i'));
                    _required_skills_text.push(skill);
                });
            }
        });
        Discription.split(' ').forEach((word) => {
            const sanitizeWord = word.replace(/[.,-?;:!\s]/g, '').toLowerCase();
            if (/^[0-9a-zA-Z]+$/.test(sanitizeWord)) {
                const parsedSkills = skillsDB.filter((skill) => sanitizeWord === skill);
                parsedSkills.forEach((skill) => {
                    _required_skills.push(new RegExp(skill, 'i'));
                    _required_skills_text.push(skill);
                });
            }
        });
        Additional.split(' ').forEach((word) => {
            const sanitizeWord = word.replace(/[.,-?;:!\s]/g, '').toLowerCase();
            if (/^[0-9a-zA-Z]+$/.test(sanitizeWord)) {
                const parsedSkills = skillsDB.filter((skill) => sanitizeWord === skill);
                parsedSkills.forEach((skill) => {
                    _required_skills.push(new RegExp(skill, 'i'));
                    _required_skills_text.push(skill);
                });
            }
        });
        const _required_skills_unique = [...new Set(_required_skills)];
        const _required_skills_text_unique = [...new Set(_required_skills_text)];
        const recomended_candidates = await this.studentModel
            .find({ '_skills_private.skill': { $in: _required_skills_unique } })
            .select('_id device_id');
        const recomended_candidates_id = recomended_candidates.map((student) => student._id);
        const deviceTokens = recomended_candidates.map((student) => student.device_id);
        const _id = new mongoose_1.Types.ObjectId();
        const InsertData = Object.assign(Object.assign({ _id }, data), { _required_skills: _required_skills_text_unique, recommended_candidates: recomended_candidates_id });
        const newJob = new this.jobModel(InsertData);
        await newJob.save();
        await this.studentModel.updateMany({ _id: recomended_candidates_id }, {
            $push: { recommended_jobs: _id },
        });
        (0, firebase_admin_1.sendNotification)(deviceTokens, `https://localhost:3000/jobs/${_id}`, `${data.title} job is posted now`);
        return {
            success: true,
            message: 'proceed to next step',
            data: newJob,
        };
    }
    async updateJob(data) {
        const { _id } = data, rest = __rest(data, ["_id"]);
        const res = await this.jobModel.findOneAndUpdate({ _id: _id }, rest);
        if (res == null)
            throw new common_1.NotFoundException();
        return {
            success: true,
        };
    }
    async getAllJobs() {
        const jobs = await this.jobModel.find().populate({
            path: 'posted_by',
            select: 'company_name company_address mobile_number company_website company_logo',
        });
        return jobs;
    }
    async getJobsById(id) {
        const data = await (await this.jobModel.findOne({ _id: id })).populate({
            path: 'posted_by',
            select: 'company_name company_address mobile_number company_website company_logo about why_us',
        });
        return data;
    }
    async getJobByIdForStats(id) {
        const data = await this.jobModel.findOne({ _id: id }).populate([
            {
                path: 'posted_by',
                select: 'company_name company_address mobile_number company_website company_logo about why_us',
            },
            {
                path: 'applied_candidates',
                select: 'name completed_quizzes hackerrank_data leetcode_data',
            },
        ]);
        return data;
    }
    async getJobByCompany(id) {
        const jobs = await this.jobModel
            .find({ posted_by: id })
            .sort({ date_posted: 'desc' })
            .populate([
            {
                path: 'posted_by',
                select: 'company_name company_address mobile_number company_website company_logo',
            },
            { path: 'recommended_candidates', select: 'email name' },
        ]);
        return jobs;
    }
    async getTotalJobs(id) {
        const activeJobs = await this.jobModel
            .find({ posted_by: id, is_closed: false })
            .count();
        const closedJobs = await this.jobModel
            .find({ posted_by: id, is_closed: true })
            .count();
        return {
            success: true,
            total_jobs: activeJobs + closedJobs,
            active_jobs: activeJobs,
            closed_jobs: closedJobs,
        };
    }
    async getJobByCategory(category) {
        const jobs = await this.jobModel.find({ title: category.title });
        return jobs;
    }
    async filter(name, location) {
        const data = await this.getAllJobs();
        const jobs = [];
        data.map((job) => {
            if (location == '' && name == '') {
                console.log('empty');
            }
            else if (location != '' &&
                name == '' &&
                job.location.toLowerCase().match(location.toLowerCase())) {
                jobs.push(job);
            }
            else if (name != '' &&
                location == '' &&
                job.posted_by.company_name.toLowerCase() == name.toLowerCase()) {
                jobs.push(job);
            }
            else if (job.posted_by.company_name.toLowerCase() == name.toLowerCase() &&
                job.location.toLowerCase().match(location.toLowerCase())) {
                jobs.push(job);
            }
        });
        return jobs;
    }
    async addCandidate(data) {
        const { job_id, candidate_id } = data;
        try {
            await this.jobModel.findOneAndUpdate({ _id: job_id }, {
                $addToSet: {
                    applied_candidates: candidate_id,
                },
            });
            return {
                success: true,
            };
        }
        catch (err) {
            throw new common_1.NotFoundException();
        }
    }
};
JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Job')),
    __param(1, (0, mongoose_2.InjectModel)('Skill')),
    __param(2, (0, mongoose_2.InjectModel)('Student')),
    __param(3, (0, mongoose_2.InjectModel)('Corporate')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], JobService);
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map