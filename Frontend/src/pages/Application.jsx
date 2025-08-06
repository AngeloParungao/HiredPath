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
import TopBar from "../components/TopBar";

const Application = () => {
  const {
    applications,
    loading,
    fetchApplications,
    updateApplication,
    deleteApplications,
  } = useApplicationStore();
  const { online } = useGlobalStore();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchApplications(1);
  }, []);

  const columns = [
    {
      field: "job_title",
      headerName: "Job Title",
      flex: 1,
      renderCell: (params) => params.value,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      renderCell: (params) => params.value,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => updateApplication(params.row.id, e.target.value)}
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
              <Chip label={status} color={statusColors[status]} size="small" />
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "date_applied",
      headerName: "Date Applied",
      flex: 1,
      renderCell: (params) => dayjs(params.value).format("YYYY-MM-DD"),
    },
  ];

  const filteredRows = applications.filter(
    (row) =>
      (searchTerm
        ? row.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.company.toLowerCase().includes(searchTerm.toLowerCase())
        : true) && (statusFilter ? row.status === statusFilter : true)
  );

  return (
    <Box
      minHeight="100vh"
      px={4}
      py={2}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TopBar header="Job Applications" />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          {!online ? (
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
                  backgroundColor: theme.palette.gray[800],
                },
              })}
            />
          )}

          {!online ? (
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
                backgroundColor: theme.palette.gray[800],
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
          {!online ? (
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
          {!online ? (
            <Skeleton
              variant="rectangular"
              height={40}
              width={40}
              animation="wave"
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <IconButton onClick={() => deleteApplications(selectedRows)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      {!online || loading ? (
        <Box
          height="calc(100vh - 160px)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={4}
          borderRadius="1rem"
          sx={(theme) => ({
            backgroundColor: theme.palette.gray[800],
          })}
        >
          <Waveform size="50" stroke="6" speed="1" color="#515151" />
          <Typography sx={{ color: "#515151" }}>
            Loading Applications
          </Typography>
        </Box>
      ) : (
        <Box height="calc(100vh - 160px)" width="100%">
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[15]}
            checkboxSelection
            onRowSelectionModelChange={(selectionModel) => {
              const ids = Array.from(selectionModel || []);
              setSelectedRows(ids);
            }}
            sx={(theme) => ({
              backgroundColor: theme.palette.gray[900],
              border: "none",
              overflowY: "auto",
              "& .MuiDataGrid-scrollbar": {
                display: "none",
              },

              "& .MuiDataGrid-columnHeaders": {
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
                "& .MuiDataGrid-scrollbarFiller": {
                  backgroundColor: theme.palette.primary.main,
                },
                "& .MuiSvgIcon-root": {
                  color: theme.palette.primary.contrastText,
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme.palette.primary.contrastText,
                },
                "& .MuiDataGrid-iconButtonContainer": {
                  color: theme.palette.primary.contrastText,
                },
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
                "& .MuiSvgIcon-root": {
                  color: theme.palette.primary.light,
                },
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
        </Box>
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
