import React, { useState } from "react";
import { Layout, Row, Col, Card, Statistic, Table, Badge, Tag, Avatar, Progress, Divider } from "antd";
import {
  TeamOutlined,
  UserAddOutlined,
  CalendarOutlined,
  DollarOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/header/Navbar";
import FooterSection from "../../components/footer/FooterSection";

const { Content } = Layout;

/* ── Stat cards data ── */
const stats = [
  {
    title: "Total Employees",
    value: 1248,
    icon: <TeamOutlined />,
    color: "#4a7a9b",
    bg: "rgba(74,122,155,0.12)",
    border: "#1e3a50",
    suffix: "staff",
    trend: "+12 this month",
    trendUp: true,
  },
  {
    title: "New Recruitments",
    value: 34,
    icon: <UserAddOutlined />,
    color: "#c9a84c",
    bg: "rgba(201,168,76,0.10)",
    border: "#3a2d0a",
    suffix: "pending",
    trend: "+8 this week",
    trendUp: true,
  },
  {
    title: "On Leave Today",
    value: 57,
    icon: <CalendarOutlined />,
    color: "#6a9a7a",
    bg: "rgba(106,154,122,0.10)",
    border: "#1a3a2a",
    suffix: "employees",
    trend: "3 pending approval",
    trendUp: false,
  },
  {
    title: "Payroll Due",
    value: "₹ 42.6L",
    icon: <DollarOutlined />,
    color: "#b07a4a",
    bg: "rgba(176,122,74,0.10)",
    border: "#3a2010",
    suffix: "this month",
    trend: "Processing on 31st",
    trendUp: false,
  },
];

/* ── Recent activities ── */
const activities = [
  { key: 1, name: "Rajib Borah", action: "Leave Approved", dept: "Engineering", time: "10 min ago", status: "success" },
  { key: 2, name: "Priya Sharma", action: "New Joining", dept: "Finance", time: "1 hr ago", status: "processing" },
  { key: 3, name: "Deepak Kalita", action: "Payslip Generated", dept: "Admin", time: "2 hr ago", status: "default" },
  { key: 4, name: "Minakshi Das", action: "Leave Pending", dept: "HR", time: "3 hr ago", status: "warning" },
  { key: 5, name: "Anupam Gogoi", action: "Attendance Absent", dept: "IT", time: "Today", status: "error" },
];

const activityColumns = [
  {
    title: "Employee",
    dataIndex: "name",
    render: (name) => (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar size={28} icon={<UserOutlined />}
          style={{ background: "linear-gradient(135deg,#0d3a5a,#1a6a9a)", border: "1px solid #2a5a78", fontSize: 12 }} />
        <span style={{ color: "#c0d8e8", fontFamily: "'Georgia',serif", fontSize: 13 }}>{name}</span>
      </div>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (action, row) => (
      <Badge status={row.status} text={
        <span style={{ color: "#8aaec4", fontFamily: "'Georgia',serif", fontSize: 12 }}>{action}</span>
      } />
    ),
  },
  {
    title: "Department",
    dataIndex: "dept",
    render: (d) => (
      <Tag style={{
        background: "rgba(74,122,155,0.12)", border: "1px solid #1e3a50",
        color: "#6a8fa8", fontFamily: "'Georgia',serif", fontSize: 11
      }}>{d}</Tag>
    ),
  },
  {
    title: "Time",
    dataIndex: "time",
    render: (t) => (
      <span style={{ color: "#4a7a9b", fontFamily: "'Georgia',serif", fontSize: 11 }}>
        <ClockCircleOutlined style={{ marginRight: 4 }} />{t}
      </span>
    ),
  },
];

/* ── Department headcount ── */
const departments = [
  { name: "Administration", count: 210, total: 250, color: "#4a7a9b" },
  { name: "Engineering", count: 185, total: 200, color: "#c9a84c" },
  { name: "Finance", count: 98, total: 120, color: "#6a9a7a" },
  { name: "Human Resources", count: 64, total: 80, color: "#b07a4a" },
  { name: "Information Technology", count: 142, total: 160, color: "#7a6ab0" },
];

/* ── Shared card style ── */
const cardStyle = {
  background: "linear-gradient(145deg, #0a1520 0%, #0d1b2a 100%)",
  border: "1px solid #1e3a50",
  borderRadius: 4,
};

const cardHeadStyle = {
  background: "linear-gradient(90deg, #06101a, #0a1520)",
  borderBottom: "1px solid #1e3a50",
  color: "#c9a84c",
  fontFamily: "'Georgia', serif",
  fontSize: 13,
  letterSpacing: 0.8,
  padding: "10px 18px",
};

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const siderWidth = collapsed ? 64 : 230;

  return (
    <Layout style={{ minHeight: "100vh", background: "#07111c" }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />

      <Layout style={{ marginLeft: siderWidth, transition: "margin-left 0.2s", background: "#07111c" }}>
        <Navbar siderWidth={siderWidth} />

        <Content
          style={{
            marginTop: 68,
            padding: "24px 28px",
            minHeight: "calc(100vh - 68px - 57px)",
            background: "#07111c",
          }}
        >
          {/* ── Page Title ── */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 4, height: 28, borderRadius: 2,
                background: "linear-gradient(180deg, #c9a84c, #8b6914)",
              }} />
              <div>
                <div style={{
                  color: "#f0d080", fontFamily: "'Georgia', serif",
                  fontSize: 20, fontWeight: "bold", letterSpacing: 0.5,
                }}>
                  Dashboard Overview
                </div>
                <div style={{
                  color: "#4a7a9b", fontFamily: "'Georgia', serif",
                  fontSize: 11, letterSpacing: 1.5, marginTop: 2,
                }}>
                  GAUHATI MUNICIPAL CORPORATION — HRMS
                </div>
              </div>
            </div>
            <Divider style={{ borderColor: "#1e3a50", margin: "14px 0 0" }} />
          </div>

          {/* ── Stat Cards ── */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {stats.map((s) => (
              <Col xs={24} sm={12} lg={6} key={s.title}>
                <Card
                  style={{ ...cardStyle, border: `1px solid ${s.border}` }}
                  styles={{ body: { padding: "18px 20px" } }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{
                        color: "#4a7a9b", fontFamily: "'Georgia', serif",
                        fontSize: 11, letterSpacing: 1, marginBottom: 8,
                        textTransform: "uppercase",
                      }}>
                        {s.title}
                      </div>
                      <div style={{
                        color: "#f0d080", fontFamily: "'Georgia', serif",
                        fontSize: 26, fontWeight: "bold", lineHeight: 1,
                      }}>
                        {s.value}
                      </div>
                      <div style={{
                        color: s.trendUp ? "#6a9a7a" : "#4a7a9b",
                        fontFamily: "'Georgia', serif", fontSize: 11, marginTop: 6,
                      }}>
                        {s.trendUp && <RiseOutlined style={{ marginRight: 4 }} />}
                        {s.trend}
                      </div>
                    </div>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: s.bg, border: `1px solid ${s.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, color: s.color,
                    }}>
                      {s.icon}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* ── Activity Table + Department Stats ── */}
          <Row gutter={[16, 16]}>
            {/* Recent Activity */}
            <Col xs={24} lg={15}>
              <Card
                title="Recent Activity"
                style={cardStyle}
                styles={{
                  header: cardHeadStyle,
                  body: { padding: 0 },
                }}
              >
                <Table
                  dataSource={activities}
                  columns={activityColumns}
                  pagination={false}
                  size="small"
                  style={{ background: "transparent" }}
                />
              </Card>
            </Col>

            {/* Department Headcount */}
            <Col xs={24} lg={9}>
              <Card
                title="Department Headcount"
                style={{ ...cardStyle, height: "100%" }}
                styles={{ header: cardHeadStyle, body: { padding: "16px 20px" } }}
              >
                {departments.map((d) => (
                  <div key={d.name} style={{ marginBottom: 16 }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      marginBottom: 5,
                    }}>
                      <span style={{
                        color: "#8aaec4", fontFamily: "'Georgia', serif", fontSize: 12,
                      }}>
                        {d.name}
                      </span>
                      <span style={{
                        color: "#f0d080", fontFamily: "'Georgia', serif", fontSize: 12,
                      }}>
                        {d.count} <span style={{ color: "#2a5a78" }}>/ {d.total}</span>
                      </span>
                    </div>
                    <Progress
                      percent={Math.round((d.count / d.total) * 100)}
                      showInfo={false}
                      size={["100%", 5]}
                      strokeColor={d.color}
                      trailColor="rgba(255,255,255,0.05)"
                    />
                  </div>
                ))}

                <Divider style={{ borderColor: "#1e3a50", margin: "12px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#4a7a9b", fontFamily: "'Georgia', serif", fontSize: 11 }}>
                    <CheckCircleOutlined style={{ marginRight: 6, color: "#6a9a7a" }} />
                    Active Departments: 5
                  </span>
                  <span style={{ color: "#4a7a9b", fontFamily: "'Georgia', serif", fontSize: 11 }}>
                    <ExclamationCircleOutlined style={{ marginRight: 6, color: "#c9a84c" }} />
                    Vacancies: 69
                  </span>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>

        <FooterSection />
      </Layout>

      {/* Global table overrides */}
      <style>{`
        .ant-table { background: transparent !important; }
        .ant-table-thead > tr > th {
          background: #06101a !important;
          color: #4a7a9b !important;
          border-bottom: 1px solid #1e3a50 !important;
          font-family: 'Georgia', serif !important;
          font-size: 11px !important;
          letter-spacing: 1px !important;
          text-transform: uppercase !important;
        }
        .ant-table-tbody > tr > td {
          background: transparent !important;
          border-bottom: 1px solid #0f2030 !important;
        }
        .ant-table-tbody > tr:hover > td {
          background: rgba(74,122,155,0.07) !important;
        }
        .ant-card-head-title { color: #c9a84c !important; }
      `}</style>
    </Layout>
  );
}