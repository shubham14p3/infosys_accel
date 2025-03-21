// EventsTable.js
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableContainer,
    Paper,
    Box,
    Button,
    TablePagination,
} from "@mui/material";
import EventsTableHeader from "./EventsTableHeader";
import EventsTableRow from "./EventsTableRow";
import ConfirmModal from "./ConfirmModal";

const EventsTable = ({ files, onDeleteSelected, onProcessSelected, onView }) => {
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [actionType, setActionType] = useState(""); // "delete" or "process"

    // Handle individual row selection
    const handleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Handle "select all" toggle
    const handleSelectAll = () => {
        setSelected(selected.length === files.length ? [] : files.map((f) => f.id));
    };

    // Pagination handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Slice files for current page
    const paginatedFiles = files.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Open confirmation modal for selected actions
    const handleDeleteSelected = () => {
        setActionType("delete");
        setConfirmOpen(true);
    };

    const handleProcessSelected = () => {
        setActionType("process");
        setConfirmOpen(true);
    };

    // Confirmation modal callbacks
    const handleConfirmAction = () => {
        if (actionType === "delete" && onDeleteSelected) {
            onDeleteSelected(selected);
        } else if (actionType === "process" && onProcessSelected) {
            onProcessSelected(selected);
        }
        setConfirmOpen(false);
        setSelected([]);
    };

    const handleCancelAction = () => {
        setConfirmOpen(false);
    };

    return (
        <Box>
            {/* Actions for selected items */}
            {selected.length > 0 && (
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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
                    backgroundColor: "white",
                    color:"black",
                    // backgroundColor: "#374151",
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Table>
                    <EventsTableHeader files={files} selected={selected} onSelectAll={handleSelectAll} />
                    <TableBody>
                        {paginatedFiles.map((file, index) => (
                            <EventsTableRow
                                key={file.id}
                                file={file}
                                index={page * rowsPerPage + index + 1}
                                isSelected={selected.includes(file.id)}
                                onSelect={handleSelect}
                                onDelete={(id) => {
                                    // For single deletion, set selected to the single id and open modal
                                    setSelected([id]);
                                    setActionType("delete");
                                    setConfirmOpen(true);
                                }}
                                onView={onView}
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: files.length }]}
                sx={{
                    "& .MuiTablePagination-toolbar": { backgroundColor: "#374151", color: "white" },
                    "& .MuiTablePagination-selectLabel": { color: "white" },
                    "& .MuiTablePagination-select": { color: "white" },
                    "& .MuiTablePagination-displayedRows": { color: "white" },
                }}
            />

            {/* Common Confirmation Modal */}
            <ConfirmModal
                open={confirmOpen}
                title={actionType === "delete" ? "Confirm Deletion" : "Confirm Action"}
                message={
                    actionType === "delete"
                        ? "Are you sure you want to delete the selected events?"
                        : "Are you sure you want to process the selected events?"
                }
                onConfirm={handleConfirmAction}
                onCancel={handleCancelAction}
            />
        </Box>
    );
};

export default EventsTable;
