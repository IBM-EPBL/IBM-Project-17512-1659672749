import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ISkills {
  skill?: string;
  level?: 'Beginner' | 'Intermediate' | 'Expert' | '';
}

interface iInitialState {
  resume_data: any;
  email: string;
  name: string;
  stream: any[];
  year_of_experience: number;
  address: string;
  mobile_number: string;
  skills: ISkills[];
}

type TPayload = {
  data: any;
};

const initialState: iInitialState = {
  resume_data: {},
  email: '',
  name: '',
  stream: [
    {
      stream: '',
      institution: '',
      grade: '',
    },
  ],
  year_of_experience: 0,
  address: '',
  mobile_number: '',
  skills: [],
};

export const StudentDataSlice = createSlice({
  name: 'StudentDataDetails',
  initialState: initialState,
  reducers: {
    setStudentResumeData: (state: iInitialState, { payload }: PayloadAction<TPayload>) => {
      console.log(payload.data);
      state.resume_data = payload.data;
      state.name = payload.data.name;
      state.email = payload.data.email;
      state.mobile_number = payload.data.phone.replace(/\s/g, '');
      state.address = '';
      state.skills = [];
      payload.data.degree.forEach((stream: string, index: number) => {
        state.stream[index] = {
          stream: stream,
          institution: '',
          grade: '',
        };
      });
      payload.data.skills.forEach((skill: string, index: number) => {
        if (skill.length > 0) {
          state.skills[index] = {
            skill: skill.trim(),
            level: 'Beginner',
          };
        }
      });
      state.year_of_experience = payload.data.total_exp;
    },
    setEmail: (state: iInitialState, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
    setName: (state: iInitialState, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
    setMobile: (state: iInitialState, { payload }: PayloadAction<string>) => {
      state.mobile_number = payload;
    },
    setAddress: (state: iInitialState, { payload }: PayloadAction<string>) => {
      state.address = payload;
    },
    setYearsOfExperience: (state: iInitialState, { payload }: PayloadAction<number>) => {
      state.year_of_experience = payload;
    },
    setStreamName: (
      state: iInitialState,
      { payload }: PayloadAction<{ index: number; data: string }>,
    ) => {
      state.stream[payload.index].stream = payload.data;
    },
    setStreamInstitutiion: (
      state: iInitialState,
      { payload }: PayloadAction<{ index: number; data: string }>,
    ) => {
      state.stream[payload.index].institution = payload.data;
    },
    setStreamGrade: (
      state: iInitialState,
      { payload }: PayloadAction<{ index: number; data: string }>,
    ) => {
      state.stream[payload.index].grade = payload.data;
    },
    addStream: (state: iInitialState, { payload }: PayloadAction<any>) => {
      state.stream.push({
        stream: '',
        institution: '',
        grade: '',
      });
    },
    deleteStream: (state: iInitialState, { payload }: PayloadAction<number>) => {
      state.stream.splice(payload, 1);
    },
    addSkill: (state: iInitialState, { payload }: PayloadAction<any>) => {
      state.skills = [...state.skills, { skill: '', level: 'Beginner' }];
    },
    deleteSkill: (state: iInitialState, { payload }: PayloadAction<number>) => {
      state.skills.splice(payload, 1);
    },
    setSkillName: (
      state: iInitialState,
      { payload }: PayloadAction<{ index: number; data: string }>,
    ) => {
      state.skills[payload.index].skill = payload.data;
    },
    setSkillLevel: (
      state: iInitialState,
      {
        payload,
      }: PayloadAction<{ index: number; data: 'Beginner' | 'Intermediate' | 'Expert' | '' }>,
    ) => {
      state.skills[payload.index].level = payload.data;
    },
  },
});

export default StudentDataSlice.reducer;
export const {
  setStudentResumeData,
  setAddress,
  setEmail,
  setMobile,
  setName,
  setStreamName,
  setStreamInstitutiion,
  setStreamGrade,
  setYearsOfExperience,
  addStream,
  deleteStream,
  addSkill,
  setSkillName,
  setSkillLevel,
  deleteSkill,
} = StudentDataSlice.actions;
