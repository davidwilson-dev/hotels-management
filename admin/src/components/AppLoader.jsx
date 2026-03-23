import LocalHotelRoundedIcon from "@mui/icons-material/LocalHotelRounded";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function AppLoader({ message = "Loading your workspace..." }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 3
      }}
    >
      <Stack alignItems="center" spacing={2.5} sx={{ textAlign: "center" }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "24px",
            display: "grid",
            placeItems: "center",
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            boxShadow: (theme) => `0 18px 45px ${theme.palette.secondary.light}`
          }}
        >
          <LocalHotelRoundedIcon fontSize="large" />
        </Box>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h5">Harbor Desk</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 320 }}>
            {message}
          </Typography>
        </Stack>
        <CircularProgress color="primary" size={30} />
      </Stack>
    </Box>
  );
}
