import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import HeaderBar from "./components/HeaderBar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PostJob from "./components/PostJob";
import AdminShowJobs from "./components/AdminShowJobs";
import UpdatePostJob from "./components/UpdatePostJob";

function App({ isLoggedIn, setIsLoggedIn, handleLogout }) {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/admins/register" element={<Register />} />
        <Route path="/admins/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />


        {/* Protected Routes */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/admins/dashboard" element={<AdminDashboard />} />
          <Route path="/admins/post-job" element={<PostJob />} />
          <Route path="/admins/show-jobs" element={<AdminShowJobs />} />
          <Route path="/admins/update-job/:jobPostId" element={<UpdatePostJob />} />
        </Route>

        {/* Redirect unknown routes to login */}
      </Routes>
    </div>
  );
}

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/admins/login"; // Redirect to login
  };

  return (
    <Router>
      <div className="app-container">
        <HeaderBar />
        <div className="main-container">
          <App
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </Router>
  );
};

export default AppWrapper;
