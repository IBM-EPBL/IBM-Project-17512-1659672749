/// <reference types="mongoose" />
import { JobService } from './job.service';
import { JobDto, UpdateJobDto, CategoryJobDto, AddCandidateDto } from './dto/job.dto';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    getalljobs(): Promise<(import("mongoose").Document<unknown, any, import("./interfaces/job.interface").JobInterface> & import("./interfaces/job.interface").JobInterface & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getJobsCount(_id: string): Promise<{
        success: boolean;
        total_jobs: number;
        active_jobs: number;
        closed_jobs: number;
    }>;
    getJobByCategory(params: CategoryJobDto): Promise<(import("mongoose").Document<unknown, any, import("./interfaces/job.interface").JobInterface> & import("./interfaces/job.interface").JobInterface & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getJobByCompany(params: string): Promise<(import("mongoose").Document<unknown, any, import("./interfaces/job.interface").JobInterface> & import("./interfaces/job.interface").JobInterface & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getJobById(params: string): Promise<import("mongoose").Document<unknown, any, import("./interfaces/job.interface").JobInterface> & import("./interfaces/job.interface").JobInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getJobByIdStats(params: string): Promise<import("mongoose").Document<unknown, any, import("./interfaces/job.interface").JobInterface> & import("./interfaces/job.interface").JobInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getJobByFilter(params: any): Promise<any[]>;
    createJob(data: JobDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, any, import("./interfaces/job.interface").JobInterface> & import("./interfaces/job.interface").JobInterface & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateJob(data: UpdateJobDto): Promise<{
        success: boolean;
    }>;
    addCandidatate(data: AddCandidateDto): Promise<{
        success: boolean;
    }>;
}
