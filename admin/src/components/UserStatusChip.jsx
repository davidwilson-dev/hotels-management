import { Chip } from "@mui/material";

export default function UserStatusChip({ active, verified }) {
  if (!active) {
    return <Chip color="error" label="Locked" size="small" variant="outlined" />;
  }

  if (!verified) {
    return <Chip color="warning" label="Pending verification" size="small" />;
  }

  return <Chip color="success" label="Active" size="small" />;
}
