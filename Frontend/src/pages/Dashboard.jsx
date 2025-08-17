import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import { Box, Skeleton, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import TopBar from "../components/TopBar";

import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useApplicationStore from "../store/applicationStore";
import dayjs from "dayjs";
import useGlobalStore from "../store/globalStore";

const TwoToneDonutChart = ({ percent }) => {
  const cappedPercent = Math.max(0, Math.min(percent, 100)); // ensures 0 ≤ percent ≤ 100

  const data = [
    { name: "Growth", value: cappedPercent },
    { name: "Remaining", value: 100 - cappedPercent },
  ];

  const COLORS = ["#00C49F", "#b7b6b6ff"]; // green + gray

  return (
    <PieChart width={180} height={180}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={90}
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
  const { online } = useGlobalStore();
  const { loading, applications } = useApplicationStore();
  const [applicationPercent, setApplicationPercent] = useState();
  const [applicationDelta, setApplicationDelta] = useState(0);
  const [lineData, setLineData] = useState([]);
  const [data, setData] = useState([
    { label: "Applied", value: 0, color: "#0088FE" },
    { label: "Interview", value: 0, color: "#FFBB28" },
    { label: "Rejected", value: 0, color: "#ff3f3fff" },
    { label: "Offer", value: 0, color: "#00C49F" },
  ]);

  useEffect(() => {
    filterStatus();
    getApplicationPercentage();
    getApplicationsOverTime();
  }, [applications]);

  const total = data.reduce((acc, item) => acc + (Number(item.value) || 0), 0);

  const filterStatus = () => {
    setData(
      data.map((statusObj) => {
        const count = applications.filter(
          (application) => application.status === statusObj.label
        ).length;
        return { ...statusObj, value: count };
      })
    );
  };

  const getApplicationPercentage = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

    const todayApplications = applications.filter(
      (app) => dayjs(app.date_applied).format("YYYY-MM-DD") === today
    );

    const yesterdayApplications = applications.filter(
      (app) => dayjs(app.date_applied).format("YYYY-MM-DD") === yesterday
    );

    const current = todayApplications.length;
    const previous = yesterdayApplications.length;

    const delta = current - previous;

    const percentage =
      previous === 0
        ? current === 0
          ? 0
          : 100
        : Math.round(((current - previous) / previous) * 100);

    setApplicationPercent(percentage);
    setApplicationDelta(delta);
  };

  const getApplicationsOverTime = () => {
    const grouped = {};

    applications.forEach((app) => {
      const date = dayjs(app.date_applied).format("YYYY-MM-DD");
      grouped[date] = (grouped[date] || 0) + 1;
    });

    const sorted = Object.entries(grouped)
      .sort(([a], [b]) => dayjs(a).diff(dayjs(b)))
      .map(([date, count]) => ({
        date,
        count,
      }));

    setLineData(sorted);
  };

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
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          height="100%"
          width="75%"
        >
          <Box display="flex" alignItems="center" gap={2} height="40%">
            {/* APPLICATION BOX */}
            {!online || loading ? (
              <Skeleton
                variant="rectangular"
                height="100%"
                width="60%"
                animation="wave"
                sx={{ borderRadius: 2 }}
              />
            ) : (
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.palette.gray[800],
                  padding: 4,
                  borderRadius: 2,
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  height: "100%",
                })}
              >
                <Box>
                  <WorkIcon sx={{ color: "#00C49F", fontSize: 25 }} />
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: 550 }}
                    color="gray.500"
                  >
                    {applications.length}
                  </Typography>

                  <Typography variant="h6" color="#00C49F">
                    Total Applications
                  </Typography>
                </Box>
                <Box
                  position="relative"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <Typography
                    variant="h6"
                    color={
                      applicationDelta >= 0 ? "success.main" : "error.main"
                    }
                    sx={{
                      position: "absolute",
                    }}
                  >
                    {applicationDelta >= 0 ? "+" : ""}
                    {applicationDelta} ({applicationDelta >= 0 ? "↑" : "↓"}
                    {Math.abs(applicationPercent)}%)
                  </Typography>
                  <TwoToneDonutChart
                    percent={
                      applicationPercent < 0 ? 0 : applicationPercent ?? 0
                    }
                  />
                </Box>
              </Box>
            )}
            {/* STATUS BOX */}
            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.gray[800],
                padding: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                height: "100%",
                width: "40%",
              })}
            >
              {!online || loading ? (
                <Skeleton
                  variant="rectangular"
                  height={40}
                  width={100}
                  animation="wave"
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircleOutlineIcon
                    sx={{ color: "primary.light", fontSize: 25 }}
                  />
                  <Typography variant="h5" color="primary.light">
                    Status
                  </Typography>
                </Box>
              )}
              {!online || loading ? (
                <Skeleton
                  variant="rectangular"
                  height="100%"
                  width="100%"
                  animation="wave"
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Box
                  flex={2}
                  backgroundColor="gray.900"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={1}
                >
                  <MUIPieChart
                    series={[
                      {
                        innerRadius: 30,
                        outerRadius: 60,
                        data:
                          total === 0
                            ? [{ label: "No Data", value: 1, color: "#D3D3D3" }] // gray circle
                            : data,
                      },
                    ]}
                    width={150}
                    height={150}
                    hideLegend={false}
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.gray[800],
              padding: 4,
              borderRadius: 2,
              width: "100%",
              height: "60%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            })}
          >
            {!online || loading ? (
              <Skeleton
                variant="rectangular"
                height={40}
                width={300}
                animation="wave"
                sx={{ borderRadius: 2 }}
              />
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <AccessTimeFilledIcon
                  sx={{ color: "primary.light", fontSize: 25 }}
                />
                <Typography variant="h5" color="primary.light">
                  Applications Over Time
                </Typography>
              </Box>
            )}
            {!online || loading ? (
              <Skeleton
                variant="rectangular"
                height="100%"
                width="100%"
                animation="wave"
                sx={{ borderRadius: 2 }}
              />
            ) : (
              <Box
                flex={2}
                backgroundColor="gray.900"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius={1}
              >
                <LineChart
                  xAxis={[
                    {
                      scaleType: "point",
                      data: lineData.map((item) => item.date),
                    },
                  ]}
                  series={[
                    {
                      data: lineData.map((item) => item.count),
                    },
                  ]}
                  height={200}
                />
              </Box>
            )}
          </Box>
        </Box>
        {/* RIGHT SIDE */}
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.gray[800],
            padding: 2,
            borderRadius: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          })}
        >
          {loading || !online ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height="100%"
                width="100%"
                animation="wave"
                sx={{ borderRadius: 2 }}
              />
            ))
          ) : (
            <>
              {data.map((data, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  px={4}
                  width="100%"
                  flex={1}
                  backgroundColor="gray.900"
                  borderRadius={2}
                >
                  <Box width="50%">
                    <GaugeContainer
                      width={110}
                      height={100}
                      startAngle={-110}
                      endAngle={110}
                      value={data.value}
                    >
                      <GaugeReferenceArc />
                      <GaugeValueArc style={{ fill: data.color }} />
                    </GaugeContainer>
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      color={data.color}
                      fontWeight={600}
                    >
                      {data.value}
                    </Typography>
                    <Typography variant="span">{data.label}</Typography>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
