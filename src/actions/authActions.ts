import { createAction } from '@reduxjs/toolkit';

export const loginSuccess = createAction<{ id: string; name: string }>('LOGIN_SUCCESS');
export const logout = createAction('LOGOUT');
