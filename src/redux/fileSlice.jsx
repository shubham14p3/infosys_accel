import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fileService from '../services/fileService'; // Adjust path as needed

// Fetch all files
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

// Upload a file
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

// Delete a file
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

// Convert files to Excel
export const convertToExcel = createAsyncThunk(
  'files/convertToExcel',
  async (_, thunkAPI) => {
    try {
      const response = await fileService.convertToExcel();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Execute upload action
export const executeUploadAction = createAsyncThunk(
  'files/executeUploadAction',
  async (_, thunkAPI) => {
    try {
      const response = await fileService.executeUploadAction();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    loading: false,
    error: null,
    excelData: null,
    executionResult: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch files
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

      // Upload file
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

      // Delete file
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
      })

      // Convert to Excel
      .addCase(convertToExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(convertToExcel.fulfilled, (state, action) => {
        state.loading = false;
        state.excelData = action.payload;
      })
      .addCase(convertToExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Execute upload action
      .addCase(executeUploadAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(executeUploadAction.fulfilled, (state, action) => {
        state.loading = false;
        state.executionResult = action.payload;
      })
      .addCase(executeUploadAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fileSlice.reducer;