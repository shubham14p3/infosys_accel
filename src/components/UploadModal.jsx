import React, { useState } from 'react';
import {
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

const UploadModal = ({ open, onClose, onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            onFileUpload(file);
            e.dataTransfer.clearData();
            onClose();
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            onFileUpload(file);
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    padding: 3,
                    boxShadow: 6,
                },
            }}
        >
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
                Upload File
            </DialogTitle>
            <DialogContent>
                <Box
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    sx={{
                        border: isDragging ? "2px dashed #1976d2" : "2px dashed #ccc",
                        borderRadius: 2,
                        padding: 4,
                        textAlign: "center",
                        cursor: "pointer",
                        mt: 2,
                        backgroundColor: isDragging ? "#f0f8ff" : "inherit",
                    }}
                >
                    <Typography variant="body1" gutterBottom>
                        Drag and drop a SIDE file here, or click the button below to select a file.
                    </Typography>
                    <Button variant="contained" component="label" sx={{ mt: 2 }}>
                        Select File
                        <input
                            type="file"
                            hidden
                            accept=".side"
                            // accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileChange}
                        />
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant="outlined">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadModal;
