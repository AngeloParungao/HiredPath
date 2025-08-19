import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Application from "./pages/Application";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Layout from "./layout/Layout";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import SnackBar from "./components/SnackBar";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <SnackBar />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Auth />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/application" element={<Application />} />
            <Route path="/notification" element={<Notification />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
