import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JobInterface } from './interfaces/job.interface';
import {
  JobDto,
  UpdateJobDto,
  CategoryJobDto,
  AddCandidateDto,
} from './dto/job.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { sendNotification } from 'src/utils/firebase-admin';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job')
    private readonly jobModel: Model<JobInterface>,
    @InjectModel('Skill') private readonly skillModel: Model<{ skill: string }>,
    @InjectModel('Student') private readonly studentModel: Model<any>,
    @InjectModel('Corporate') private readonly corporateModel: Model<any>,
  ) {}
  async createJob(data: JobDto) {
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
        const parsedSkills = skillsDB.filter(
          (skill: string) => sanitizeWord === skill,
        );
        parsedSkills.forEach((skill: string) => {
          _required_skills.push(new RegExp(skill, 'i'));
          _required_skills_text.push(skill);
        });
      }
    });

    Discription.split(' ').forEach((word) => {
      const sanitizeWord = word.replace(/[.,-?;:!\s]/g, '').toLowerCase();
      if (/^[0-9a-zA-Z]+$/.test(sanitizeWord)) {
        const parsedSkills = skillsDB.filter(
          (skill: string) => sanitizeWord === skill,
        );
        parsedSkills.forEach((skill: string) => {
          _required_skills.push(new RegExp(skill, 'i'));
          _required_skills_text.push(skill);
        });
      }
    });

    Additional.split(' ').forEach((word) => {
      const sanitizeWord = word.replace(/[.,-?;:!\s]/g, '').toLowerCase();
      if (/^[0-9a-zA-Z]+$/.test(sanitizeWord)) {
        const parsedSkills = skillsDB.filter(
          (skill: string) => sanitizeWord === skill,
        );
        parsedSkills.forEach((skill: string) => {
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

    const recomended_candidates_id = recomended_candidates.map(
      (student) => student._id,
    );
    const deviceTokens: string[] = recomended_candidates.map(
      (student) => student.device_id,
    );

    const _id = new Types.ObjectId();

    const InsertData = {
      _id,
      ...data,
      _required_skills: _required_skills_text_unique,
      recommended_candidates: recomended_candidates_id,
    };

    const newJob = new this.jobModel(InsertData);
    await newJob.save();
    await this.studentModel.updateMany(
      { _id: recomended_candidates_id },
      {
        $push: { recommended_jobs: _id },
      },
    );
    sendNotification(
      deviceTokens,
      `https://localhost:3000/jobs/${_id}`,
      `${data.title} job is posted now`,
    );
    return {
      success: true,
      message: 'proceed to next step',
      data: newJob,
    };
  }

  async updateJob(data: UpdateJobDto) {
    const { _id, ...rest } = data;
    const res = await this.jobModel.findOneAndUpdate({ _id: _id }, rest);
    if (res == null) throw new NotFoundException();
    return {
      success: true,
    };
  }

  async getAllJobs() {
    const jobs = await this.jobModel.find().populate({
      path: 'posted_by',
      select:
        'company_name company_address mobile_number company_website company_logo',
    });
    return jobs;
  }
  async getJobsById(id: string) {
    const data = await (
      await this.jobModel.findOne({ _id: id })
    ).populate({
      path: 'posted_by',
      select:
        'company_name company_address mobile_number company_website company_logo about why_us',
    });
    return data;
  }

  async getJobByIdForStats(id: string) {
    const data = await this.jobModel.findOne({ _id: id }).populate([
      {
        path: 'posted_by',
        select:
          'company_name company_address mobile_number company_website company_logo about why_us',
      },
      {
        path: 'applied_candidates',
        select: 'name completed_quizzes hackerrank_data leetcode_data',
      },
    ]);
    return data;
  }

  async getJobByCompany(id: string) {
    const jobs = await this.jobModel
      .find({ posted_by: id })
      .sort({ date_posted: 'desc' })
      .populate([
        {
          path: 'posted_by',
          select:
            'company_name company_address mobile_number company_website company_logo',
        },
        { path: 'recommended_candidates', select: 'email name' },
      ]);
    return jobs;
  }

  async getTotalJobs(id: string) {
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

  async getJobByCategory(category: CategoryJobDto) {
    const jobs = await this.jobModel.find({ title: category.title });
    return jobs;
  }

  async filter(name: string, location: string) {
    const data = await this.getAllJobs();
    const jobs = [];
    data.map((job: any) => {
      if (location == '' && name == '') {
        console.log('empty');
      } else if (
        location != '' &&
        name == '' &&
        job.location.toLowerCase().match(location.toLowerCase())
      ) {
        jobs.push(job);
      } else if (
        name != '' &&
        location == '' &&
        job.posted_by.company_name.toLowerCase() == name.toLowerCase()
      ) {
        jobs.push(job);
      } else if (
        job.posted_by.company_name.toLowerCase() == name.toLowerCase() &&
        job.location.toLowerCase().match(location.toLowerCase())
      ) {
        jobs.push(job);
      }
    });
    return jobs;
  }

  async addCandidate(data: AddCandidateDto) {
    const { job_id, candidate_id } = data;
    try {
      await this.jobModel.findOneAndUpdate(
        { _id: job_id },
        {
          $addToSet: {
            applied_candidates: candidate_id,
          },
        },
      );
      return {
        success: true,
      };
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
