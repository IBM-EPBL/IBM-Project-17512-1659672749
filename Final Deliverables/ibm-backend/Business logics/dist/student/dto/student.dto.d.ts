export declare class StudentDto {
    email: string;
    mobile_number: string;
    name: string;
    skills?: any[];
    profile?: [];
    location?: string;
    education: any[];
    experience_level?: number;
}
export declare class SignupDto {
    email: string;
    name: string;
    password: string;
    mobile_number: string;
    device_id: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ParserDto {
    data_url: string;
    file_name: string;
}
export declare class ContactDetailsDto {
    _id: string;
    mobile_number: string;
    location: string;
}
