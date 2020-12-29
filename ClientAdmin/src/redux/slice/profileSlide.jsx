import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { axiosGet } from '../../share';
import { decrypt, getStateLogin } from './authenticationSlice';

const getProfileRequest = createAsyncThunk('/profile', async model => {
  const response = await axiosGet(model);
  return response.data;
});

const profileSlide = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: false
  },
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    }
  },
  extraReducers: {
    [getProfileRequest.pending]: (state, action) => {
      console.log('pending'); //loading
    },
    [getProfileRequest.fulfilled]: (state, action) => {
      const data = action.payload;
    },
    [getProfileRequest.rejected]: (state, action) => {
      console.log('rejected');
    }
  }
});
const { reducer, actions } = profileSlide;
const { getProfile } = actions;
export { getProfileRequest, getProfile };
export default reducer;
