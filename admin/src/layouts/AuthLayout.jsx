import BalconyRoundedIcon from "@mui/icons-material/BalconyRounded";
import LocalHotelRoundedIcon from "@mui/icons-material/LocalHotelRounded";
import RoomServiceRoundedIcon from "@mui/icons-material/RoomServiceRounded";
import { Box, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import styles from "#/layouts/AuthLayout.module.css";

const highlightItems = [
  {
    label: "Rooms ready by 2 PM",
    value: "96%"
  },
  {
    label: "Guest requests answered",
    value: "< 5 min"
  },
  {
    label: "Ops handoff accuracy",
    value: "99.2%"
  }
];

export default function AuthLayout() {
  return (
    <Box className={styles.shell}>
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
          py: {
            xs: 3,
            md: 5
          },
          display: "flex",
          alignItems: "center",
          position: "relative"
        }}
      >
        <Paper className={styles.frame}>
          <Box className={styles.heroPane}>
            <Stack spacing={3.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box className={styles.brandBadge}>
                  <LocalHotelRoundedIcon />
                </Box>
                <Stack spacing={0.25}>
                  <Typography variant="h5">Harbor Desk</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Hotels management web app
                  </Typography>
                </Stack>
              </Stack>

              <Chip
                color="secondary"
                icon={<RoomServiceRoundedIcon />}
                label="Secure back-office access"
                sx={{ alignSelf: "flex-start" }}
              />

              <Stack spacing={2}>
                <Typography variant="h1">
                  Keep arrivals, staffing, and service recovery in one calm control
                  room.
                </Typography>
                <Typography color="text.secondary" variant="body1">
                  This admin space is designed for hotel teams that need quick
                  visibility, clean operational workflows, and secure access for
                  every shift.
                </Typography>
              </Stack>

              <Stack className={styles.highlightGrid}>
                {highlightItems.map((item) => (
                  <Box className={styles.highlightTile} key={item.label}>
                    <Typography color="text.secondary" variant="body2">
                      {item.label}
                    </Typography>
                    <Typography variant="h4">{item.value}</Typography>
                  </Box>
                ))}
              </Stack>

              <Paper className={styles.storyCard}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <BalconyRoundedIcon color="secondary" />
                  <Typography color="text.secondary" variant="body2">
                    From front desk to housekeeping coordination, every log in
                    opens the same operational picture for your team.
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Box>

          <Box className={styles.formPane}>
            <Outlet />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
