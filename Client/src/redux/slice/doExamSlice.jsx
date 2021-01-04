import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import { cloneDeep } from 'lodash';
import fs from 'fs';
import { FULL_TEST_ANSWER_SHEET } from '../../components/settings/examAnswerSheet';
import { axiosGet } from '../../share/axios';

const getGGExam = createAsyncThunk('exam/listExam', async model => {
  const filterModel = {
    url: `http://localhost:9999/api/uploadFile/getOne`,
    id: `1TuI1WgsC9XmWj4PBSSXVoohdSg1bT3i4`
  };
  var dest = fs.createWriteStream(`./aaa.pdf`);

  const response = await Axios(`http://localhost:9999/api/uploadFile/getOne`, {
    method: 'GET',
    responseType: 'blob' 
  })
    .then(response => {
      //Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: 'application/pdf' }); 
      const fileURL = URL.createObjectURL(file); 
      window.open(fileURL);
    })
    .catch(error => {
      console.log(error);
    });
  return response.data;
});

const getExam = createAsyncThunk('exam/listExam', async model => {
  const res = axiosGet(model);
  return res;
});

const doExamSlice = createSlice({
  name: 'doExam',
  initialState: {
    answerSheetTmp: FULL_TEST_ANSWER_SHEET,
    answerSheet: null,
    pdfFile: null,
    audioFile: null,
    loading: false,
    isSumited: false,
    error: {}
  },
  reducers: {
    chooseAnswer: (state, action) => {
      const { stt, dapAn } = action.payload;
      let tmp = cloneDeep(state.answerSheetTmp);
      tmp.forEach(e => {
        if (e.stt === stt) e.dapAn = dapAn;
      });
      state.answerSheetTmp = tmp;
    },
    submitExam: (state, action) => {
      state.isSumited = true;
      const { answerTrue, answerFalse } = action.payload;
      state.answerTrue = answerTrue;
      state.answerFalse = answerFalse;
    },
    startExam: (state, action) => {
      state.isSumited = false;
      state.answerSheetTmp = FULL_TEST_ANSWER_SHEET;
    }
  },
  extraReducers: {
    [getGGExam.pending]: (state, action) => {},
    [getGGExam.fulfilled]: (state, action) => {
      state.file = action.payload;
    },
    [getGGExam.rejected]: (state, action) => {
      state.messageLog = 'Cannot get list exams';
    },
    [getExam.pending]: (state, action) => {
      state.loading = true;
    },
    [getExam.fulfilled]: (state, action) => {
      // state.file = action.payload;
      const { _id, answerSheet, title } = action.payload.data;
      state.answerSheet = answerSheet;
      state.loading = false;
      state.isSumited = false;
      state.answerSheetTmp = FULL_TEST_ANSWER_SHEET;
      state.title = title;
    },
    [getExam.rejected]: (state, action) => {
      state.messageLog = 'Cannot get list exams';
      state.loading = false;
    }
  }
});

const { reducer, actions } = doExamSlice;
const { chooseAnswer, submitExam } = actions;
export { chooseAnswer, submitExam, getGGExam, getExam };
export default reducer;
