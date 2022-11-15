import { Request } from 'express';
import { Model } from 'mongoose';
import { ICorporate, ILogin, ISignup, IUpdate } from './interfaces/corporate.interface';
export declare class CorporateService {
    private readonly corporateModel;
    constructor(corporateModel: Model<ICorporate>);
    SignUp(data: ISignup): Promise<{
        success: boolean;
        token: string;
        data: import("mongoose").Document<unknown, any, ICorporate> & ICorporate & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    login(data: ILogin): Promise<{
        success: boolean;
        token: string;
        data: import("mongoose").Document<unknown, any, ICorporate> & ICorporate & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    update(data: ICorporate): Promise<import("mongoose").Document<unknown, any, ICorporate> & ICorporate & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    isLoggedIn(request: Request): Promise<import("mongoose").Document<unknown, any, ICorporate> & ICorporate & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    profileUpdate(data: IUpdate): Promise<{
        success: boolean;
    }>;
}
