import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function MetricCard({
  icon,
  label,
  value,
  change,
  tone = "primary"
}) {
  return (
    <Card
      sx={{
        height: "100%",
        background: (theme) =>
          `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.96)} 0%, ${alpha(
            theme.palette[tone].light,
            0.16
          )} 100%)`
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Stack alignItems="center" direction="row" justifyContent="space-between">
            <Avatar
              sx={{
                bgcolor: (theme) => alpha(theme.palette[tone].main, 0.14),
                color: `${tone}.main`,
                width: 52,
                height: 52
              }}
            >
              {icon}
            </Avatar>
            <Typography color="text.secondary" variant="body2">
              {label}
            </Typography>
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="h3">{value}</Typography>
            <Typography color="text.secondary" variant="body2">
              {change}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
