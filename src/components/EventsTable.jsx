// EventsTable.js
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
import { runCode, convertFileToExcel, executeUseCases, setSelectedFiles } from '../redux/fileSlice';
import EventsTableHeader from './EventsTableHeader';
import EventsTableRow from './EventsTableRow';
import ConfirmModal from './ConfirmModal';
import { normalizeFile } from '../utils/fileUtils'; // Correct import path

const EventsTable = ({ files, onDeleteSelected, onProcessSelected, onView }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({ id: '', name: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // "delete" or "process"
  const dispatch = useDispatch();
  const selectedFiles = useSelector((state) => state.files.selectedFiles); // Get selected files from Redux

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

  // Handle "Convert to Excel" action
  const handleConvertToExcel = (fileName) => {
    return dispatch(convertFileToExcel({ fileName, useCase: 'TestShashank' })).unwrap();
  };

  const handleRun = (fileName) => {
    dispatch(executeUseCases({ fileNames: [fileName] }));
  };

  // Filter handlers
  const handleFilterChange = (column, value) => {
    setFilters({ ...filters, [column]: value.toLowerCase() });
  };

  const filteredFiles = files.filter((file) =>
    Object.keys(filters).every((key) => file[key]?.toString().toLowerCase().includes(filters[key]))
  );

  // Directly use filtered files for pagination
  const paginatedFiles = filteredFiles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Open confirmation modal for selected actions
  const handleDeleteSelected = () => {
    setActionType('delete');
    setConfirmOpen(true);
  };

  const handleProcessSelected = () => {
    setActionType('process');
    setConfirmOpen(true);
  };

  // Confirmation modal callbacks
  const handleConfirmAction = () => {
    if (actionType === 'delete' && onDeleteSelected) {
      onDeleteSelected(selectedFiles);
    } else if (actionType === 'process' && onProcessSelected) {
      onProcessSelected(selectedFiles);
    }
    setConfirmOpen(false);
  };

  const handleCancelAction = () => {
    setConfirmOpen(false);
  };

  return (
    <Box>
      {/* Actions for selected items */}
      {selectedFiles.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
          <Button variant="contained" color="success" onClick={handleProcessSelected}>
            Process Selected
          </Button>
        </Box>
      )}

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'white',
          color: 'black',
          // backgroundColor: "#374151",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table>
          <EventsTableHeader files={files} selected={selectedFiles} onSelectAll={handleSelectAll} />
          <TableBody>
            {/* Filter Row */}
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <td></td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                {/* <input
                  type="text"
                  placeholder="Filter by #"
                  value={filters.id}
                  onChange={(e) => handleFilterChange('id', e.target.value)}
                  style={{
                    width: '90%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                  }}
                /> */}
              </td>
              <td style={{ paddingTop: '10px', paddingBottom: '10px', textAlign: 'center' }}>
                <input
                  type="text"
                  placeholder="Filter by Event Name"
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  style={{
                    width: '90%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                  }}
                />
              </td>
              <td style={{ padding: '10px' }}></td>
              <td style={{ padding: '10px' }}></td>
            </tr>
            {paginatedFiles.map((file, index) => (
              <EventsTableRow
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
                onConvertToExcel={handleConvertToExcel}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        component="div"
        count={filteredFiles.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: filteredFiles.length }]}
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
        title={actionType === 'delete' ? 'Confirm Deletion' : 'Confirm Action'}
        message={
          actionType === 'delete'
            ? 'Are you sure you want to delete the selected events?'
            : 'Are you sure you want to process the selected events?'
        }
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </Box>
  );
};

export default EventsTable;
