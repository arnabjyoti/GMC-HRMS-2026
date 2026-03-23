import React from "react";
import { Layout, Input, Badge, Avatar, Dropdown, Space, Divider, Tag } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  SearchOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  ProfileOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const userMenuItems = [
  {
    key: "profile",
    icon: <ProfileOutlined />,
    label: "My Profile",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Account Settings",
  },
  { type: "divider" },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Sign Out",
    danger: true,
  },
];

export default function Navbar({ siderWidth = 230 }) {
  return (
    <>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: siderWidth,
          right: 0,
          zIndex: 99,
          height: 68,
          padding: "0 28px",
          // Rich two-tone gradient — deep navy-charcoal to warm dark olive
          background: "linear-gradient(90deg, #0d1b2a 0%, #162030 40%, #1e1a0a 100%)",
          borderBottom: "2px solid #c9a84c",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "left 0.2s",
          boxShadow: "0 3px 16px rgba(0,0,0,0.55), 0 1px 0 rgba(201,168,76,0.3)",
        }}
      >
        {/* ── Left: Emblem + Title block ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          {/* Small crest icon */}
          {/* <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(145deg, #8b6914 0%, #e2c060 60%, #8b6914 100%)",
              border: "1.5px solid #e2c060",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#0d1b2a",
              flexShrink: 0,
              boxShadow: "0 0 10px rgba(226,192,96,0.35)",
            }}
          >
            <BankOutlined />
          </div>

          <Divider
            type="vertical"
            style={{ borderColor: "#3a4a2a", height: 36, margin: 0 }}
          /> */}

          {/* Title text */}
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                color: "#f0d080",
                fontFamily: "'Georgia', serif",
                fontSize: 16,
                fontWeight: "bold",
                letterSpacing: 1.2,
                whiteSpace: "nowrap",
                textShadow: "0 1px 6px rgba(201,168,76,0.5)",
              }}
            >
              Gauhati Municipal Corporation
            </div>
            <div
              style={{
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  color: "#6a8fa8",
                  fontFamily: "'Georgia', serif",
                  fontSize: 10,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                }}
              >
                Human Resource Management System
              </span>
              {/* <Tag
                style={{
                  background: "rgba(201,168,76,0.12)",
                  border: "1px solid #8b6914",
                  color: "#c9a84c",
                  fontFamily: "'Georgia', serif",
                  fontSize: 9,
                  letterSpacing: 0.8,
                  padding: "0 6px",
                  lineHeight: "16px",
                  borderRadius: 2,
                }}
              >
                GOV · ASSAM
              </Tag> */}
            </div>
          </div>
        </div>

        {/* ── Center: Search ── */}
        <Input
          prefix={<SearchOutlined style={{ color: "#6a8fa8" }} />}
          placeholder="Search employees, departments, payroll..."
          allowClear
          style={{
            width: 320,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid #2a3a4a",
            borderRadius: 4,
            color: "#d0c090",
            fontFamily: "'Georgia', serif",
            fontSize: 12,
          }}
          styles={{
            input: {
              background: "transparent",
              color: "#d0c090",
            },
          }}
        />

        {/* ── Right: Actions + User ── */}
        <Space size={18} align="center">
          <Badge count={3} size="small" offset={[-2, 2]}
            styles={{ indicator: { background: "#d4884a", boxShadow: "none" } }}>
            <QuestionCircleOutlined
              style={{ fontSize: 19, color: "#6a8fa8", cursor: "pointer" }}
            />
          </Badge>

          <Badge count={7} size="small" offset={[-2, 2]}
            styles={{ indicator: { background: "#c9a84c", boxShadow: "none" } }}>
            <BellOutlined
              style={{ fontSize: 19, color: "#6a8fa8", cursor: "pointer" }}
            />
          </Badge>

          <Divider
            type="vertical"
            style={{ borderColor: "#2a3a4a", height: 30, margin: 0 }}
          />

          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Space style={{ cursor: "pointer" }} size={10}>
              <Avatar
                size={36}
                icon={<UserOutlined />}
                style={{
                  background: "linear-gradient(135deg, #0d3a5a, #1a6a9a)",
                  border: "1.5px solid #6a8fa8",
                  color: "#d0e8f8",
                }}
              />
              <div style={{ lineHeight: 1.25 }}>
                <div
                  style={{
                    color: "#f0d080",
                    fontFamily: "'Georgia', serif",
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  Admin
                </div>
                <div
                  style={{
                    color: "#6a8fa8",
                    fontFamily: "'Georgia', serif",
                    fontSize: 10,
                    letterSpacing: 0.5,
                  }}
                >
                  HR Manager
                </div>
              </div>
            </Space>
          </Dropdown>
        </Space>
      </Header>

      <style>{`
        .ant-input-affix-wrapper:focus,
        .ant-input-affix-wrapper-focused {
          border-color: #c9a84c !important;
          box-shadow: 0 0 0 2px rgba(201,168,76,0.15) !important;
        }
        .ant-input-affix-wrapper:hover { border-color: #6a8fa8 !important; }
        .ant-input::placeholder,
        .ant-input-affix-wrapper input::placeholder { color: #3a5a6a !important; }
        .ant-dropdown-menu {
          background: #0d1b2a !important;
          border: 1px solid #2a3a4a !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.6) !important;
        }
        .ant-dropdown-menu-item {
          color: #a0b8c8 !important;
          font-family: 'Georgia', serif !important;
        }
        .ant-dropdown-menu-item:hover {
          background: #162030 !important;
          color: #f0d080 !important;
        }
        .ant-dropdown-menu-item-danger { color: #cf6060 !important; }
        .ant-dropdown-menu-item-danger:hover { background: #1a0808 !important; }
        .ant-dropdown-menu-item .anticon { color: #6a8fa8 !important; }
      `}</style>
    </>
  );
}