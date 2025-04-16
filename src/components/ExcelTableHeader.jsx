import React from "react";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";

const ExcelTableHeader = ({ files, selected, onSelectAll }) => {
    return (
        <TableHead sx={{ backgroundColor: "#1E3A8A" }}> 
            <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    <Checkbox
                        checked={selected.length === files.length && files.length > 0}
                        onChange={onSelectAll}
                    />
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Test Cases
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default ExcelTableHeader;
