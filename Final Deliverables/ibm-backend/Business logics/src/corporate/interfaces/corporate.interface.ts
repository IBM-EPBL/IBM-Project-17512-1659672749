export interface ICorporate {
  email: string;
  mobile_number: string;
  company_website?: string;
  company_logo?: string;
  company_address?: string;
}

export interface ISignup {
  email: string;
  company_name: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUpdate {
  _id: string;
  mobile_number?: string;
  company_website?: string;
  company_logo?: string;
  company_address?: string;
  about?: string;
  why_us?: string;
  employees?: string;
}
