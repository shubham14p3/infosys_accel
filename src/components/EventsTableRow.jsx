// EventsTableRow.js
import React from 'react';
import { TableRow, TableCell, Checkbox, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useLocation, useNavigate } from 'react-router-dom';

const EventsTableRow = ({
  file,
  index,
  isSelected,
  onSelect,
  onDelete,
  onView,
  onRun,
  onConvertToExcel,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handlePlayAction = () => {
    if (location.pathname === '/dashboard/generate-events') {
      onConvertToExcel(file.name)
        .then(() => {
          navigate('/dashboard/execute');
        })
        .catch(() => {
          console.error('Failed to convert to Excel.');
        });
    } else if (location.pathname === '/dashboard/execute') {
      onRun(file.name);
    }
  };

  const playTooltip =
    location.pathname === '/dashboard/generate-events'
      ? 'Convert to Excel'
      : 'Execute Use Case';

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={isSelected} onChange={() => onSelect(file.id)} />
      </TableCell>
      <TableCell sx={{ color: 'black' }}>{index}</TableCell>
      <TableCell sx={{ color: 'black' }}>{file.name}</TableCell> {/* Render the file name */}
      <TableCell>
        <IconButton color="error" onClick={() => onDelete(file.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton color="primary" onClick={() => onView(file.id)}>
          <VisibilityIcon />
        </IconButton>
        <Tooltip title={playTooltip} arrow>
          <IconButton color="success" onClick={handlePlayAction}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
        {/* <IconButton color="warning" onClick={() => onConvertToExcel(file.name)}>
          <FileDownloadIcon />
        </IconButton> */}
      </TableCell>
    </TableRow>
  );
};

export default EventsTableRow;
