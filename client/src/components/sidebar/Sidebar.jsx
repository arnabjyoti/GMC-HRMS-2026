import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  UserAddOutlined,
  CalendarOutlined,
  FileTextOutlined,
  DollarOutlined,
  BarChartOutlined,
  ApartmentOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  SolutionOutlined,
  ClockCircleOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  {
    key: "employees",
    icon: <TeamOutlined />,
    label: "Employees",
    children: [
      { key: "employee-list", label: "Employee List" },
      { key: "employee-profile", label: "Employee Profile" },
      { key: "departments", label: "Departments" },
      { key: "designations", label: "Designations" },
    ],
  },
  {
    key: "recruitment",
    icon: <UserAddOutlined />,
    label: "Recruitment",
    children: [
      { key: "job-postings", label: "Job Postings" },
      { key: "applications", label: "Applications" },
      { key: "interviews", label: "Interviews" },
    ],
  },
  {
    key: "attendance",
    icon: <ClockCircleOutlined />,
    label: "Attendance",
    children: [
      { key: "daily-attendance", label: "Daily Attendance" },
      { key: "attendance-report", label: "Attendance Report" },
    ],
  },
  {
    key: "leave",
    icon: <CalendarOutlined />,
    label: "Leave Management",
    children: [
      { key: "leave-apply", label: "Apply Leave" },
      { key: "leave-requests", label: "Leave Requests" },
      { key: "leave-balance", label: "Leave Balance" },
    ],
  },
  {
    key: "payroll",
    icon: <DollarOutlined />,
    label: "Payroll",
    children: [
      { key: "salary", label: "Salary Processing" },
      { key: "payslip", label: "Payslips" },
      { key: "tax", label: "Tax Deductions" },
    ],
  },
  {
    key: "medical",
    icon: <MedicineBoxOutlined />,
    label: "Medical",
    children: [
      { key: "medical-records", label: "Medical Records" },
      { key: "health-claims", label: "Health Claims" },
    ],
  },
  {
    key: "organization",
    icon: <ApartmentOutlined />,
    label: "Organization",
    children: [
      { key: "org-chart", label: "Org Chart" },
      { key: "branches", label: "Branches" },
    ],
  },
  { key: "documents", icon: <FileTextOutlined />, label: "Documents" },
  { key: "appraisal", icon: <SolutionOutlined />, label: "Appraisal" },
  { key: "reports", icon: <BarChartOutlined />, label: "Reports" },
  { key: "compliance", icon: <SafetyCertificateOutlined />, label: "Compliance" },
  { key: "settings", icon: <SettingOutlined />, label: "Settings" },
];

