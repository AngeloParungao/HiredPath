import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
import { statusOptions, statusColors } from "../constant/seed";
import useApplicationStore from "../store/applicationStore";

const ApplicationForm = ({ isOpen, onClose }) => {
  const { loading, error, createApplication } = useApplicationStore();
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    job_title: "",
    company: "",
    status: "",
    date_applied: dayjs(),
    interview_date: null,
  });

  const handleSubmit = async () => {
    const newErrors = {
      job_title: !form.job_title,
      company: !form.company,
      status: !form.status,
      interview_date: form.status === "Interview" && !form.interview_date,
    };

    if (Object.values(newErrors).some(Boolean)) {
      setFormErrors(newErrors);
      return;
    }

    const formattedData = {
      ...form,
      date_applied: form.date_applied.format("YYYY-MM-DD"),
    };

    await createApplication(formattedData);

    if (!error) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Application</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          fullWidth
          label="Job Title"
          margin="dense"
          variant="outlined"
          value={form.job_title}
          onChange={(e) => {
            setFormErrors({ ...formErrors, job_title: "" });
            setForm({ ...form, job_title: e.target.value });
          }}
          error={formErrors.job_title}
          helperText={formErrors.job_title ? "Job title is required" : ""}
        />

        <TextField
          fullWidth
          label="Company"
          margin="dense"
          variant="outlined"
          value={form.company}
          onChange={(e) => {
            setFormErrors({ ...formErrors, company: "" });
            setForm({ ...form, company: e.target.value });
          }}
          error={formErrors.company}
          helperText={formErrors.company ? "Company is required" : ""}
        />

        <FormControl fullWidth error={formErrors.status} size="medium">
          <InputLabel>Status</InputLabel>
          <Select
            value={form.status}
            label="Status"
            onChange={(e) => {
              setFormErrors({ ...formErrors, status: "" });
              setForm({ ...form, status: e.target.value });
            }}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                <Chip
                  label={status}
                  color={statusColors[status]}
                  size="small"
                />
              </MenuItem>
            ))}
          </Select>
          {formErrors.status && (
            <FormHelperText>Status is required</FormHelperText>
          )}
        </FormControl>

        <DatePicker
          label="Date Applied"
          value={form.date_applied}
          onChange={(newValue) => {
            setForm({
              ...form,
              date_applied: newValue,
              interview_date: form.status === "Interview" ? dayjs() : null,
            });
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              margin: "dense",
            },
          }}
        />

        {form.status === "Interview" && (
          <DatePicker
            label="Interview Date"
            value={form.interview_date}
            onChange={(newValue) => {
              setFormErrors({ ...formErrors, interview_date: "" });
              setForm({ ...form, interview_date: newValue });
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined",
                margin: "dense",
                error: formErrors.interview_date,
                helperText: formErrors.interview_date
                  ? "Interview date is required"
                  : "",
              },
            }}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationForm;
