import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";

// Format today's date: "Monday, March 25, 2025"
const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: "auto",
                py: 2,
                px: 3,
                backgroundColor: "#1F2937",
                color: "white",
                display: "flex",
                flexDirection: {
                    xs: "column",
                    sm: "row",
                },
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Stack spacing={0.5}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Anyone Can Automate. All rights reserved.
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {formatDate()}
                </Typography>
            </Stack>

            <Box>
                <Link
                    href="#"
                    underline="hover"
                    sx={{ color: "white", mx: 1, fontSize: 14 }}
                >
                    Privacy Policy
                </Link>
                <Link
                    href="#"
                    underline="hover"
                    sx={{ color: "white", mx: 1, fontSize: 14 }}
                >
                    Terms of Service
                </Link>
                <Link
                    href="#"
                    underline="hover"
                    sx={{ color: "white", mx: 1, fontSize: 14 }}
                >
                    Contact
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