export default function Sidebar({ collapsed, onCollapse }) {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={230}
      collapsedWidth={64}
      style={{
        /* Deep navy gradient — matches navbar left edge */
        background: "linear-gradient(180deg, #0a1520 0%, #0d1b2a 40%, #0f1e30 100%)",
        borderRight: "1px solid #1e3a50",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* ── Brand Header ── */}
      <div
        style={{
          padding: collapsed ? "18px 8px" : "18px 16px",
          borderBottom: "1px solid #1e3a50",
          textAlign: "center",
          background: "linear-gradient(180deg, #06101a 0%, #0a1520 100%)",
          transition: "all 0.3s",
        }}
      >
        {/* Emblem circle */}
        <div
          style={{
            width: collapsed ? 36 : 52,
            height: collapsed ? 36 : 52,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #8b6914 0%, #e2c060 55%, #8b6914 100%)",
            border: "2px solid #c9a84c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            fontSize: collapsed ? 16 : 22,
            color: "#0a1520",
            boxShadow: "0 0 18px rgba(201,168,76,0.4), 0 0 6px rgba(201,168,76,0.2)",
            transition: "all 0.3s",
          }}
        >
          ⚖
        </div>

        {!collapsed && (
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                color: "#f0d080",
                fontFamily: "'Georgia', serif",
                fontSize: 14,
                fontWeight: "bold",
                letterSpacing: 2,
                textShadow: "0 1px 6px rgba(201,168,76,0.4)",
              }}
            >
              GMC
            </div>
            <div
              style={{
                color: "#6a8fa8",
                fontFamily: "'Georgia', serif",
                fontSize: 9.5,
                letterSpacing: 1.8,
                marginTop: 3,
                textTransform: "uppercase",
              }}
            >
              HRMS Portal
            </div>
            {/* Gold rule */}
            <div
              style={{
                width: 40,
                height: 1,
                background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
                margin: "8px auto 0",
              }}
            />
          </div>
        )}
      </div>

      {/* ── Menu ── */}
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["employees"]}
        theme="dark"
        items={menuItems}
        style={{
          background: "transparent",
          borderRight: "none",
          fontSize: 13,
          fontFamily: "'Georgia', serif",
          marginTop: 4,
        }}
      />

      <style>{`
        /* Override Ant Design dark menu colors to match navy theme */
        .ant-layout-sider .ant-menu-dark {
          background: transparent !important;
        }
        .ant-layout-sider .ant-menu-dark .ant-menu-item {
          color: #8aaec4 !important;
          font-family: 'Georgia', serif !important;
          border-radius: 0 !important;
          margin: 1px 0 !important;
        }
        .ant-layout-sider .ant-menu-dark .ant-menu-submenu-title {
          color: #8aaec4 !important;
          font-family: 'Georgia', serif !important;
        }
        .ant-layout-sider .ant-menu-dark .ant-menu-item .anticon,
        .ant-layout-sider .ant-menu-dark .ant-menu-submenu-title .anticon {
          color: #4a7a9b !important;
          transition: color 0.2s;
        }
        /* Hover state */
        .ant-layout-sider .ant-menu-dark .ant-menu-item:hover {
          background: rgba(106,143,168,0.1) !important;
          color: #f0d080 !important;
        }
        .ant-layout-sider .ant-menu-dark .ant-menu-item:hover .anticon,
        .ant-layout-sider .ant-menu-dark .ant-menu-submenu-title:hover .anticon {
          color: #c9a84c !important;
        }
        .ant-layout-sider .ant-menu-dark .ant-menu-submenu-title:hover {
          background: rgba(106,143,168,0.1) !important;
          color: #f0d080 !important;
        }
        /* Selected item — gold left border accent */
        .ant-layout-sider .ant-menu-dark .ant-menu-item-selected {
          background: linear-gradient(90deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05)) !important;
          border-left: 3px solid #c9a84c !important;
          color: #f0d080 !important;
        }
        .ant-layout-sider .ant-menu-dark .ant-menu-item-selected .anticon {
          color: #c9a84c !important;
        }
        /* Sub-menu background */
        .ant-layout-sider .ant-menu-dark .ant-menu-sub {
          background: rgba(6,16,26,0.6) !important;
        }
        .ant-layout-sider .ant-menu-dark .ant-menu-sub .ant-menu-item {
          color: #6a8fa8 !important;
          padding-left: 48px !important;
          font-size: 12px !important;
        }
        .ant-layout-sider .ant-menu-dark .ant-menu-sub .ant-menu-item:hover {
          color: #f0d080 !important;
          background: rgba(201,168,76,0.08) !important;
        }
        .ant-layout-sider .ant-menu-dark .ant-menu-sub .ant-menu-item-selected {
          color: #f0d080 !important;
          border-left: 3px solid #c9a84c !important;
          background: rgba(201,168,76,0.1) !important;
        }
        /* Submenu arrow */
        .ant-layout-sider .ant-menu-dark .ant-menu-submenu-arrow {
          color: #4a7a9b !important;
        }
        /* Collapse trigger */
        .ant-layout-sider-trigger {
          background: #06101a !important;
          border-top: 1px solid #1e3a50 !important;
          color: #6a8fa8 !important;
          transition: color 0.2s;
        }
        .ant-layout-sider-trigger:hover {
          color: #f0d080 !important;
          background: #0a1520 !important;
        }
        /* Scrollbar styling */
        .ant-layout-sider ::-webkit-scrollbar { width: 4px; }
        .ant-layout-sider ::-webkit-scrollbar-track { background: transparent; }
        .ant-layout-sider ::-webkit-scrollbar-thumb { background: #1e3a50; border-radius: 2px; }
      `}</style>
    </Sider>
  );
}