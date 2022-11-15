export interface IStudent {
  email: string;
  mobile_number: string;
  name: string;
  skills?: any[];
  profile?: [];
  location?: string;
  education: any[];
  experience_level?: number;
}
export interface ISignup {
  email: string;
  mobile_number: string;
  password: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IParser {
  data_url: string;
  file_name: string;
}
