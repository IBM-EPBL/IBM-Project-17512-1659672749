import { Model, Types } from 'mongoose';
import { JobInterface } from './interfaces/job.interface';
import { JobDto, UpdateJobDto, CategoryJobDto, AddCandidateDto } from './dto/job.dto';
export declare class JobService {
    private readonly jobModel;
    private readonly skillModel;
    private readonly studentModel;
    private readonly corporateModel;
    constructor(jobModel: Model<JobInterface>, skillModel: Model<{
        skill: string;
    }>, studentModel: Model<any>, corporateModel: Model<any>);
    createJob(data: JobDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, any, JobInterface> & JobInterface & {
            _id: Types.ObjectId;
        };
    }>;
    updateJob(data: UpdateJobDto): Promise<{
        success: boolean;
    }>;
    getAllJobs(): Promise<(import("mongoose").Document<unknown, any, JobInterface> & JobInterface & {
        _id: Types.ObjectId;
    })[]>;
    getJobsById(id: string): Promise<import("mongoose").Document<unknown, any, JobInterface> & JobInterface & {
        _id: Types.ObjectId;
    }>;
    getJobByIdForStats(id: string): Promise<import("mongoose").Document<unknown, any, JobInterface> & JobInterface & {
        _id: Types.ObjectId;
    }>;
    getJobByCompany(id: string): Promise<(import("mongoose").Document<unknown, any, JobInterface> & JobInterface & {
        _id: Types.ObjectId;
    })[]>;
    getTotalJobs(id: string): Promise<{
        success: boolean;
        total_jobs: number;
        active_jobs: number;
        closed_jobs: number;
    }>;
    getJobByCategory(category: CategoryJobDto): Promise<(import("mongoose").Document<unknown, any, JobInterface> & JobInterface & {
        _id: Types.ObjectId;
    })[]>;
    filter(name: string, location: string): Promise<any[]>;
    addCandidate(data: AddCandidateDto): Promise<{
        success: boolean;
    }>;
}
