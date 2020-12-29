import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet } from '../../share/axios';

const fetchServer = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await axiosGet(userId);
    return response.data;
  }
);

const sidebarSlice = createSlice({
  name: 'sidebarShow',
  initialState: {
    isShow: false
  },
  reducers: {
    showHideSidebar: (state, action) => {
      state.isShow = action.payload;
    }
  },
  extraReducers: {
    [fetchServer.pending]: (state, action) => {
      console.log('pending');
    },
    [fetchServer.fulfilled]: (state, action) => {
      console.log('fulfilled');
    },
    [fetchServer.rejected]: (state, action) => {
      console.log('rejected');
    }
  }
});
const { reducer, actions } = sidebarSlice;
const { showHideSidebar } = actions;
export { showHideSidebar, fetchServer };
// Export the reducer, either as a default or named export
export default reducer;
