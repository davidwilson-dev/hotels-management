import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { authActions } from "#/features/auth/authSlice.js";
import styles from "#/pages/LoginPage.module.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, isLoggingIn, error } = useSelector((state) => state.auth);
  const nextPath = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if (status === "authenticated") {
      navigate(nextPath, {
        replace: true
      });
    }
  }, [navigate, nextPath, status]);

  const onSubmit = (values) => {
    dispatch(authActions.loginRequested(values));
  };

  return (
    <Card className={styles.card}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h3">Welcome back</Typography>
            <Typography color="text.secondary" variant="body1">
              Sign in to manage hotel operations, team access, and the daily guest
              experience.
            </Typography>
          </Stack>

          <Box className={styles.note}>
            <ShieldRoundedIcon color="secondary" />
            <Typography color="text.secondary" variant="body2">
              The server keeps the refresh token in a secure cookie and returns a
              short-lived access token for authenticated requests.
            </Typography>
          </Box>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.25}>
              <TextField
                autoComplete="email"
                error={Boolean(errors.email)}
                fullWidth
                helperText={errors.email?.message}
                label="Email address"
                onFocus={() => dispatch(authActions.clearAuthError())}
                {...register("email", {
                  required: "Email is required"
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                autoComplete="current-password"
                error={Boolean(errors.password)}
                fullWidth
                helperText={errors.password?.message}
                label="Password"
                onFocus={() => dispatch(authActions.clearAuthError())}
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />

              <Button
                disabled={isLoggingIn}
                size="large"
                type="submit"
                variant="contained"
              >
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </Button>
            </Stack>
          </Box>

          <Stack className={styles.footerMeta} spacing={1}>
            <Typography color="text.secondary" variant="body2">
              Recommended for admin and staff accounts issued by the hotel backend.
            </Typography>
            <Typography color="text.secondary" variant="body2">
              After sign-in, the app refreshes your access token automatically with
              the secure cookie the server sends.
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
