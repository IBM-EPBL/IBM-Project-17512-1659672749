export interface JobInterface {
    title: string;
    description: string;
    salary: string;
    key_qualifications: string;
    educational_requirements: string;
    additional_requirements: string;
    application_url: string;
    _required_skills: [];
    posted_by: string;
    recommended_candidates: [];
    experience_level: string;
    date_posted: Date;
    is_closed: boolean;
    location: string;
}
