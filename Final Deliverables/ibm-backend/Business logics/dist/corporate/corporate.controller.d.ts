import { Request } from 'express';
import { Model } from 'mongoose';
import { CorporateService } from './corporate.service';
import { createCorporateDto, LoginDto, SignupDto, UpdateDto } from './dto/corporate.dto';
import { ICorporate } from './interfaces/corporate.interface';
export declare class CorporateController {
    private readonly service;
    private readonly corporateModel;
    constructor(service: CorporateService, corporateModel: Model<ICorporate>);
    isLogged(request: Request): Promise<import("mongoose").Document<unknown, any, ICorporate> & ICorporate & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    Signup(data: SignupDto): Promise<{
        success: boolean;
        token: string;
        data: import("mongoose").Document<unknown, any, ICorporate> & ICorporate & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    ProfileUpdate(request: Request, data: UpdateDto): Promise<{
        success: boolean;
    }>;
    Login(params: LoginDto): Promise<{
        success: boolean;
        token: string;
        data: import("mongoose").Document<unknown, any, ICorporate> & ICorporate & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    update(request: Request, data: createCorporateDto): Promise<import("mongoose").Document<unknown, any, ICorporate> & ICorporate & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
