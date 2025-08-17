import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, IconButton } from "@mui/material";
import {
  Email,
  Lock,
  Person,
  Phone,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import TextInput from "./TextInput";
import useAuthStore from "../store/authStore";

const RegisterForm = () => {
  const { handleRegister } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const signupSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    contactNo: Yup.string()
      .matches(/^[0-9]{11}$/, "Contact No. must be 11 digits")
      .required("Contact No. is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleRegister}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextInput
                name="firstName"
                label="First Name"
                startIcon={<Person fontSize="small" />}
              />
              <TextInput
                name="lastName"
                label="Last Name"
                startIcon={<Person fontSize="small" />}
              />
              <TextInput
                name="contactNo"
                label="Contact Number"
                startIcon={<Phone fontSize="small" />}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Box>

            <TextInput
              name="email"
              type="email"
              label="Email Address"
              startIcon={<Email fontSize="small" />}
            />

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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                py: 1.5,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              }}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
