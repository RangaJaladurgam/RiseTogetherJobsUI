import react from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import HeaderBar from "./components/HeaderBar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />

        {/* Protected Routes */}

        {/* Redirect unknown routes to login */}
        
      </Routes>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <Router>
      <div className="app-container">
        <HeaderBar />
        <div className="main-container">
          <App />
        </div>
      </div>
    </Router>
  );
};

export default AppWrapper;
