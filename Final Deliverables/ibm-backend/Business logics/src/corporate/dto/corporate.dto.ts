import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class createCorporateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile_number: string;

  @IsUrl()
  @IsOptional()
  company_website: string;

  @IsUrl()
  @IsOptional()
  company_logo: string;

  @IsString()
  @IsNotEmpty()
  company_address: string;

  @IsString()
  @IsNotEmpty()
  about: string;

  @IsString()
  @IsNotEmpty()
  why_us: string;

  @IsString()
  @IsNotEmpty()
  employees: string;
}

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsMobilePhone()
  @IsNotEmpty()
  @IsOptional()
  mobile_number: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  company_website: string;

  @IsUrl()
  @IsOptional()
  company_logo: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  company_address: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  about: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  why_us: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  employees: string;
}
