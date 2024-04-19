import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  name: string;
  password: string;
  isLoggedIn: boolean;
  token: string | null; // 토큰 추가
}

const initialState: UserState = {
  id: '',
  name: '',
  password: '',
  isLoggedIn: false,
  token: null, // 초기 값은 null로 설정
};

const authReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isLoggedIn = true;
      state.token = action.payload.token; // 토큰 저장
    },
    setLogout: state => {
      state.id = '';
      state.name = '';
      state.isLoggedIn = false;
      state.token = null; // 토큰 제거
    },
  },
});

export const { setLogin, setLogout } = authReducer.actions;
export default authReducer.reducer;
