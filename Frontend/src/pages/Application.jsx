import { useEffect, useState } from "react";
import {
  Typography,
  Select,
  MenuItem,
  Chip,
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Skeleton, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import useApplicationStore from "../store/applicationStore";
import ApplicationForm from "../components/ApplicationForm";
import { statusOptions, statusColors } from "../constant/seed";
import useGlobalStore from "../store/globalStore";
import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";
import dayjs from "dayjs";

const Application = () => {
  const { applications, loading, fetchApplications } = useApplicationStore();
  const { online } = useGlobalStore();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const shouldShowSkeleton = loading || !online;

  useEffect(() => {
    fetchApplications(1);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  const columns = [
    {
      field: "job_title",
      headerName: shouldShowSkeleton ? (
        <Skeleton variant="text" width={100} height={40} animation="wave" />
      ) : (
        "Job Title"
      ),
      flex: 1,
      renderCell: (params) =>
        shouldShowSkeleton ? (
          <Skeleton variant="text" width="100%" animation="wave" />
        ) : (
          params.value
        ),
    },
    {
      field: "company",
      headerName: shouldShowSkeleton ? (
        <Skeleton variant="text" width={100} height={40} animation="wave" />
      ) : (
        "Company"
      ),
      flex: 1,
      renderCell: (params) =>
        shouldShowSkeleton ? (
          <Skeleton variant="text" width="100%" animation="wave" />
        ) : (
          params.value
        ),
    },
    {
      field: "status",
      headerName: shouldShowSkeleton ? (
        <Skeleton variant="text" width={100} height={40} animation="wave" />
      ) : (
        "Status"
      ),
      flex: 1,
      renderCell: (params) =>
        shouldShowSkeleton ? (
          <Skeleton variant="text" width="100%" animation="wave" />
        ) : (
          <Select
            value={params.value}
            onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
            size="small"
            sx={{
              minWidth: 110,
              color: (theme) =>
                theme.palette[statusColors[params.value]].contrastText,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
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
        ),
    },
    {
      field: "date_applied",
      headerName: shouldShowSkeleton ? (
        <Skeleton variant="text" width={100} height={40} animation="wave" />
      ) : (
        "Date Applied"
      ),
      flex: 1,
      renderCell: (params) =>
        shouldShowSkeleton ? (
          <Skeleton variant="text" width="100%" animation="wave" />
        ) : (
          dayjs(params.value).format("YYYY-MM-DD")
        ),
    },
  ];

  const filteredRows = applications
    .filter((row) => {
      const searchText = searchTerm.toLowerCase();
      const matchesSearch =
        row.job_title.toLowerCase().includes(searchText) ||
        row.company.toLowerCase().includes(searchText);
      const matchesStatus = statusFilter ? row.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    })
    .map((row) => ({
      ...row,
      id: row.id,
    }));

  return (
    <Box
      minHeight="100vh"
      px={4}
      py={2}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h4" gutterBottom sx={{ ml: 5 }}>
        Job Applications
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          {shouldShowSkeleton ? (
            <Skeleton
              variant="rectangular"
              height={40}
              width={300}
              animation="wave"
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <TextField
              size="small"
              placeholder="Search job title or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              sx={(theme) => ({
                width: 300,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 10,
                  backgroundColor: theme.palette.gray[800],
                },
              })}
            />
          )}

          {shouldShowSkeleton ? (
            <Skeleton
              variant="rectangular"
              height={40}
              width={150}
              animation="wave"
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              size="small"
              sx={(theme) => ({
                backgroundColor: theme.palette.gray[900],
              })}
            >
              <MenuItem value="">All Status</MenuItem>
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
          )}
        </Box>
        <Box display="flex" gap={2}>
          {shouldShowSkeleton ? (
            <Skeleton
              variant="rectangular"
              height={40}
              width={150}
              animation="wave"
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <Button
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              onClick={() => setIsFormModalOpen(true)}
            >
              Add Application
            </Button>
          )}
          {shouldShowSkeleton ? (
            <Skeleton
              variant="rectangular"
              height={40}
              width={40}
              animation="wave"
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <IconButton>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      {shouldShowSkeleton ? (
        <Box
          height="calc(100vh - 160px)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={4}
          border="1px solid #515151"
          borderRadius="1rem"
        >
          <Waveform size="50" stroke="6" speed="1" color="#515151" />
          <Typography sx={{ color: "#515151" }}>
            Loading Applications
          </Typography>
        </Box>
      ) : (
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          sx={(theme) => ({
            backgroundColor: theme.palette.gray[900],
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.primary.main,
              "& .MuiDataGrid-menuIcon": {
                color: theme.palette.primary.contrastText,
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme.palette.primary.contrastText,
              },
              "& .MuiDataGrid-iconButtonContainer": {
                color: theme.palette.primary.contrastText,
              },
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: theme.palette.primary.main,
              color: "white",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiSelect-select, & .MuiSvgIcon-root":
                {
                  color: theme.palette.common.white,
                },
            },
            "& .MuiDataGrid-row": {
              "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.background.paper,
              },
              "&:nth-of-type(even)": {
                backgroundColor: theme.palette.action.hover,
              },
              "&:hover": {
                backgroundColor: theme.palette.action.selected,
              },
            },
          })}
        />
      )}

      {isFormModalOpen && (
        <ApplicationForm
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default Application;
