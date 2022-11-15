export declare class JobDto {
    title: string;
    posted_by: string;
    description: string;
    salary: string;
    key_qualifiations: string;
    educational_requirements: string;
    additional_requirements: string;
    application_url: string;
    location: string;
    date_posted?: Date;
}
export declare class UpdateJobDto {
    _id: string;
    title: string;
    description: string;
    salary: string;
    key_qualifiations: string;
    educational_requirements: string;
    additional_requirements: string;
    application_url: string;
    location: string;
    is_closed: boolean;
}
export declare class CompletedJobDto {
    title: string;
    company_name: string;
    is_closed?: boolean;
}
export declare class CategoryJobDto {
    title: string;
}
export declare class AddCandidateDto {
    job_id: string;
    candidate_id: string;
}
