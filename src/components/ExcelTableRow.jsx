import React from 'react';
import { TableRow, TableCell, Checkbox, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useLocation } from 'react-router-dom';

const ExcelTableRow = ({
  file,
  index,
  isSelected,
  onSelect,
  onDelete,
  onView,
  onRun,
}) => {
  const location = useLocation();

  const playTooltip = 'Execute Use Case';

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={isSelected} onChange={() => onSelect(file.id)} />
      </TableCell>
      <TableCell sx={{ color: 'black' }}>{index}</TableCell>
      <TableCell sx={{ color: 'black' }}>{file.name}</TableCell>
      <TableCell>
        <IconButton color="error" onClick={() => onDelete(file.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton color="primary" onClick={() => onView(file.id)}>
          <VisibilityIcon />
        </IconButton>
        <Tooltip title={playTooltip} arrow>
          <IconButton color="success" onClick={() => onRun(file.id)}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ExcelTableRow;
