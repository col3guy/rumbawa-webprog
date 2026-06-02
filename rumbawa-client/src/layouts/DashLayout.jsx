import React, { useState } from "react";
import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Button from "@mui/material/Button";

const drawerWidth = 240;

/* =======================
   USER HELPERS
======================= */
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const canAccessUsers = (role) => ["admin"].includes(role);

/* =======================
   STYLES
======================= */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"]),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

/* =======================
   COMPONENT
======================= */
export default function DashLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = getUser();

  /* 🔐 STRONG AUTH GUARD */
  if (!user || !user.role) {
    return <Navigate to="/auth/signin" replace />;
  }

  /* Allow only admin and editor to access dashboard. */
  if (!["admin", "editor"].includes(user.role)) {
    localStorage.removeItem("user");
    return <Navigate to="/auth/signin" replace />;
  }

  /* =======================
     NAV ITEMS
  ======================= */
  const dashboardNavItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: DashboardIcon,
    },
    {
      label: "Reports",
      to: "/dashboard/reports",
      icon: AssessmentIcon,
    },

    ...(canAccessUsers(user.role)
      ? [
          {
            label: "Users",
            to: "/dashboard/users",
            icon: PeopleIcon,
          },
        ]
      : []),

    {
      label: "Articles",
      to: "/dashboard/articles",
      icon: ArticleIcon,
    },
  ];

  const getPageTitle = () => {
    const item = dashboardNavItems.find((t) =>
      location.pathname.startsWith(t.to)
    );
    return item?.label || "Dashboard";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* APP BAR */}
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#3A2316" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>

          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/auth/signin");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {dashboardNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={to} disablePadding>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname.startsWith(to)}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Icon />
                </ListItemIcon>

                <ListItemText
                  primary={label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* MAIN */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}