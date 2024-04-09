import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  name: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: '',
  name: '',
  isLoggedIn: false,
};

const authReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    setLogout: state => {
      state.id = '';
      state.name = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setLogin, setLogout } = authReducer.actions;
export default authReducer.reducer;
