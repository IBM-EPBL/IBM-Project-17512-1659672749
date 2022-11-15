import { Request } from 'express';
import { Model } from 'mongoose';
import { StudentService } from './student.service';
import { StudentDto, LoginDto, SignupDto, ParserDto, ContactDetailsDto } from './dto/student.dto';
import { IStudent } from './interfaces/student.interface';
export declare class StudentController {
    private readonly service;
    private readonly studentModel;
    constructor(service: StudentService, studentModel: Model<IStudent>);
    isLogged(request: Request): Promise<import("mongoose").Document<unknown, any, IStudent> & IStudent & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    Signup(data: SignupDto): Promise<{
        success: boolean;
        token: string;
        data: import("mongoose").Document<unknown, any, IStudent> & IStudent & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    Login(params: LoginDto): Promise<any>;
    update(request: Request, data: StudentDto): Promise<import("mongoose").Document<unknown, any, IStudent> & IStudent & {
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
    parser(request: Request, body: ParserDto): Promise<any>;
    getQuizData(id: string): Promise<import("mongoose").Document<unknown, any, IStudent> & IStudent & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateQuiz(data: any): Promise<{
        success: boolean;
    }>;
    getAllStudents(): Promise<(import("mongoose").Document<unknown, any, IStudent> & IStudent & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getStudentsById(params: string): Promise<import("mongoose").Document<unknown, any, IStudent> & IStudent & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
