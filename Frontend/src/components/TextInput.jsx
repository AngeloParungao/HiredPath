import React from "react";
import { Field } from "formik";
import { InputAdornment, TextField } from "@mui/material";

const TextInput = ({
  name,
  label,
  type = "text",
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <TextField
          {...field}
          {...props}
          label={label}
          type={type}
          variant="outlined"
          fullWidth
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start">
                {React.cloneElement(startIcon, {
                  color: meta.touched && meta.error ? "error" : "action",
                })}
              </InputAdornment>
            ),
            endAdornment: endIcon && (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            ),
          }}
        />
      )}
    </Field>
  );
};

export default TextInput;
