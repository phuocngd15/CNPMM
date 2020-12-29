import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost, axiosDelete } from '../../share/axios';
const getAdminRequest = createAsyncThunk('/accoount/getAdmin', async model => {
  const respone = await axiosGet(model);
  return respone.data;
});
const getClientRequest = createAsyncThunk(
  '/accoount/getClient',
  async model => {
    const respone = await axiosGet(model);
    return respone.data;
  }
);
const postAdminRequest = createAsyncThunk('/account/postAdmin', async model => {
  const response = await axiosPost(model);
  return response.data;
});

const deleteAdminRequest = createAsyncThunk(
  '/account/deleteAdmin',
  async model => {
    const respone = await axiosDelete(model);
    return respone.data;
  }
);

const userSlide = createSlice({
  name: 'accounts',
  initialState: {
    token: localStorage.getItem('token'),
    clients: [],
    admins: [],
    loading: false,
    error: {}
  },
  reducers: {
    getAdmins: (state, action) => {
      const data = action.payload;
      state.admins = data[0];
    },
    getClients: (state, action) => {
      state.clients = action.payload[0];
    },
    createAdmin: (state, action) => {
      state.admins = [action.payload, [...state.admins]];
    },
    deleteAdmin: (state, action) => {
      state.admins = state.admins.filter(admin => admin._id != action.payload);
      state.loading = true;
    }
  },
  extraReducers: {
    [getAdminRequest.pending]: (state, action) => {
      console.log('pending');
    },
    [getAdminRequest.fulfilled]: (state, action) => {
      state.admins = action.payload;
      console.log('fulfilled');
    },
    [getAdminRequest.rejected]: (state, action) => {
      console.log('rejected');
    },
    [getClientRequest.pending]: (state, action) => {
      console.log('pending');
    },
    [getClientRequest.fulfilled]: (state, action) => {
      state.clients = action.payload;
      console.log('fulfilled');
    },
    [getClientRequest.rejected]: (state, action) => {
      console.log('rejected');
    },
    [postAdminRequest.pending]: (state, action) => {
      console.log('pending');
    },
    [postAdminRequest.fulfilled]: (state, action) => {
      state.admins = [action.payload, ...state.admins];
      console.log('fulfilled');
    },
    [postAdminRequest.rejected]: (state, action) => {
      console.log('rejected');
    },
    [deleteAdminRequest.pending]: (state, action) => {
      console.log('pending');
    },
    [deleteAdminRequest.fulfilled]: (state, action) => {
      state.admins = state.admins.filter(admin => admin._id != action.payload);
      state.loading = true;

      console.log('fulfilled');
    },
    [deleteAdminRequest.rejected]: (state, action) => {
      console.log('rejected');
    }
  }
});
const { reducer, actions } = userSlide;
const { getAdmins, getClients, createAdmin, deleteAdmin } = actions;
export {
  getAdmins,
  getClients,
  createAdmin,
  deleteAdmin,
  getClientRequest,
  getAdminRequest,
  postAdminRequest,
  deleteAdminRequest
};
export default reducer;
