import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import { cloneDeep } from 'lodash';
import fs from 'fs';
import { FULL_TEST_ANSWER_SHEET } from '../const/examAnswerSheet';
import { axiosGet } from '../../share/axios';

const getGGExam = createAsyncThunk('exam/listExam', async model => {
  const filterModel = {
    url: `http://localhost:9999/api/uploadFile/getOne`,
    id: `1TuI1WgsC9XmWj4PBSSXVoohdSg1bT3i4`
  };
  var dest = fs.createWriteStream(`./aaa.pdf`);

  const response = await Axios(`http://localhost:9999/api/uploadFile/getOne`, {
    method: 'GET',
    responseType: 'blob' //Force to receive data in a Blob Format
  })
    .then(response => {
      //Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: 'application/pdf' }); //Build a URL from the file
      const fileURL = URL.createObjectURL(file); //Open the URL on new Window
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
    //answerSheet: FULL_TEST_ANSWER_SHEET,
    answerSheet: null,
    pdfFile: null,
    audioFile: null,
    loading: false,
    isSumited:true,
    error: {}
  },
  reducers: {
    chooseAnswer: (state, action) => {
      const { stt, dapAn } = action.payload;
      console.log(action.payload);
      let tmp = cloneDeep(state.answerSheet);
      tmp.forEach(e => {
        if (e.stt === stt) e.dapAn = dapAn;
      });
      console.log('tmp', tmp);
      state.answerSheet = tmp;
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
      const { _id, answerSheet } = action.payload.data;
      state.answerSheet = answerSheet;
      state.loading = false;
    },
    [getExam.rejected]: (state, action) => {
      state.messageLog = 'Cannot get list exams';
      state.loading = false;
    }
  }
});

const { reducer, actions } = doExamSlice;
const { chooseAnswer } = actions;
export { chooseAnswer, getGGExam, getExam };
export default reducer;
