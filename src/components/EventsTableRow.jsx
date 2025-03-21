// EventsTableRow.js
import React from "react";
import { TableRow, TableCell, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const EventsTableRow = ({ file, index, isSelected, onSelect, onDelete, onView }) => {
    return (
        <TableRow>
            <TableCell>
                <Checkbox checked={isSelected} onChange={() => onSelect(file.id)} />
            </TableCell>
            <TableCell sx={{ color: "black" }}>{index}</TableCell>
            <TableCell sx={{ color: "black" }}>{file.name}</TableCell>
            <TableCell>
                <IconButton color="error" onClick={() => onDelete(file.id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => onView(file.id)}>
                    <VisibilityIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default EventsTableRow;
