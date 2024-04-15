import { createSlice } from '@reduxjs/toolkit';
import FormInfo from '../reducers/formReducer';

export interface UserState {
  id: string;
  name: string;
  isLoggedIn: boolean;
  forms: (typeof FormInfo)[];
}

const initialState: UserState = {
  id: '',
  name: '',
  isLoggedIn: false,
  forms: [],
};

const authReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLoggedIn = true;
      state.forms = action.payload.forms;
    },
    setLogout: state => {
      state.id = '';
      state.name = '';
      state.isLoggedIn = false;
      state.forms = [];
    },
  },
});

export const { setLogin, setLogout } = authReducer.actions;
export default authReducer.reducer;
