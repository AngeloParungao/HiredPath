import React from "react";
import { Field } from "formik";
import { TextField, InputAdornment, IconButton } from "@mui/material";

const TextInput = ({ name, label, type = "text", startIcon, endIcon }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          variant="outlined"
          error={meta.touched && meta.error}
          helperText={meta.touched && meta.error}
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start">
                <IconButton
                  size="small"
                  color={meta.touched && meta.error ? "error" : "action"}
                >
                  {startIcon}
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: endIcon && (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "primary",
                borderRadius: 5,
              },
              "&:hover fieldset": {
                borderColor: "primary",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary",
              },
            },
          }}
        />
      )}
    </Field>
  );
};

export default TextInput;
