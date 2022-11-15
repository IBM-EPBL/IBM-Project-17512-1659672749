import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  isBase64,
  IsMobilePhone,
  IsArray,
  MIN_LENGTH,
  ArrayMinSize,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class StudentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  skills?: any[];

  @IsArray()
  profile?: [];

  @IsString()
  location?: string;

  @IsArray()
  @ArrayMinSize(1)
  education: any[];

  @IsNumber()
  @IsNotEmpty()
  experience_level?: number;
}
export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  mobile_number: string;

  @IsNotEmpty()
  @IsString()
  device_id: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ParserDto {
  @IsNotEmpty()
  @IsString()
  data_url: string;

  @IsNotEmpty()
  @IsString()
  file_name: string;
}

export class ContactDetailsDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile_number: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
