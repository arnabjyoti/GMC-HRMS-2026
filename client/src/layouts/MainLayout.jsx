import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/header/Navbar";
import FooterSection from "../components/footer/FooterSection";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const siderWidth = collapsed ? 64 : 230;

  return (
    <Layout style={{ minHeight: "100vh", background: "#07111c" }}>
      {/* Sidebar — fixed */}
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />

      {/* Main area — offset by sidebar */}
      <Layout
        style={{
          marginLeft: siderWidth,
          transition: "margin-left 0.2s",
          background: "#07111c",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar — fixed, offset matches sidebar */}
        <Navbar siderWidth={siderWidth} />

        {/* Page content — padded below fixed navbar */}
        <div style={{ marginTop: 68, flex: 1 }}>
          <Outlet />
        </div>

        {/* Footer */}
        <FooterSection />
      </Layout>
    </Layout>
  );
}