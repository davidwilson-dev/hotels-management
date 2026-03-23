import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import MetricCard from "#/components/MetricCard.jsx";
import UserStatusChip from "#/components/UserStatusChip.jsx";
import { dashboardActions } from "#/features/dashboard/dashboardSlice.js";
import styles from "#/pages/DashboardPage.module.css";

const arrivals = [
  {
    guest: "Mia Santos",
    room: "1204",
    eta: "2:10 PM",
    tag: "VIP arrival"
  },
  {
    guest: "Noah Bennett",
    room: "804",
    eta: "3:00 PM",
    tag: "Late airport transfer"
  },
  {
    guest: "Linh Tran",
    room: "616",
    eta: "3:45 PM",
    tag: "Anniversary setup"
  }
];

const serviceBoard = [
  {
    title: "Priority turnovers",
    detail: "8 rooms need housekeeping confirmation before check-in opens."
  },
  {
    title: "Front desk queue",
    detail: "2 pending escalations are waiting for manager follow-up."
  },
  {
    title: "Evening coverage",
    detail: "One additional concierge assignment is recommended after 6 PM."
  }
];

const formatDate = (value) => {
  if (!value) return "Recently updated";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
};

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { users, pagination, status, error, lastUpdated } = useSelector(
    (state) => state.dashboard
  );
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(dashboardActions.fetchOverviewRequested());
    }
  }, [dispatch, status]);

  const metrics = useMemo(() => {
    const totalUsers = pagination?.totalUsers ?? users.length;
    const activeUsers = users.filter((user) => user.isActive).length;
    const verifiedUsers = users.filter((user) => user.emailVerified).length;
    const adminUsers = users.filter((user) => user.role === "admin").length;

    return [
      {
        label: "Managed users",
        value: totalUsers,
        change: "Accounts synced from the secure admin API.",
        icon: <GroupsRoundedIcon />,
        tone: "primary"
      },
      {
        label: "Active team access",
        value: activeUsers,
        change: "Users currently allowed to access hotel operations.",
        icon: <ShieldRoundedIcon />,
        tone: "success"
      },
      {
        label: "Verified accounts",
        value: verifiedUsers,
        change: "Profiles cleared to use password-based login.",
        icon: <ChecklistRoundedIcon />,
        tone: "info"
      },
      {
        label: "Admin coverage",
        value: adminUsers,
        change: "Administrator accounts currently available.",
        icon: <EventAvailableRoundedIcon />,
        tone: "secondary"
      }
    ];
  }, [pagination?.totalUsers, users]);

  return (
    <Stack className={styles.page} spacing={3}>
      <Card className={styles.heroCard}>
        {status === "loading" ? <LinearProgress color="secondary" /> : null}
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={3}
            justifyContent="space-between"
          >
            <Stack spacing={1.25}>
              <Typography variant="h2">
                Good shift, {currentUser?.profile?.name || "team"}.
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
                Track staff access, keep arrivals moving smoothly, and make room
                readiness visible across the operation from one shared dashboard.
              </Typography>
            </Stack>

            <Stack spacing={1.25} alignItems={{ xs: "flex-start", lg: "flex-end" }}>
              <Chip
                color="primary"
                label={`Last sync: ${formatDate(lastUpdated)}`}
                variant="outlined"
              />
              <Button
                onClick={() => dispatch(dashboardActions.fetchOverviewRequested())}
                startIcon={<RefreshRoundedIcon />}
                variant="contained"
              >
                Refresh data
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {error ? <Alert severity="error">{error}</Alert> : null}

      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid item key={metric.label} lg={3} md={6} xs={12}>
            <MetricCard {...metric} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item lg={5} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={2.5}>
                <Stack spacing={0.5}>
                  <Typography variant="h4">Today&apos;s arrivals</Typography>
                  <Typography color="text.secondary">
                    Focus the team on the stays that shape the guest experience most.
                  </Typography>
                </Stack>

                <Stack className={styles.listBlock}>
                  {arrivals.map((arrival) => (
                    <Box className={styles.listItem} key={`${arrival.guest}-${arrival.room}`}>
                      <Stack spacing={0.35}>
                        <Typography variant="subtitle1">{arrival.guest}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          Room {arrival.room} • ETA {arrival.eta}
                        </Typography>
                      </Stack>
                      <Chip label={arrival.tag} size="small" variant="outlined" />
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={7} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={2.5}>
                <Stack spacing={0.5}>
                  <Typography variant="h4">Service board</Typography>
                  <Typography color="text.secondary">
                    Priority items for front office, housekeeping, and management.
                  </Typography>
                </Stack>

                <Stack className={styles.listBlock}>
                  {serviceBoard.map((item) => (
                    <Box className={styles.serviceItem} key={item.title}>
                      <Avatar
                        sx={{
                          width: 44,
                          height: 44,
                          bgcolor: "primary.light",
                          color: "primary.dark"
                        }}
                      >
                        <CleaningServicesRoundedIcon />
                      </Avatar>
                      <Stack spacing={0.35}>
                        <Typography variant="subtitle1">{item.title}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {item.detail}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="space-between"
            sx={{ mb: 2.5 }}
          >
            <Stack spacing={0.5}>
              <Typography variant="h4">Team access overview</Typography>
              <Typography color="text.secondary">
                Real user records fetched from the protected admin API.
              </Typography>
            </Stack>
            <Chip
              label={`Showing ${users.length} of ${pagination?.totalUsers ?? users.length} accounts`}
              variant="outlined"
            />
          </Stack>

          <TableContainer className={styles.tableWrap}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Team member</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length ? (
                  users.map((user) => (
                    <TableRow hover key={user._id || user.id || user.email}>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            {(user.profile?.name || user.email || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </Avatar>
                          <Stack spacing={0.25}>
                            <Typography variant="subtitle2">
                              {user.profile?.name || "No profile name"}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">
                              Created {formatDate(user.createdAt)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ textTransform: "capitalize" }}>
                        {user.role}
                      </TableCell>
                      <TableCell>
                        <UserStatusChip
                          active={user.isActive}
                          verified={user.emailVerified}
                        />
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell align="right">{formatDate(user.updatedAt)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Alert severity="info">
                        No team records have been returned yet. Sign in with an
                        authorized account and verify the admin users endpoint has
                        data.
                      </Alert>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}
