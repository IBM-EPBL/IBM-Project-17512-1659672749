import { HackathonService } from './hackathon.service';
export declare class HackathonController {
    private readonly hackathonService;
    constructor(hackathonService: HackathonService);
    postHackathon(): Promise<{
        success: boolean;
        description: string;
        data: any;
    }>;
    getHackathon(): Promise<any[]>;
}
