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
  Box,
  FormLabel,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
import { statusOptions, statusColors } from "../constant/seed";
import useApplicationStore from "../store/applicationStore";

const ApplicationForm = ({ isOpen, onClose, rowDetails }) => {
  const { loading, error, createApplication } = useApplicationStore();
  const [descriptionType, setDescriptionType] = useState(
    rowDetails?.description ? "Text" : rowDetails?.image_url ? "Image" : "Text"
  );
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    job_title: rowDetails?.job_title ?? "",
    company: rowDetails?.company ?? "",
    status: rowDetails?.status ?? "",
    description: rowDetails?.description ?? "",
    image_url: rowDetails?.image_url ?? "",
    date_applied: dayjs(rowDetails?.date_applied) ?? dayjs(),
    interview_date: dayjs(rowDetails?.interview_date) ?? null,
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

    const formData = new FormData();

    formData.append("job_title", form.job_title);
    formData.append("company", form.company);
    formData.append("status", form.status);
    formData.append("date_applied", form.date_applied.format("YYYY-MM-DD"));

    if (form.status === "Interview" && form.interview_date) {
      formData.append(
        "interview_date",
        form.interview_date.format("YYYY-MM-DD")
      );
    }

    if (descriptionType === "Text") {
      formData.append("description", description);
    }

    if (file) {
      formData.append("file", file); // must match upload.single("file")
    }

    await createApplication(formData);

    if (!error) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {rowDetails ? "Application Details" : "Add New Application"}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
          // Enable scrollbar styling
          "&::-webkit-scrollbar": {
            width: "7px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "gray.600",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray.400",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "gray.300",
          },
        }}
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

        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormLabel>Description</FormLabel>
            <Select
              value={descriptionType}
              onChange={(e) => setDescriptionType(e.target.value)}
              size="small"
              sx={(theme) => ({
                backgroundColor: theme.palette.gray[700],
              })}
            >
              {["Text", "Image"].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {descriptionType === "Text" ? (
            <TextField
              fullWidth
              label="Description"
              margin="dense"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          ) : (
            <Box>
              <Box
                position="relative"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                border="1px dashed #828282ff"
                borderRadius={1}
                padding={4}
                gap={2}
              >
                {(file || form.image_url) && (
                  <img
                    src={file ? URL.createObjectURL(file) : form.image_url}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}
                {!rowDetails && (
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      position: "absolute",
                      backgroundColor: "gray.700",
                      boxShadow: "none",
                    }}
                  >
                    Upload File
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0]); // store actual file object
                        }
                      }}
                    />
                  </Button>
                )}
                {file && (
                  <Typography variant="body2" gutterBottom>
                    {file.name}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>

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

      {!rowDetails && (
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ApplicationForm;
