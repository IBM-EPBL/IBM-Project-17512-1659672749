import { Request } from 'express';
import { Model } from 'mongoose';
import { IStudent, ILogin, ISignup, IParser } from './interfaces/student.interface';
import { ContactDetailsDto } from './dto/student.dto';
export declare class StudentService {
    private readonly studentModel;
    private readonly skillModel;
    constructor(studentModel: Model<IStudent>, skillModel: Model<{
        skill: string;
    }>);
    SignUp(data: ISignup): Promise<{
        success: boolean;
        token: string;
        data: import("mongoose").Document<unknown, any, IStudent> & IStudent & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    login(data: ILogin): Promise<any>;
    update(data: IStudent): Promise<import("mongoose").Document<unknown, any, IStudent> & IStudent & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    parser(data: IParser): Promise<{
        success: boolean;
        parse_data: any;
    }>;
    isLoggedIn(request: Request): Promise<import("mongoose").Document<unknown, any, IStudent> & IStudent & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllStudents(): Promise<(import("mongoose").Document<unknown, any, IStudent> & IStudent & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getStudentsById(id: string): Promise<import("mongoose").Document<unknown, any, IStudent> & IStudent & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateContactDetails(data: ContactDetailsDto): Promise<{
        success: boolean;
    }>;
    updateSkills(data: any): Promise<{
        success: boolean;
    }>;
    updateEducation(data: any): Promise<{
        success: boolean;
    }>;
    updateQuiz(data: any): Promise<{
        success: boolean;
    }>;
    getQuizData(id: string): Promise<import("mongoose").Document<unknown, any, IStudent> & IStudent & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
