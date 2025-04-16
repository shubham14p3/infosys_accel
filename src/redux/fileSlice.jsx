import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fileService from '../services/fileService'; // Adjust path as needed
import { toast } from 'react-toastify';

// Add this helper function inside the fileSlice to normalize files consistently
export const normalizeFilesForRedux = (fileNames) => {
  if (!Array.isArray(fileNames)) return [];
  return fileNames.map((name, index) => ({
    id: index + 1,
    name,
  }));
};

// Fetch all files
export const fetchFiles = createAsyncThunk('files/fetchFiles', async (_, thunkAPI) => {
  try {
    const response = await fileService.getFiles();
    // Return normalized files
    return response.data?.data || [];
  } catch (error) {
    toast.error('Something went wrong while fetching files. Please try again later.');
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Fetch all Excel files
export const fetchExcelFiles = createAsyncThunk('files/fetchExcelFiles', async (_, thunkAPI) => {
  try {
    const response = await fileService.getExcelFiles();
    // Return normalized files
    return response.data?.data || [];
  } catch (error) {
    toast.error('Something went wrong while fetching Excel files. Please try again later.');
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Upload a file
export const uploadFile = createAsyncThunk('files/uploadFile', async (selectedFile, thunkAPI) => {
  try {
    const response = await fileService.uploadFile(selectedFile);
    return response.data;
  } catch (error) {
    toast.error('Something went wrong while uploading the file. Please try again later.');
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Delete a SIDE file
export const deleteFileSide = createAsyncThunk('files/deleteFileSide', async (fileId, thunkAPI) => {
  try {
    await fileService.deleteFileSide(fileId);
    toast.success('File(s) deleted successfully!');
    return fileId;
  } catch (error) {
    toast.error('Something went wrong while deleting the SIDE file. Please try again later.');
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Delete an XLSX file
export const deleteFileXlxs = createAsyncThunk('files/deleteFileXlxs', async (fileNames, thunkAPI) => {
  try {
    await fileService.deleteFileXlxs(fileNames);
    toast.success('Excel file(s) deleted successfully!');
    return fileNames; // Return the file names that were deleted
  } catch (error) {
    toast.error('Something went wrong while deleting the XLSX file. Please try again later.');
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Convert files to Excel
export const convertToExcel = createAsyncThunk('files/convertToExcel', async (_, thunkAPI) => {
  try {
    const response = await fileService.convertToExcel();
    return response.data;
  } catch (error) {
    toast.error('Something went wrong while converting to Excel. Please try again later.');
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Convert a file to Excel
export const convertFileToExcel = createAsyncThunk(
  'files/convertFileToExcel',
  async ({ fileName, useCase }, thunkAPI) => {
    try {
      const response = await fileService.convertToExcel(fileName, useCase);
      toast.success('File converted to Excel successfully!');
      return response.data;
    } catch (error) {
      toast.error('Something went wrong while converting to Excel. Please try again later.');
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
      toast.error(
        'Something went wrong while executing the upload action. Please try again later.'
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Run code for a specific file
export const runCode = createAsyncThunk('files/runCode', async (fileName, thunkAPI) => {
  try {
    const response = await fileService.executeUseCases(fileName);
    return response.data;
  } catch (error) {
    toast.error('Something went wrong while running the code. Please try again later.');
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Execute test cases
export const executeUseCases = createAsyncThunk(
  'files/executeUseCases',
  async ({ fileNames, options = {} }, thunkAPI) => {
    try {
      const response = await fileService.executeUseCases(fileNames, options);
      toast.success('Test execution started successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to execute test. Please try again later.');
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Dummy fetchExecutionResults thunk
export const fetchExecutionResults = createAsyncThunk(
  'files/fetchExecutionResults',
  async (_, thunkAPI) => {
    try {
      // Simulate API response
      const mockExecutionResults = [
        { date: '2023-06-01', passed: 18, failed: 4, total: 22 },
        { date: '2023-06-08', passed: 22, failed: 6, total: 28 },
        { date: '2023-06-15', passed: 15, failed: 3, total: 18 },
        { date: '2023-06-22', passed: 20, failed: 5, total: 25 },
        { date: '2023-06-29', passed: 23, failed: 8, total: 31 },
      ];
      return mockExecutionResults;
    } catch (error) {
      toast.error('Something went wrong while fetching execution results. Please try again later.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Record use cases
export const recordUseCases = createAsyncThunk(
  'files/recordUseCases',
  async (record, thunkAPI) => {
    try {
      const response = await fileService.recordUseCases(record);
      toast.success('Use cases recording started successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to start recording use cases. Please try again.');
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    excelFiles: [], // Add this new state for Excel files
    selectedFiles: [], // Add this to store selected files
    loading: false,
    error: null,
    excelData: null,
    executionResult: null,
    executionResults: [], // Add this for execution results
    metrics: {
      uploadedFiles: 0,
      deletedFiles: 0,
      executedFiles: 0,
      convertedToExcel: 0,
      errorFiles: 0,
    }, // Add metrics to track file operations
  },
  reducers: {
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload; // Update selected files
    },
    incrementUploadedFiles: (state) => {
      state.metrics.uploadedFiles += 1;
    },
    incrementDeletedFiles: (state) => {
      state.metrics.deletedFiles += 1;
    },
    incrementExecutedFiles: (state) => {
      state.metrics.executedFiles += 1;
    },
    incrementConvertedToExcel: (state) => {
      state.metrics.convertedToExcel += 1;
    },
    incrementErrorFiles: (state) => {
      state.metrics.errorFiles += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch files
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize the files
        state.files = normalizeFilesForRedux(action.payload);
        // Reset selected files when files change
        state.selectedFiles = [];
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Excel files
      .addCase(fetchExcelFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExcelFiles.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize the Excel files
        state.excelFiles = normalizeFilesForRedux(action.payload);
      })
      .addCase(fetchExcelFiles.rejected, (state, action) => {
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
        state.metrics.uploadedFiles += 1; // Increment uploaded files count
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.metrics.errorFiles += 1; // Increment error files count
      })

      // Delete SIDE file
      .addCase(deleteFileSide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFileSide.fulfilled, (state, action) => {
        state.loading = false;
        state.files = state.files.filter((file) => file.id !== action.payload);
        state.metrics.deletedFiles += 1; // Increment deleted files count
        // Clear selected files after deletion
        state.selectedFiles = state.selectedFiles.filter(id => id !== action.payload);
      })
      .addCase(deleteFileSide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.metrics.errorFiles += 1; // Increment error files count
      })

      // Delete XLSX file
      .addCase(deleteFileXlxs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFileXlxs.fulfilled, (state, action) => {
        state.loading = false;
        
        // Get the deleted file names
        const deletedFileNames = Array.isArray(action.payload) ? action.payload : [action.payload];
        
        // Clear selections by keeping only those IDs that don't match the deleted files
        if (state.excelFiles && state.excelFiles.length > 0) {
          // Get the IDs of files being deleted
          const deletedFileIds = state.excelFiles
            .filter(file => deletedFileNames.includes(file.name))
            .map(file => file.id);
            
          // Filter out deleted file IDs from selections
          state.selectedFiles = state.selectedFiles.filter(id => !deletedFileIds.includes(id));
          
          // Update the excelFiles list
          state.excelFiles = state.excelFiles.filter(file => !deletedFileNames.includes(file.name));
        }
        
        state.metrics.deletedFiles += deletedFileNames.length;
      })
      .addCase(deleteFileXlxs.rejected, (state, action) => {
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

      // Convert file to Excel
      .addCase(convertFileToExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(convertFileToExcel.fulfilled, (state, action) => {
        state.loading = false;
        state.excelData = action.payload;
        state.metrics.convertedToExcel += 1; // Increment converted to Excel count
      })
      .addCase(convertFileToExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.metrics.errorFiles += 1; // Increment error files count
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
      })

      // Run code
      .addCase(runCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.loading = false;
        state.executionResult = action.payload;
        state.metrics.executedFiles += 1; // Increment executed files count
      })
      .addCase(runCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.metrics.errorFiles += 1; // Increment error files count
      })

      // Execute test cases
      .addCase(executeUseCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(executeUseCases.fulfilled, (state, action) => {
        state.loading = false;
        state.executionResult = action.payload;
        state.metrics.executedFiles += 1; // Increment executed files count
      })
      .addCase(executeUseCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.metrics.errorFiles += 1; // Increment error files count
      })

      // Fetch execution results
      .addCase(fetchExecutionResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExecutionResults.fulfilled, (state, action) => {
        state.loading = false;
        state.executionResults = action.payload;
      })
      .addCase(fetchExecutionResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Record use cases
      .addCase(recordUseCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recordUseCases.fulfilled, (state, action) => {
        state.loading = false;
        state.executionResult = action.payload;
      })
      .addCase(recordUseCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedFiles,
  incrementUploadedFiles,
  incrementDeletedFiles,
  incrementExecutedFiles,
  incrementConvertedToExcel,
  incrementErrorFiles,
} = fileSlice.actions; // Export the action
export default fileSlice.reducer;
