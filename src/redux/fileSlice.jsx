import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fileService from '../services/fileService';

// Async thunk to fetch files
export const fetchFiles = createAsyncThunk(
  'files/fetchFiles',
  async (_, thunkAPI) => {
    try {
      const response = await fileService.getFiles();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to upload a file
export const uploadFile = createAsyncThunk(
  'files/uploadFile',
  async (file, thunkAPI) => {
    try {
      const response = await fileService.uploadFile(file);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to delete a file
export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async (fileId, thunkAPI) => {
    try {
      await fileService.deleteFile(fileId);
      return fileId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchFiles
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle uploadFile
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.push(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteFile
      .addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files = state.files.filter(file => file.id !== action.payload);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default fileSlice.reducer;



