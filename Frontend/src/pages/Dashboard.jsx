import { PieChart, Pie, Cell } from "recharts";
import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import TopBar from "../components/TopBar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const data = [
  { label: "Group A", value: 400, color: "#0088FE" },
  { label: "Group B", value: 300, color: "#00C49F" },
  { label: "Group C", value: 300, color: "#FFBB28" },
  { label: "Group D", value: 200, color: "#FF8042" },
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

  const COLORS = ["#4caf50", "#2c2c2cff"]; // green + gray

  return (
    <PieChart width={150} height={150}>
      <Pie
        data={data}
        innerRadius={40}
        outerRadius={70}
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
      <Box display="flex" gap={2} height="calc(100vh - 100px)">
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          height="100%"
          flex={1}
        >
          <Box display="flex" alignItems="center" gap={2} height="50%">
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
                <WorkIcon />
                <Typography variant="h3" color="secondary">
                  40
                </Typography>

                <Typography variant="h5" color="secondary">
                  Applications
                </Typography>
              </Box>
              <Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <TwoToneDonutChart percent={14} />
                  <Typography variant="body2" color="success.main">
                    +14%
                  </Typography>
                </Box>
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
              <Typography variant="h4" color="gray.600">
                Status
              </Typography>
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
              padding: 2,
              borderRadius: 2,
              width: "100%",
              height: "50%",
            })}
          >
            <Typography variant="h5" color="gray.600">
              Applications Over Time
            </Typography>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              height={250}
            />
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.gray[900],
            padding: 2,
            borderRadius: 2,
            height: "100%",
            width: "30%",
          })}
        ></Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
