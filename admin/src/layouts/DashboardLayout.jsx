import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LocalHotelRoundedIcon from "@mui/icons-material/LocalHotelRounded";
import NightShelterRoundedIcon from "@mui/icons-material/NightShelterRounded";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { authActions } from "#/features/auth/authSlice.js";
import styles from "#/layouts/DashboardLayout.module.css";

const drawerWidth = 290;

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardRoundedIcon />
  }
];

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isLoggingOut = useSelector((state) => state.auth.isLoggingOut);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box className={styles.drawerContent}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "secondary.main",
              color: "secondary.contrastText"
            }}
          >
            <LocalHotelRoundedIcon />
          </Avatar>
          <Stack spacing={0.25}>
            <Typography variant="h6">Harbor Desk</Typography>
            <Typography color="text.secondary" variant="body2">
              Hotel control center
            </Typography>
          </Stack>
        </Stack>

        <List disablePadding sx={{ display: "grid", gap: 1 }}>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                className={styles.navItem}
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                selected={isActive}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "primary.main" : "text.secondary",
                    minWidth: 40
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>

        <Paper className={styles.conciergeCard}>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <NightShelterRoundedIcon color="secondary" />
              <Typography variant="subtitle1">Shift focus</Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              Watch arrivals, keep room readiness visible, and respond quickly when
              service slips.
            </Typography>
          </Stack>
        </Paper>
      </Stack>

      <Stack spacing={2.5}>
        <Divider />
        <Stack className={styles.profileCard} spacing={1.5}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {(user?.profile?.name || user?.email || "H").charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={0.25}>
              <Typography variant="subtitle1">
                {user?.profile?.name || "Hotel operator"}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {user?.email}
              </Typography>
            </Stack>
          </Stack>
          <Chip
            color="primary"
            label={`Role: ${user?.role || "staff"}`}
            size="small"
            variant="outlined"
          />
        </Stack>

        <Button
          color="inherit"
          disabled={isLoggingOut}
          onClick={() => dispatch(authActions.logoutRequested())}
          startIcon={<LogoutRoundedIcon />}
          variant="outlined"
        >
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Box className={styles.shell}>
      <AppBar
        className={styles.appBar}
        color="transparent"
        elevation={0}
        position="fixed"
        sx={{
          width: {
            md: `calc(100% - ${drawerWidth}px)`
          },
          ml: {
            md: `${drawerWidth}px`
          }
        }}
      >
        <Toolbar className={styles.toolbar}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              aria-label="open navigation"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: "none" } }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Stack spacing={0.35}>
              <Typography variant="h5">Operations dashboard</Typography>
              <Typography color="text.secondary" variant="body2">
                Coordinate staff, room readiness, and secure team access.
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Chip
              color="secondary"
              label={user?.emailVerified ? "Verified access" : "Verification pending"}
              variant="outlined"
            />
            <Avatar sx={{ bgcolor: "secondary.main", color: "secondary.contrastText" }}>
              {(user?.profile?.name || user?.email || "H").charAt(0).toUpperCase()}
            </Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          ModalProps={{
            keepMounted: true
          }}
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          sx={{
            display: {
              xs: "block",
              md: "none"
            },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
          variant="temporary"
        >
          {drawerContent}
        </Drawer>

        <Drawer
          open
          sx={{
            display: {
              xs: "none",
              md: "block"
            },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
          variant="permanent"
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        className={styles.main}
        component="main"
        sx={{
          width: {
            md: `calc(100% - ${drawerWidth}px)`
          }
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
