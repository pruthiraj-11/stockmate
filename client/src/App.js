import "./App.css";
import Dashboard from "./views/Dashboard";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Inventory from "./views/Inventory";
import ManageStores from "./views/ManageStores";
import DashHome from "./views/DashHome";
import Sales from "./views/Sales";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<DashHome />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/managestores" element={<ManageStores />} />
        <Route path="/sales" element={<Sales />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
