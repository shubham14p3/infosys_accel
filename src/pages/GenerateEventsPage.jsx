import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TableViewIcon from '@mui/icons-material/TableView';
import EventsTable from '../components/EventsTable';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFiles,
  uploadFile,
  deleteFileSide,
  convertFileToExcel,
  setSelectedFiles,
  recordUseCases,
} from '../redux/fileSlice';
import UploadModal from '../components/UploadModal';
import { toast } from 'react-toastify'; // Ensure toast is imported
import { useNavigate } from 'react-router-dom'; // Add navigate hook

// Fallback data in case fetching files fails
const fallbackFiles = [
  { id: 1, name: 'google.side' },
  { id: 2, name: 'google2.side' },
  { id: 3, name: 'sample.side' },
  { id: 4, name: 'sample1.side' },
  { id: 5, name: 'sample2.side' },
];

const GenerateEventsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add navigate hook
  const { files, loading, error, selectedFiles } = useSelector((state) => state.files); // Get selectedFiles from Redux
  const [localFiles, setLocalFiles] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFiles()).then((action) => {
      if (fetchFiles.rejected.match(action)) {
        setLocalFiles(fallbackFiles);
      }
    });
  }, [dispatch]);

  // Callback to handle file upload from the modal
  const handleFileUpload = (file) => {
    // Check if a file with the same name already exists
    const existingFiles = error ? localFiles : normalizeFiles(files);
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
        dispatch(fetchFiles());
        toast.success(`File "${file.name}" uploaded successfully.`);
        setUploadModalOpen(false); // Close modal only on successful upload
      })
      .catch(() => {
        // Fallback behavior in case of an error during upload
        const newId = (files.length || localFiles.length) + 1;
        setLocalFiles([...localFiles, { id: newId, name: file.name }]);
        // Don't close modal on error
      });
  };

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  const handleRefresh = () => {
    dispatch(fetchFiles()).then((action) => {
      if (fetchFiles.rejected.match(action)) {
        setLocalFiles(fallbackFiles);
      }
    });
  };

  const handleRecordUseCases = async () => {
    const result = await dispatch(recordUseCases(true)).unwrap();
    if (result) {
      navigate('/dashboard/generate-events');
    }
  };

  const handleDeleteSelected = (selectedIds) => {
    if (selectedIds.length === 0) {
      toast.error('No files selected for deletion.');
      return;
    }

    const sourceFiles = error ? localFiles : normalizeFiles(files);

    // Map selected IDs to file names
    const selectedFileNames = selectedIds
      .map((id) => {
        const match = sourceFiles.find((file) => file.id === id);
        return match ? match.name : null;
      })
      .filter(Boolean); // Remove nulls

    if (selectedFileNames.length === 0) {
      toast.error('Could not find files to delete.');
      return;
    }

    // Now call deleteFileSide with names instead of ids
    dispatch(deleteFileSide(selectedFileNames))
      .unwrap()
      .then(() => {
        toast.success(`${selectedFileNames.length} file(s) deleted successfully!`);
        dispatch(fetchFiles());
        dispatch(setSelectedFiles([])); // Clear selected files after deletion

        // Update deleted files count in session storage
        const currentDeletedCount = parseInt(sessionStorage.getItem('deletedFiles') || '0', 10);
        sessionStorage.setItem('deletedFiles', currentDeletedCount + selectedFileNames.length);
      })
      .catch((error) => {
        console.error('Delete error:', error);
        toast.error('Failed to delete some files. Please try again.');
        // Use a proper variable name here to avoid reference errors
        setLocalFiles(localFiles.filter((file) => !selectedFileNames.includes(file.name)));
      });
  };

  const handleView = (id) => {
    // console.log('Viewing file:', id);
  };

  const handleConvertToExcel = () => {
    if (selectedFiles.length === 1) {
      // Instead of looking for a file by ID, directly find the file in displayFiles
      const fileId = selectedFiles[0];
      const file = displayFiles.find((f) => f.id === fileId);

      if (file) {
        dispatch(convertFileToExcel({ fileName: file.name, useCase: 'TestShashank' }))
          .unwrap()
          .then(() => {
            toast.success('File converted to Excel successfully!');
            navigate('/dashboard/execute'); // Redirect on success
          })
          .catch((error) => {
            console.error('Conversion error:', error);
            toast.error('Failed to convert file to Excel. Please try again.');
          });
      } else {
        console.error('Selected file not found. ID:', selectedFiles[0], 'Files:', displayFiles);
        toast.error('Selected file not found.');
      }
    } else {
      toast.error('Please select exactly one file to convert.');
    }
  };

  // Updated normalize function to directly return objects with id and name properties
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

  // Use the normalized files directly
  const displayFiles = error ? localFiles : normalizeFiles(files);

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
        Generate Events
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ width: '100%', maxWidth: 960 }}>
          <EventsTable
            files={displayFiles} // Pass the already normalized files
            onDeleteSelected={handleDeleteSelected}
            onView={handleView}
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
          onClick={handleRecordUseCases}
          sx={{ backgroundColor: 'green' }}
        >
          Record Use Cases
        </Button>
        {/* <Button
          variant="contained"
          startIcon={<TableViewIcon />}
          sx={{ backgroundColor: '#F59E0B' }}
        >
          View Excel
        </Button> */}
        <Button
          variant="contained"
          color="warning"
          onClick={handleConvertToExcel}
          sx={{ backgroundColor: '#F59E0B' }}
        >
          Convert to Excel
        </Button>
      </Box>

      {/* Modal for file upload */}
      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onFileUpload={handleFileUpload}
      />
    </Box>
  );
};

export default GenerateEventsPage;
