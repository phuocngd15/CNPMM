import { combineReducers } from 'redux';
import sidebarReducer from './slice/sidebarSlice';
import authenticationReducer from './slice/authenticationSlice';
import doExamSlice from './slice/doExamSlice';
import examReducer from './slice/examSlide';

export default combineReducers({
  sidebarShow: sidebarReducer,
  authentication: authenticationReducer,
  doExam: doExamSlice,
  exam: examReducer
});
