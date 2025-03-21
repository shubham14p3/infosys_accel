// src/components/PageSkeleton.jsx
import React, { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PageSkeleton = ({ children }) => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => setOpen(!open);

    return (
        <>
            <CssBaseline />
            <Header toggleSidebar={toggleDrawer} />

            {/* Layout including Sidebar + Main Content */}
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <Sidebar open={open} />

                {/* Main Page Area */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#F5F7FA",
                        minHeight: "100vh",
                    }}
                >
                    {/* Spacer for fixed AppBar */}
                    <Toolbar />

                    {/* Main Content with space for children and footer */}
                    <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>

                    {/* Footer stays at bottom */}
                    <Footer />
                </Box>
            </Box>
        </>
    );
};

export default PageSkeleton;
