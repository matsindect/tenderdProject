import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard";
import MainScreen from "./layouts/mainscreen/mainscreen";
import Vehicles from "./components/Vehicles";
import Logs from "./components/MaintainanceRecord";
const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<MainScreen />}>
      <Route path="/" element={<Navigate replace to="dashboard" />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/vehicles" element={<Vehicles />}></Route>
      <Route path="/logs" element={<Logs />}></Route>
    </Route>
  </Routes>
);

export default MainRoutes;
