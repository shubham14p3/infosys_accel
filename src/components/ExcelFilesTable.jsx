import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Box,
  Button,
  TablePagination,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFiles } from '../redux/fileSlice';
import ExcelTableHeader from './ExcelTableHeader';
import ExcelTableRow from './ExcelTableRow';
import ConfirmModal from './ConfirmModal';

const ExcelFilesTable = ({ files, onDeleteSelected, onView, onExecuteTest }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // "delete" or "run"
  const dispatch = useDispatch();
  const selectedFiles = useSelector((state) => state.files.selectedFiles);

  // Handle individual row selection
  const handleSelect = (id) => {
    dispatch(
      setSelectedFiles(
        selectedFiles.includes(id)
          ? selectedFiles.filter((item) => item !== id)
          : [...selectedFiles, id]
      )
    );
  };

  // Handle "select all" toggle
  const handleSelectAll = () => {
    dispatch(setSelectedFiles(selectedFiles.length === files.length ? [] : files.map((f) => f.id)));
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Directly use files for pagination
  const paginatedFiles = files.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Open confirmation modal for selected actions
  const handleDeleteSelected = () => {
    setActionType('delete');
    setConfirmOpen(true);
  };

  const handleRunSelected = () => {
    setActionType('run');
    setConfirmOpen(true);
  };

  // Confirmation modal callbacks
  const handleConfirmAction = () => {
    if (actionType === 'delete' && onDeleteSelected) {
      onDeleteSelected(selectedFiles);
      // After deletion is complete, the parent component will clear selections
      // through Redux actions in its success handler
    } else if (actionType === 'run') {
      // Get file names for all selected files
      const selectedFileNames = selectedFiles
        .map(id => {
          const file = files.find(f => f.id === id);
          return file ? file.name : null;
        })
        .filter(Boolean);
        
      if (selectedFileNames.length > 0 && onExecuteTest) {
        onExecuteTest(selectedFileNames);
      }
    }
    setConfirmOpen(false);
  };

  const handleCancelAction = () => {
    setConfirmOpen(false);
  };

  const handleRun = (fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (file && onExecuteTest) {
      onExecuteTest(file.name);
    }
  };

  return (
    <Box>
      {/* Actions for selected items */}
      {selectedFiles.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
          <Button variant="contained" color="success" onClick={handleRunSelected}>
            Run Selected
          </Button>
        </Box>
      )}

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table>
          <ExcelTableHeader files={files} selected={selectedFiles} onSelectAll={handleSelectAll} />
          <TableBody>
            {paginatedFiles.map((file, index) => (
              <ExcelTableRow
                key={file.id}
                file={file}
                index={page * rowsPerPage + index + 1}
                isSelected={selectedFiles.includes(file.id)}
                onSelect={handleSelect}
                onDelete={(id) => {
                  dispatch(setSelectedFiles([id]));
                  setActionType('delete');
                  setConfirmOpen(true);
                }}
                onView={onView}
                onRun={handleRun}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        component="div"
        count={files.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: files.length }]}
        sx={{
          '& .MuiTablePagination-toolbar': { backgroundColor: '#374151', color: 'white' },
          '& .MuiTablePagination-selectLabel': { color: 'white' },
          '& .MuiTablePagination-select': { color: 'white' },
          '& .MuiTablePagination-displayedRows': { color: 'white' },
        }}
      />

      {/* Common Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        title={actionType === 'delete' ? 'Confirm Deletion' : 'Confirm Test Execution'}
        message={
          actionType === 'delete'
            ? 'Are you sure you want to delete the selected Excel files?'
            : 'Are you sure you want to run the selected test?'
        }
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </Box>
  );
};

export default ExcelFilesTable;
