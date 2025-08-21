import { useEffect, useMemo, useState } from "react";
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
import useApplicationStore from "../store/applicationStore";
import ApplicationForm from "../components/ApplicationForm";
import { statusOptions, statusColors } from "../constant/seed";
import useGlobalStore from "../store/globalStore";
import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";
import dayjs from "dayjs";
import TopBar from "../components/TopBar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Application = () => {
  const {
    filteredApplications,
    loading,
    filterApplications,
    updateApplication,
    deleteApplications,
  } = useApplicationStore();
  const { online } = useGlobalStore();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const columns = useMemo(
    () => [
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
            onChange={(e) =>
              updateApplication(params.row.id, { status: e.target.value })
            }
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
        headerName: "Date Applied",
        flex: 1,
        renderCell: (params) => dayjs(params.value).format("YYYY-MM-DD"),
      },
      {
        field: "interview_date",
        headerName: "Interview Date",
        flex: 1,
        renderCell: (params) =>
          params.row.status !== "Interview" ? null : (
            <div onClick={(e) => e.stopPropagation()}>
              <DatePicker
                sx={{ mt: "5px" }}
                value={params.value ? dayjs(params.value) : null}
                onChange={(newValue) => {
                  if (newValue) {
                    updateApplication(params.row.id, {
                      interview_date: dayjs(newValue).format("YYYY-MM-DD"),
                    });
                  }
                }}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    size: "small",
                  },
                }}
              />
            </div>
          ),
      },
      {
        field: "Action",
        headerName: "Action",
        renderCell: (params) => (
          <div onClick={(e) => e.stopPropagation()}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "gray.600",
                color: "gray.300",
                boxShadow: "none",
              }}
              onClick={() => {
                console.log(params.row);
                setRowDetails(params.row);
              }}
            >
              Details
            </Button>
          </div>
        ),
      },
    ],
    [statusColors, statusOptions, updateApplication]
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
        {/* SEARCH BAR AND FILTER */}
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                filterApplications(e.target.value, statusFilter);
              }}
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
              onChange={(e) => {
                setStatusFilter(e.target.value);
                filterApplications(searchTerm, e.target.value);
              }}
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

        {/* BUTTONS */}
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
          {selectedRows.length !== 0 ? (
            !online ? (
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
            )
          ) : null}
        </Box>
      </Box>

      {/* TABLE */}
      {!online || loading ? (
        <Box
          height="calc(100vh - 150px)"
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
        <Box height="calc(100vh - 150px)" width="100%">
          <DataGrid
            rows={filteredApplications}
            getRowId={(row) => row.id}
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
              if (selectionModel?.ids) {
                const idsArray = Array.from(selectionModel.ids);
                setSelectedRows(idsArray);
              }
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

      {/* FORM MODAL */}
      {(isFormModalOpen || rowDetails) && (
        <ApplicationForm
          isOpen={isFormModalOpen || rowDetails}
          onClose={() => {
            setIsFormModalOpen(false);
            setRowDetails("");
          }}
          rowDetails={rowDetails}
        />
      )}
    </Box>
  );
};

export default Application;
