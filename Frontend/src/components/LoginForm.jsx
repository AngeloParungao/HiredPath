import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, IconButton } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

import TextInput from "./TextInput";
import useAuthStore from "../store/authStore";

const LoginForm = () => {
  const { handleLogin } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextInput
              name="email"
              type="email"
              label="Email Address"
              startIcon={<Email />}
            />

            <TextInput
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              startIcon={<Lock />}
              endIcon={
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                mt: 1,
                py: 1.5,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              }}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
