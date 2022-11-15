import { Model } from 'mongoose';
export declare class HackathonService {
    private readonly hackathonModel;
    constructor(hackathonModel: Model<any>);
    getHackathon(): Promise<any[]>;
    postHackathon(): Promise<{
        success: boolean;
        description: string;
        data: any;
    }>;
    scarpHackathons(): Promise<void>;
}
