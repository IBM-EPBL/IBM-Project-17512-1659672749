import { Model } from 'mongoose';
export declare const hashPassword: (password: string) => string;
export declare const verifyPassword: (email: string, password: string, model: Model<any>) => Promise<boolean>;
