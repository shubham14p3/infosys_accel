import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchExcelFiles,
  uploadFile,
  deleteFileXlxs,
  executeUseCases,
  setSelectedFiles,
} from '../redux/fileSlice';
import ExcelFilesTable from '../components/ExcelFilesTable';
import UploadModal from '../components/UploadModal';
import { toast } from 'react-toastify';

// Fallback data in case fetching files fails
const fallbackExcelFiles = [
  { id: 1, name: 'test1.xlsx' },
  { id: 2, name: 'test2.xlsx' },
  { id: 3, name: 'sample.xlsx' },
];

const ExecutePage = () => {
  const dispatch = useDispatch();
  const { excelFiles, loading, error, selectedFiles } = useSelector((state) => state.files);
  const [localFiles, setLocalFiles] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchExcelFiles()).then((action) => {
      if (fetchExcelFiles.rejected.match(action)) {
        setLocalFiles(fallbackExcelFiles);
      }
    });
  }, [dispatch]);

  const handleFileUpload = (file) => {
    // Check if a file with the same name already exists
    const existingFiles = error ? localFiles : normalizeFiles(excelFiles);
    const isDuplicate = existingFiles.some(
      (existingFile) => existingFile.name.toLowerCase() === file.name.toLowerCase()
    );

    if (isDuplicate) {
      toast.error(
        `A file with the name "${file.name}" already exists. Please use a different name.`
      );
      return;
    }

    dispatch(uploadFile(file))
      .unwrap()
      .then(() => {
        dispatch(fetchExcelFiles());
        toast.success(`File "${file.name}" uploaded successfully.`);
        setUploadModalOpen(false);
      })
      .catch(() => {
        const newId = (excelFiles.length || localFiles.length) + 1;
        setLocalFiles([...localFiles, { id: newId, name: file.name }]);
      });
  };

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  const handleRefresh = () => {
    dispatch(fetchExcelFiles()).then((action) => {
      if (fetchExcelFiles.rejected.match(action)) {
        setLocalFiles(fallbackExcelFiles);
      }
    });
  };

  const handleDeleteSelected = (selectedIds) => {
    const sourceFiles = error ? localFiles : normalizeFiles(excelFiles);

    const selectedFileNames = selectedIds
      .map((id) => {
        const match = sourceFiles.find((file) => file.id === id);
        return match ? match.name : null;
      })
      .filter(Boolean);

    if (selectedFileNames.length === 0) {
      toast.error('No files selected for deletion.');
      return;
    }

    dispatch(deleteFileXlxs(selectedFileNames))
      .unwrap()
      .then(() => {
        // Clear selections from local state to avoid UI showing stale selections
        dispatch(setSelectedFiles([]));
        // Refresh the file list
        dispatch(fetchExcelFiles());
      })
      .catch((error) => {
        console.error('Delete error:', error);
        // If API fails, update local state as backup
        setLocalFiles(localFiles.filter((file) => !selectedFileNames.includes(file.name)));
      });
  };

  const handleView = (id) => {
    // console.log('Viewing Excel file:', id);
  };

  const handleRunSelected = () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file to run.');
      return;
    }

    // Get all selected file names
    const selectedFileNames = selectedFiles
      .map((fileId) => {
        const file = displayFiles.find((f) => f.id === fileId);
        return file ? file.name : null;
      })
      .filter(Boolean); // Remove any nulls

    if (selectedFileNames.length > 0) {
      executeTests(selectedFileNames);
    }
  };

  const executeTest = (fileName) => {
    executeTests([fileName]); // Call the multi-file version with a single file
  };

  const executeTests = (fileNames) => {
    dispatch(
      executeUseCases({
        fileNames,
        options: {
          waitTime: 3000,
          captureScreenshot: true,
          webTestingInParallel: false,
        },
      })
    )
      .unwrap()
      .then(() => {
        const message =
          fileNames.length === 1
            ? `Test execution started for "${fileNames[0]}"`
            : `Test execution started for ${fileNames.length} files`;
        toast.success(message);
      })
      .catch((error) => {
        console.error('Test execution error:', error);
        const message =
          fileNames.length === 1
            ? `Failed to execute test for "${fileNames[0]}"`
            : `Failed to execute tests for ${fileNames.length} files`;
        toast.error(`${message}. Please try again.`);
      });
  };

  const normalizeFiles = (arr) => {
    return Array.isArray(arr)
      ? arr.map((file, index) => {
          if (typeof file === 'string') {
            return { id: index + 1, name: file };
          } else if (typeof file === 'object' && file.name) {
            return { id: index + 1, name: file.name };
          }
          return { id: index + 1, name: 'Unknown file' };
        })
      : [];
  };

  const displayFiles = error ? localFiles : normalizeFiles(excelFiles);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: '#1F2937',
          textAlign: 'center',
          borderBottom: '2px solid #E5E7EB',
          pb: 1,
          width: '100%',
          maxWidth: 720,
        }}
      >
        Execute Tests
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ width: '100%', maxWidth: 960 }}>
          <ExcelFilesTable
            files={displayFiles}
            onDeleteSelected={handleDeleteSelected}
            onView={handleView}
            onExecuteTest={executeTest}
          />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          mt: 1,
        }}
      >
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={handleUploadClick}
          sx={{ backgroundColor: '#1E40AF' }}
        >
          Upload
        </Button>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          sx={{ backgroundColor: '#4B5563' }}
        >
          Refresh
        </Button>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={handleRunSelected}
          sx={{ backgroundColor: '#059669' }}
        >
          Run Test
        </Button>
      </Box>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onFileUpload={handleFileUpload}
        acceptFormat=".xlsx"
      />
    </Box>
  );
};

export default ExecutePage;
