// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ open }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const width = collapsed ? 60 : 240;

  const menuItems = [
    { text: "Generate Events", icon: <FolderIcon />, link: "/dashboard/generate-events" },
    { text: "Execute", icon: <FolderIcon />, link: "/dashboard/execute" },
    { text: "History", icon: <FolderIcon />, link: "/dashboard/history" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
          backgroundColor: "#000",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Toolbar />
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.link;
            return (
              <ListItem
                key={item.text}
                component={Link}
                to={item.link}
                sx={{
                  backgroundColor: isActive ? "white" : "transparent",
                  color: isActive ? "black" : "white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    "& .MuiListItemIcon-root": {
                      color: "black",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "black" : "white",
                    minWidth: collapsed ? "auto" : "56px",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Collapse Button */}
      <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: "white" }}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
