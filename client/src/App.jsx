import React from 'react'
import './App.css'

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Auth
import Login_Page from './features/auth/pages/login/Login.jsx';

// Layout wrapper
import MainLayout from './layouts/MainLayout.jsx';

// Pages
import Home from './features/home/Home.jsx';
import EmployeeList from './features/employees/pages/employeeList/EmployeeList.jsx';
import EmployeeProfile from './features/employees/pages/employeeProfile/EmployeeProfile.jsx';

// ── Placeholder for pages not yet built ──
// You can replace these one by one as you build each page
const Placeholder = ({ title }) => (
  <div style={{
    padding: "32px 28px",
    color: "#f0d080",
    fontFamily: "'Georgia', serif",
    fontSize: 18,
  }}>
    <div style={{
      display: "flex", alignItems: "center", gap: 12, marginBottom: 8
    }}>
      <div style={{
        width: 4, height: 28, borderRadius: 2,
        background: "linear-gradient(180deg,#c9a84c,#8b6914)"
      }} />
      {title}
    </div>
    <div style={{ color: "#4a7a9b", fontSize: 12, paddingLeft: 16 }}>
      This page is under construction.
    </div>
  </div>
);

const router = createBrowserRouter([
  // ── Public route ──
  { path: "/", element: <Login_Page /> },

  // ── Protected routes — all wrapped by MainLayout ──
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "home", element: <Home /> },

      // Employees
      { path: "employees/employee-list", element: <EmployeeList /> },
      { path: "employees/employee-profile", element: <EmployeeProfile /> },
      { path: "employees/departments", element: <Placeholder title="Departments" /> },
      { path: "employees/designations", element: <Placeholder title="Designations" /> },

      // Recruitment
      { path: "recruitment/job-postings", element: <Placeholder title="Job Postings" /> },
      { path: "recruitment/applications", element: <Placeholder title="Applications" /> },
      { path: "recruitment/interviews", element: <Placeholder title="Interviews" /> },

      // Attendance
      { path: "attendance/daily-attendance", element: <Placeholder title="Daily Attendance" /> },
      { path: "attendance/attendance-report", element: <Placeholder title="Attendance Report" /> },

      // Leave
      { path: "leave/apply", element: <Placeholder title="Apply Leave" /> },
      { path: "leave/requests", element: <Placeholder title="Leave Requests" /> },
      { path: "leave/balance", element: <Placeholder title="Leave Balance" /> },

      // Payroll
      { path: "payroll/salary", element: <Placeholder title="Salary Processing" /> },
      { path: "payroll/payslip", element: <Placeholder title="Payslips" /> },
      { path: "payroll/tax", element: <Placeholder title="Tax Deductions" /> },

      // Medical
      { path: "medical/records", element: <Placeholder title="Medical Records" /> },
      { path: "medical/claims", element: <Placeholder title="Health Claims" /> },

      // Organization
      { path: "organization/org-chart", element: <Placeholder title="Org Chart" /> },
      { path: "organization/branches", element: <Placeholder title="Branches" /> },

      // Single pages
      { path: "documents", element: <Placeholder title="Documents" /> },
      { path: "appraisal", element: <Placeholder title="Appraisal" /> },
      { path: "reports", element: <Placeholder title="Reports" /> },
      { path: "compliance", element: <Placeholder title="Compliance" /> },
      { path: "settings", element: <Placeholder title="Settings" /> },

      // Catch-all redirect inside layout
      { path: "*", element: <Navigate to="/home" replace /> },
    ],
  },

  // Catch-all for unknown top-level paths
  { path: "*", element: <Navigate to="/" replace /> },
]);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;