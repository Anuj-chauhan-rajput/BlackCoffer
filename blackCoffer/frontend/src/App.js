import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./components/Login"; // ✅ Update path if needed

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && token && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isLoginPage && token && <Topbar setIsSidebar={setIsSidebar} />}

            <Routes>
              <Route path="/login" element={<Login />} />

              <Route
                path="/"
                element={
                  token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/dashboard"
                element={token ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/team"
                element={token ? <Team /> : <Navigate to="/login" />}
              />
              <Route
                path="/contacts"
                element={token ? <Contacts /> : <Navigate to="/login" />}
              />
              <Route
                path="/invoices"
                element={token ? <Invoices /> : <Navigate to="/login" />}
              />
              <Route
                path="/form"
                element={token ? <Form /> : <Navigate to="/login" />}
              />
              <Route
                path="/bar"
                element={token ? <Bar /> : <Navigate to="/login" />}
              />
              <Route
                path="/pie"
                element={token ? <Pie /> : <Navigate to="/login" />}
              />
              <Route
                path="/line"
                element={token ? <Line /> : <Navigate to="/login" />}
              />
              <Route
                path="/faq"
                element={token ? <FAQ /> : <Navigate to="/login" />}
              />
              <Route
                path="/calendar"
                element={token ? <Calendar /> : <Navigate to="/login" />}
              />
              <Route
                path="/geography"
                element={token ? <Geography /> : <Navigate to="/login" />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
