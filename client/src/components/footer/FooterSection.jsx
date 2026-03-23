import React from "react";
import { Layout, Divider, Space, Typography } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";

const { Footer } = Layout;
const { Text, Link } = Typography;

export default function FooterSection() {
  return (
    <Footer
      style={{
        background: "linear-gradient(90deg, #06101a 0%, #0a1520 50%, #0d1b2a 100%)",
        borderTop: "1px solid #1e3a50",
        padding: "14px 36px",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.4)",
      }}
    >
      {/* Top gold rule */}
      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, #c9a84c 30%, #c9a84c 70%, transparent 100%)",
          marginBottom: 12,
          opacity: 0.35,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {/* Left — Copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SafetyCertificateOutlined style={{ color: "#4a7a9b", fontSize: 13 }} />
          <Text
            style={{
              color: "#4a7a9b",
              fontFamily: "'Georgia', serif",
              fontSize: 12,
            }}
          >
            © {new Date().getFullYear()}{" "}
            <span
              style={{
                color: "#c9a84c",
                fontWeight: "bold",
                letterSpacing: 0.5,
              }}
            >
              Gauhati Municipal Corporation
            </span>{" "}
            <span style={{ color: "#2a5a78" }}>— All Rights Reserved</span>
          </Text>
        </div>

        {/* Center — Links */}
        <Space
          split={
            <Divider
              type="vertical"
              style={{ borderColor: "#1e3a50", margin: 0 }}
            />
          }
        >
          {["Privacy Policy", "Terms of Use", "Help & Support"].map((item) => (
            <Link
              key={item}
              href="#"
              style={{
                color: "#4a7a9b",
                fontFamily: "'Georgia', serif",
                fontSize: 11,
                letterSpacing: 0.5,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {item}
            </Link>
          ))}
        </Space>

        {/* Right — Version tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid #2a4a1a",
              borderRadius: 2,
              padding: "1px 8px",
              color: "#6a8040",
              fontFamily: "'Georgia', serif",
              fontSize: 10,
              letterSpacing: 1,
            }}
          >
            v2.1.0
          </div>
          <Text
            style={{
              color: "#2a5a78",
              fontFamily: "'Georgia', serif",
              fontSize: 11,
              letterSpacing: 0.3,
            }}
          >
            Government of Assam
          </Text>
        </div>
      </div>

      <style>{`
        .ant-typography a:hover { color: #f0d080 !important; transition: color 0.2s; }
      `}</style>
    </Footer>
  );
}