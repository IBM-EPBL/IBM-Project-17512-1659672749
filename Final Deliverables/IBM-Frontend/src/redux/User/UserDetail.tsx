import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface iInitialState {
  data: any;
}

type TPayload = {
  data: {};
};

const initialState: iInitialState = {
  data: {},
};

export const UserSlice = createSlice({
  name: 'UserDetails',
  initialState: initialState,
  reducers: {
    setUserData: (state: iInitialState, { payload }: PayloadAction<TPayload>) => {
      state.data = payload.data;
    },
  },
});

export default UserSlice.reducer;
export const { setUserData } = UserSlice.actions;
