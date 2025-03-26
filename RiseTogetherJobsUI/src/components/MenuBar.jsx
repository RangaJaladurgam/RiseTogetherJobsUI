import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function MenuBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/admins/login");
  };

  const navItems = isLoggedIn
    ? ["Dashboard", "Post Job", "Show Jobs", "Logout"]
    : ["Home", "Freshers", "Internships", "Experience"];

  const handleNavigation = (item) => {
    switch (item) {
      case "Home":
        navigate("/");
        break;
      case "Freshers":
        navigate("/jobs/freshers");
        break;
      case "Internships":
        navigate("/jobs/internships");
        break;
      case "Experience":
        navigate("/jobs/experience");
        break;
      case "Dashboard":
        navigate("/admins/dashboard");
        break;
      case "Post Job":
        navigate("/admins/post-job");
        break;
      case "Show Jobs":
        navigate("/admins/show-jobs");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", paddingTop: "5rem" }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "left", paddingLeft: "3rem" }}
              onClick={() => handleNavigation(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar
          sx={{
            minHeight: "45px !important",
            backgroundColor: isLoggedIn ? "rgb(157, 0, 255)" : "black",
          }}
        >
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ul style={{ display: "flex", listStyle: "none" }}>
              {navItems.map((item) => (
                <li
                  className="menu-item"
                  key={item}
                  onClick={() => handleNavigation(item)}
                  onMouseEnter={(e) => {
                    if (item === "Logout")
                      e.target.style.backgroundColor = "red";
                  }}
                  onMouseLeave={(e) => {
                    if (item === "Logout") e.target.style.backgroundColor = "";
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

MenuBar.propTypes = {
  window: PropTypes.func,
};

export default MenuBar;
