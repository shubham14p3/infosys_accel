import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Button,
    CircularProgress,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload";
import RefreshIcon from "@mui/icons-material/Refresh";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TableViewIcon from "@mui/icons-material/TableView";
import EventsTable from "../components/EventsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles, uploadFile, deleteFile } from "../redux/fileSlice";
import UploadModal from "../components/UploadModal";

// Fallback data in case fetching files fails
const fallbackFiles = [
    { id: 1, name: "google.side" },
    { id: 2, name: "google2.side" },
    { id: 3, name: "sample.side" },
    { id: 4, name: "sample1.side" },
    { id: 5, name: "sample2.side" },
];


const GenerateEventsPage = () => {
    const dispatch = useDispatch();
    const { files, loading, error } = useSelector((state) => state.files);
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
        dispatch(uploadFile(file))
            .unwrap()
            .catch(() => {
                // Fallback behavior in case of an error during upload
                const newId = (files.length || localFiles.length) + 1;
                setLocalFiles([...localFiles, { id: newId, name: file.name }]);
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

    const handleDeleteSelected = (selectedIds) => {
        selectedIds.forEach((id) => {
            dispatch(deleteFile(id))
                .unwrap()
                .catch(() => {
                    setLocalFiles(localFiles.filter((file) => file.id !== id));
                });
        });
    };

    const handleView = (id) => {
        console.log("Viewing file:", id);
    };

    const displayFiles = error ? localFiles : files;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 600,
                    color: "#1F2937",
                    textAlign: "center",
                    borderBottom: "2px solid #E5E7EB",
                    pb: 1,
                    width: "100%",
                    maxWidth: 720,
                }}
            >
                Generate Events
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={{ width: "100%", maxWidth: 960 }}>
                    <EventsTable
                        files={displayFiles}
                        onDeleteSelected={handleDeleteSelected}
                        onView={handleView}
                    />
                </Box>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 2,
                    mt: 1,
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<UploadIcon />}
                    onClick={handleUploadClick}
                    sx={{ backgroundColor: "#1E40AF" }}
                >
                    Upload
                </Button>
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{ backgroundColor: "#4B5563" }}
                >
                    Refresh
                </Button>
                <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    sx={{ backgroundColor: "#059669" }}
                >
                    Generate
                </Button>
                <Button
                    variant="contained"
                    startIcon={<TableViewIcon />}
                    sx={{ backgroundColor: "#F59E0B" }}
                >
                    View Excel
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
