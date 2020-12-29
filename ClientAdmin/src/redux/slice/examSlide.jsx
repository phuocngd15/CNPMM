import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost } from '../../share/axios';

const getExamsRequest = createAsyncThunk('/listExam', async model => {
  const response = await axiosGet(model);
  return response.data;
});

const getExamRequest = createAsyncThunk('/getExam', async model => {
  const response = await axiosGet(model);
  return response.data;
});
const postExamRequest = createAsyncThunk('/createExam', async model => {
  const response = await axiosPost(model);
  return response.data;
});
const examSlide = createSlice({
  name: 'exam',
  initialState: {
    token: localStorage.getItem('token'),
    exam: null,
    exams: [],
    loading: false,
    error: {}
  },
  reducers: {
    getExams: (state, action) => {
      const data = action.payload;
      state.exams = data[0];
    },
    getOneExam: (state, action) => {
      state = state;
      state.exam = action.payload;
    },
    addExam: (state, action) => {
      state.exams = [action.payload, ...state.exams];
    }
  },
  extraReducers: {
    [getExamsRequest.pending]: (state, action) => {
      console.log('pending');
    },
    [getExamsRequest.fulfilled]: (state, action) => {
      state.exams = action.payload;
      console.log('fulfilled');
    },
    [getExamsRequest.rejected]: (state, action) => {
      console.log('rejected');
      state.messageLog = 'Cannot get list exams';
    },
    [getExamRequest.pending]: (state, action) => {
      console.log('pending');
    },
    [getExamRequest.fulfilled]: (state, action) => {
      state.exam = action.payload;
      console.log('fulfilled');
    },
    [getExamRequest.rejected]: (state, action) => {
      console.log('rejected');
      state.messageLog = 'Cannot get exam';
    },
    [postExamRequest.pending]: (state, action) => {
      console.log('pending');
    },
    [postExamRequest.fulfilled]: (state, action) => {
      state.exams = [action.payload, ...state.exams];
      console.log('fulfilled');
    },
    [postExamRequest.rejected]: (state, action) => {
      console.log('rejected');
      state.messageLog = 'Cannot get exam';
    }
  }
});

const { reducer, actions } = examSlide;
const { getExams, getOneExam, addExam } = actions;
export {
  getExams,
  getExamsRequest,
  getExamRequest,
  getOneExam,
  postExamRequest,
  addExam
};
export default reducer;
