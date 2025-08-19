import { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography, Paper, IconButton } from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";

import useAuthStore from "../store/authStore";
import TextInput from "../components/TextInput";

const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const resetSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const result = await resetPassword(token, values);

    setSubmitting(false);
    if (result) {
      resetForm();
      window.location.href = "/login";
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0aff", // solid color behind
        backgroundImage: "url(/assets/images/HIREDPATH.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: 600,
          maxHeight: "95vh",
          padding: 4,
          borderRadius: 5,
          overflow: "auto",
          background: "white",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box textAlign="center" mb={2} height="100%" overflow="auto">
          <Box>
            <img
              src="/assets/images/HiredPathLogo.png"
              alt="HiredPath"
              height={40}
            />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#217cc5",
                mb: 1,
              }}
            >
              Welcome
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Reset your Password
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={resetSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  startIcon={<Lock fontSize="small" />}
                  endIcon={
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  }
                />

                <TextInput
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  startIcon={<Lock fontSize="small" />}
                  endIcon={
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  }
                />

                <Box display="flex" flexDirection="column" gap={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      mt: 1,
                      py: 1.5,
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      // boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                    }}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
