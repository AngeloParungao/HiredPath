import { PieChart, Pie, Cell } from "recharts";
import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import TopBar from "../components/TopBar";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const data = [
  { label: "Applied", value: 400, color: "#0088FE" },
  { label: "Offer", value: 300, color: "#00C49F" },
  { label: "Interview", value: 300, color: "#FFBB28" },
  { label: "Rejected", value: 200, color: "#FF8042" },
];

const settings = {
  width: 180,
  height: 180,
  hideLegend: false,
};

const TwoToneDonutChart = ({ percent = 14 }) => {
  const data = [
    { name: "Growth", value: percent },
    { name: "Remaining", value: 100 - percent },
  ];

  const COLORS = ["#00C49F", "#b7b6b6ff"]; // green + gray

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={100}
        paddingAngle={0}
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

const Dashboard = () => {
  return (
    <Box
      minHeight="100vh"
      px={4}
      py={2}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TopBar header="Dashboard" />
      <Box display="flex" gap={2} height="calc(100vh - 90px)">
        <Box display="flex" flexDirection="column" gap={2} height="100%">
          <Box display="flex" alignItems="center" gap={2} height="48%">
            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.gray[900],
                padding: 4,
                borderRadius: 2,
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                gap: 2,
                height: "100%",
              })}
            >
              <Box>
                <WorkIcon sx={{ color: "#00C49F", fontSize: 35 }} />
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 550 }}
                  color="gray.500"
                >
                  40
                </Typography>

                <Typography variant="h5" color="#00C49F">
                  Applications
                </Typography>
              </Box>
              <Box display="flex" alignItems="end">
                <TwoToneDonutChart percent={14} />
                <Typography variant="h6" color="success.main">
                  +14%
                </Typography>
              </Box>
            </Box>
            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.gray[900],
                padding: 4,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
                width: "40%",
              })}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <CheckCircleOutlineIcon
                  sx={{ color: "primary.light", fontSize: 30 }}
                />
                <Typography variant="h5" color="primary.light">
                  Status
                </Typography>
              </Box>
              <MUIPieChart
                series={[
                  { innerRadius: 40, outerRadius: 90, data, arcLabel: "value" },
                ]}
                {...settings}
              />
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.gray[900],
              padding: 4,
              borderRadius: 2,
              width: "100%",
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
            })}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <AccessTimeIcon sx={{ color: "primary.light", fontSize: 30 }} />
              <Typography variant="h5" color="primary.light">
                Applications Over Time
              </Typography>
            </Box>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              height={220}
            />
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.gray[900],
            padding: 2,
            borderRadius: 2,
            flex: 1,
            width: "30%",
          })}
        ></Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
