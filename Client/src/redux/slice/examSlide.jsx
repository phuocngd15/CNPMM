import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet } from '../../share/axios';

const getExamsRequest = createAsyncThunk('exam/listExam', async model => {
  const response = await axiosGet(model);
  return response.data;
});

const getExamRequest = createAsyncThunk('exam/getExam', async model => {
  const response = await axiosGet(model);
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
      state.exam = null;
    },
    getOneExam: (state, action) => {
      state = state;
      state.exam = action.payload;
    }
  },
  extraReducers: {
    [getExamsRequest.pending]: (state, action) => {},
    [getExamsRequest.fulfilled]: (state, action) => {
      state.exams = action.payload;
      state.exam = null;
    },
    [getExamsRequest.rejected]: (state, action) => {
      state.messageLog = 'Cannot get list exams';
    },
    [getExamRequest.pending]: (state, action) => {},
    [getExamRequest.fulfilled]: (state, action) => {
      state.exam = action.payload;
    },
    [getExamRequest.rejected]: (state, action) => {
      state.messageLog = 'Cannot get exam';
    }
  }
});

const { reducer, actions } = examSlide;
const { getExams, getOneExam, refreshExam } = actions;
export { getExams, getExamsRequest, getExamRequest, getOneExam, refreshExam };
export default reducer;
