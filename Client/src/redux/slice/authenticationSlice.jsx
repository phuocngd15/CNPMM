import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cloneDeep, isPlainObject } from 'lodash';
import { StatusMiddleWare } from '../../share/Alert';
import { axiosPost } from '../../share/axios';

const signIn = createAsyncThunk('account/signin', async model => {
  const response = await axiosPost(model);

  return response;
});
const signUP = createAsyncThunk('account/signup', async model => {
  const response = await axiosPost(model);
  return response;
});

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    loginState: sessionStorage.getItem('login')
      ? JSON.parse(sessionStorage.getItem('login'))
      : null,
    isLogin: sessionStorage.getItem('isLogin')
      ? JSON.parse(sessionStorage.getItem('isLogin'))
      : false,
    loading: false
  },
  reducers: {
    logOut: state => {
      state.loginState = null;
      state.isLogin = false;
      sessionStorage.clear();
    },
    updateStateLogin: (state, action) => {
      const { data } = action.payload;
      state.loginState = {
        token: data[0],
        email: data[1],
        rule: data[2]
      };
    }
  },
  extraReducers: {
    [signIn.pending]: (state, action) => {},
    [signIn.fulfilled]: (state, action) => {
      const { data } = action.payload;
      if (data) {
        const loginState = {
          token: data[0],
          email: data[1],
          rule: data[2]
        };
        state.loginState = loginState;
        
        state.isLogin = true;
        sessionStorage.setItem('login', JSON.stringify(loginState));
        sessionStorage.setItem('isLogin', JSON.stringify(true));
      }
    },
    [signIn.rejected]: (state, action) => {
      state.isLogin = false;
      state.messageLog = 'logfail';
    },

    [signUP.pending]: (state, action) => {},
    [signUP.fulfilled]: (state, action) => {
      const { data } = action.payload;
      if (data) {
        state.loginState = {
          token: data[0],
          email: data[1],
          rule: data[2]
        };
      }
    },
    [signUP.rejected]: (state, action) => {}
  }
});
const { reducer, actions } = authenticationSlice;
const { logOut, updateStateLogin } = actions;
export { logOut, updateStateLogin, signIn, signUP };
export default reducer;
