import { Request } from 'express';
import { Model } from 'mongoose';
export declare const verifyRequest: (request: Request, model: Model<any>) => Promise<boolean>;
export declare const generateToken: (email: string) => string;
