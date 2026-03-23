import React, { useState } from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  SafetyOutlined,
  LoginOutlined,
  BankOutlined,
} from "@ant-design/icons";

import GMC_Logo from "../../../../assets/image/gmc_logo.png";
import Skaplink_Logo from "../../../../assets/image/skaplink_logo.jpg";

const { Text } = Typography;

export default function Login_Page() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Login Data:", values);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <section style={{ minHeight: "100vh", background: "#07111c", display: "flex" }}>

      {/* ── Left Panel — Branding ── */}
      <div
        style={{
          flex: "0 0 42%",
          background: "linear-gradient(160deg, #06101a 0%, #0a1a2e 50%, #0d1f38 100%)",
          borderRight: "1px solid #1e3a50",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative rings */}
        <div style={{
          position: "absolute", top: -80, left: -80,
          width: 320, height: 320, borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.08)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: -40, left: -40,
          width: 220, height: 220, borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.05)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -100, right: -100,
          width: 400, height: 400, borderRadius: "50%",
          border: "1px solid rgba(74,122,155,0.07)",
          pointerEvents: "none",
        }} />

        {/* Vertical gold rule */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: 1,
          background: "linear-gradient(180deg, transparent 0%, #c9a84c 30%, #c9a84c 70%, transparent 100%)",
          opacity: 0.15,
        }} />

        {/* Logo */}
        <div style={{
          width: 90, height: 90, borderRadius: "50%",
          background: "linear-gradient(145deg, #8b6914 0%, #e2c060 55%, #8b6914 100%)",
          border: "2.5px solid #c9a84c",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 28,
          boxShadow: "0 0 32px rgba(201,168,76,0.3), 0 0 8px rgba(201,168,76,0.15)",
        }}>
          <img
            src={GMC_Logo}
            alt="GMC Logo"
            style={{ width: 60, height: 60, objectFit: "contain", borderRadius: "50%" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.fontSize = "32px";
              e.target.parentNode.style.color = "#0a1520";
              e.target.parentNode.innerHTML = "⚖";
            }}
          />
        </div>

        {/* Org name */}
        <div style={{
          color: "#f0d080",
          fontFamily: "'Georgia', serif",
          fontSize: 22,
          fontWeight: "bold",
          letterSpacing: 1.5,
          textAlign: "center",
          textShadow: "0 2px 12px rgba(201,168,76,0.3)",
          lineHeight: 1.3,
          marginBottom: 10,
        }}>
          Gauhati Municipal<br />Corporation
        </div>

        {/* Gold rule */}
        <div style={{
          width: 60, height: 2,
          background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          margin: "12px auto 14px",
        }} />

        <div style={{
          color: "#6a8fa8",
          fontFamily: "'Georgia', serif",
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 40,
        }}>
          Human Resource Management System
        </div>

        {/* Feature pills */}
        {[
          { icon: "🏛", label: "Government of Assam" },
          { icon: "🔒", label: "Secure & Encrypted Portal" },
          { icon: "📋", label: "Authorized Personnel Only" },
        ].map((f) => (
          <div key={f.label} style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 14,
            padding: "8px 18px",
            background: "rgba(74,122,155,0.06)",
            border: "1px solid #1e3a50",
            borderRadius: 4,
            width: "100%",
            maxWidth: 280,
          }}>
            <span style={{ fontSize: 16 }}>{f.icon}</span>
            <span style={{
              color: "#8aaec4", fontFamily: "'Georgia', serif",
              fontSize: 12, letterSpacing: 0.5,
            }}>
              {f.label}
            </span>
          </div>
        ))}

        {/* Bottom gov badge */}
        <div style={{
          position: "absolute", bottom: 28,
          color: "#2a5a78", fontFamily: "'Georgia', serif",
          fontSize: 10, letterSpacing: 1.5, textAlign: "center",
        }}>
          GOVT. OF ASSAM — OFFICIAL PORTAL
        </div>
      </div>

      {/* ── Right Panel — Login Form ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 40px",
        background: "#07111c",
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* Form header */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 4, height: 32, borderRadius: 2,
                background: "linear-gradient(180deg, #c9a84c, #8b6914)",
              }} />
              <div style={{
                color: "#f0d080",
                fontFamily: "'Georgia', serif",
                fontSize: 22,
                fontWeight: "bold",
                letterSpacing: 0.5,
              }}>
                Sign In
              </div>
            </div>
            <div style={{
              color: "#4a7a9b",
              fontFamily: "'Georgia', serif",
              fontSize: 12,
              letterSpacing: 1,
              paddingLeft: 14,
            }}>
              Enter your credentials to access the HRMS portal
            </div>
          </div>

          <Form
            name="hrms_login"
            onFinish={onFinish}
            layout="vertical"
          >
            {/* User ID */}
            <Form.Item
              name="username"
              label={
                <span style={{ color: "#6a8fa8", fontFamily: "'Georgia', serif", fontSize: 12, letterSpacing: 0.8 }}>
                  USER ID
                </span>
              }
              rules={[{ required: true, message: "Please enter your User ID" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#4a7a9b" }} />}
                placeholder="Enter your User ID"
                size="large"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid #1e3a50",
                  borderRadius: 4,
                  color: "#c0d8e8",
                  fontFamily: "'Georgia', serif",
                  fontSize: 13,
                }}
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label={
                <span style={{ color: "#6a8fa8", fontFamily: "'Georgia', serif", fontSize: 12, letterSpacing: 0.8 }}>
                  PASSWORD
                </span>
              }
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#4a7a9b" }} />}
                placeholder="Enter your password"
                size="large"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid #1e3a50",
                  borderRadius: 4,
                  color: "#c0d8e8",
                  fontFamily: "'Georgia', serif",
                  fontSize: 13,
                }}
              />
            </Form.Item>

            {/* Captcha (uncomment to enable) */}
            {/* <Form.Item
              name="captcha"
              label={
                <span style={{ color: "#6a8fa8", fontFamily: "'Georgia', serif", fontSize: 12, letterSpacing: 0.8 }}>
                  CAPTCHA
                </span>
              }
              rules={[{ required: true, message: "Please enter captcha" }]}
            >
              <Input
                prefix={<SafetyOutlined style={{ color: "#4a7a9b" }} />}
                placeholder="Enter Captcha"
                size="large"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid #1e3a50",
                  borderRadius: 4,
                  color: "#c0d8e8",
                  fontFamily: "'Georgia', serif",
                }}
              />
            </Form.Item> */}

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginBottom: 20, marginTop: -8 }}>
              <a href="#" style={{
                color: "#4a7a9b",
                fontFamily: "'Georgia', serif",
                fontSize: 12,
                textDecoration: "none",
                letterSpacing: 0.3,
              }}>
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                icon={<LoginOutlined />}
                style={{
                  background: "linear-gradient(90deg, #8b6914 0%, #c9a84c 50%, #8b6914 100%)",
                  border: "none",
                  borderRadius: 4,
                  color: "#07111c",
                  fontFamily: "'Georgia', serif",
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: 1.5,
                  height: 46,
                  boxShadow: "0 4px 16px rgba(201,168,76,0.3)",
                }}
              >
                LOGIN TO PORTAL
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <Divider style={{ borderColor: "#1e3a50", margin: "8px 0 20px" }}>
            <span style={{ color: "#2a5a78", fontFamily: "'Georgia', serif", fontSize: 10 }}>
              SECURED ACCESS
            </span>
          </Divider>

          {/* Powered by */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 14,
            padding: "12px 20px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1e3a50",
            borderRadius: 4,
          }}>
            <span style={{
              color: "#2a5a78", fontFamily: "'Georgia', serif",
              fontSize: 11, letterSpacing: 0.5, whiteSpace: "nowrap",
            }}>
              Powered by
            </span>
            <img
              src={Skaplink_Logo}
              alt="Skaplink"
              style={{ height: 24, objectFit: "contain", filter: "brightness(0.75) sepia(0.3)" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML += `<span style="color:#4a7a9b;font-family:'Georgia',serif;font-size:13px;font-weight:bold;">Skaplink</span>`;
              }}
            />
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: 24, textAlign: "center",
            color: "#1e3a50", fontFamily: "'Georgia', serif",
            fontSize: 10, letterSpacing: 1,
          }}>
            © {new Date().getFullYear()} GAUHATI MUNICIPAL CORPORATION — ALL RIGHTS RESERVED
          </div>
        </div>
      </div>

      {/* Global input overrides */}
      <style>{`
        .ant-input, .ant-input-password {
          background: rgba(255,255,255,0.03) !important;
          color: #c0d8e8 !important;
        }
        .ant-input::placeholder { color: #2a5a78 !important; }
        .ant-input-affix-wrapper {
          background: rgba(255,255,255,0.03) !important;
          border-color: #1e3a50 !important;
        }
        .ant-input-affix-wrapper:hover { border-color: #4a7a9b !important; }
        .ant-input-affix-wrapper:focus,
        .ant-input-affix-wrapper-focused {
          border-color: #c9a84c !important;
          box-shadow: 0 0 0 2px rgba(201,168,76,0.15) !important;
        }
        .ant-input-password-icon { color: #4a7a9b !important; }
        .ant-input-password-icon:hover { color: #c9a84c !important; }
        .ant-form-item-explain-error { color: #c97a4a !important; font-family: 'Georgia', serif !important; font-size: 11px !important; }
        .ant-form-item-label > label { font-family: 'Georgia', serif !important; }
        .ant-btn-primary:hover {
          background: linear-gradient(90deg, #a07820, #e2c060, #a07820) !important;
          box-shadow: 0 6px 20px rgba(201,168,76,0.45) !important;
          transform: translateY(-1px);
        }
        a:hover { color: #c9a84c !important; }
      `}</style>
    </section>
  );
}