import { createSlice, combineReducers } from '@reduxjs/toolkit';
import questionReducer, { Question } from './questionReducer';
import { v4 as uuidv4 } from 'uuid';

export interface FormInfo {
  id: string;
  title: string;
  detail: string;
}

interface FormState {
  form: FormInfo;
  questions: Question[];
}

const initialState: FormState = {
  form: {
    id: uuidv4(),
    title: '제목 없는 설문지',
    detail: '',
  },
  questions: [],
};

const { actions: formActions, reducer: formReducer } = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addForm: (state, action) => {
      const { id, title, detail } = action.payload;
      state.form.id = id;
      state.form.title = title;
      state.form.detail = detail;
    },
  },
});

export { formActions };
export default combineReducers({
  form: formReducer,
  questions: questionReducer,
});
