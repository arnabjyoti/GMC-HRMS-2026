import React, { useState } from "react";
import {
  Row, Col, Card, Avatar, Button, Tag, Tabs, Divider,
  Descriptions, Upload, Badge, Timeline, Table, Progress,
  Space, Tooltip, Modal, Form, Input, Select, DatePicker,
} from "antd";
import {
  UserOutlined, EditOutlined, UploadOutlined, PhoneOutlined,
  MailOutlined, HomeOutlined, IdcardOutlined, BankOutlined,
  CalendarOutlined, FileTextOutlined, CheckCircleOutlined,
  ClockCircleOutlined, SafetyCertificateOutlined, DollarOutlined,
  MedicineBoxOutlined, PrinterOutlined, DownloadOutlined,
  CameraOutlined, TeamOutlined, StarOutlined, EnvironmentOutlined,
  LockOutlined,
} from "@ant-design/icons";

// ── Theme ─────────────────────────────────────────────────────
const T = {
  bg:        "#07111c",
  panel:     "linear-gradient(145deg,#0a1520 0%,#0d1b2a 100%)",
  panelDark: "linear-gradient(180deg,#06101a 0%,#0a1520 100%)",
  border:    "#1e3a50",
  borderSub: "#0f2030",
  gold:      "#c9a84c",
  goldLight: "#f0d080",
  goldGlow:  "rgba(201,168,76,0.15)",
  blue:      "#4a7a9b",
  blueLight: "#8aaec4",
  blueMid:   "#6a8fa8",
  text:      "#c0d8e8",
  textDim:   "#4a7a9b",
  textFaint: "#2a5a78",
  inputBg:   "rgba(255,255,255,0.04)",
  green:     "#6a9a7a",
  greenBg:   "rgba(106,154,122,0.12)",
  amber:     "#c97a4a",
  amberBg:   "rgba(201,122,74,0.10)",
};

const cardStyle = {
  background: T.panel,
  border: `1px solid ${T.border}`,
  borderRadius: 6,
};

const headStyle = {
  background: T.panelDark,
  borderBottom: `1px solid ${T.border}`,
  color: T.goldLight,
  fontFamily: "'Georgia',serif",
  fontSize: 12,
  letterSpacing: 1,
  padding: "10px 18px",
};

const labelSt = {
  color: T.blueMid,
  fontFamily: "'Georgia',serif",
  fontSize: 11,
  letterSpacing: 0.8,
  textTransform: "uppercase",
};

const valueSt = {
  color: T.text,
  fontFamily: "'Georgia',serif",
  fontSize: 13,
};

const inputStyle = {
  background: T.inputBg,
  border: `1px solid ${T.border}`,
  borderRadius: 4,
  color: T.text,
  fontFamily: "'Georgia',serif",
  fontSize: 13,
};

// ── Mock employee data ────────────────────────────────────────
const employee = {
  name:          "Rajib Borah",
  empCode:       "GMC0011",
  designation:   "HR Manager",
  department:    "Administration",
  type:          "Permanent",
  status:        "Active",
  payGrade:      "GP-6 (₹4200)",
  dob:           "15 Mar 1982",
  gender:        "Male",
  religion:      "Hindu",
  caste:         "General",
  maritalStatus: "Married",
  bloodGroup:    "B+",
  joiningDate:   "01 Jan 2010",
  retirementDate:"31 Mar 2042",
  reportingTo:   "Deputy Commissioner",
  qualification: "MBA",
  mobile:        "+91 98540 00011",
  altMobile:     "+91 94010 00011",
  email:         "rajib.borah@gmc.gov.in",
  personalEmail: "rajib.borah@gmail.com",
  address:       "42 Rajgarh Road, Ulubari, Guwahati, Assam — 781007",
  localAddress:  "14 GNB Road, Ambari, Guwahati, Assam — 781001",
  emergencyName: "Mina Borah",
  emergencyPhone:"+91 94010 88811",
  aadhar:        "XXXX-XXXX-3421",
  pan:           "ABCDE1234F",
  voterId:       "ASD1234567",
  drivingLicense:"AS01-2010-0001234",
  passport:      "P1234567",
  passportExpiry:"12 Aug 2028",
  pfAccount:     "AS/GHY/001/0011",
  esiNumber:     "3101234560000011",
  bankName:      "State Bank of India",
  accountNumber: "XXXX XXXX 4532",
  ifscCode:      "SBIN0001234",
  accountType:   "Savings",
};

// ── Leave history ─────────────────────────────────────────────
const leaveHistory = [
  { key: 1, type: "Casual Leave",   from: "10 Jan 2026", to: "12 Jan 2026", days: 3,  status: "Approved" },
  { key: 2, type: "Medical Leave",  from: "05 Mar 2026", to: "07 Mar 2026", days: 3,  status: "Approved" },
  { key: 3, type: "Earned Leave",   from: "20 Apr 2026", to: "25 Apr 2026", days: 6,  status: "Pending" },
  { key: 4, type: "Casual Leave",   from: "01 Feb 2025", to: "01 Feb 2025", days: 1,  status: "Approved" },
  { key: 5, type: "Half-Day Leave", from: "14 Mar 2025", to: "14 Mar 2025", days: 0.5,status: "Approved" },
];

// ── Payslip history ───────────────────────────────────────────
const payslips = [
  { key: 1, month: "March 2026",    gross: "₹52,400", deduction: "₹8,200", net: "₹44,200", status: "Paid" },
  { key: 2, month: "February 2026", gross: "₹52,400", deduction: "₹8,200", net: "₹44,200", status: "Paid" },
  { key: 3, month: "January 2026",  gross: "₹52,400", deduction: "₹8,400", net: "₹44,000", status: "Paid" },
  { key: 4, month: "December 2025", gross: "₹54,000", deduction: "₹8,200", net: "₹45,800", status: "Paid" },
];

// ── Document list ─────────────────────────────────────────────
const documents = [
  { key: 1, name: "Appointment Letter",       date: "01 Jan 2010", type: "Official" },
  { key: 2, name: "Aadhar Card Copy",         date: "15 Mar 2020", type: "Identity" },
  { key: 3, name: "PAN Card Copy",            date: "15 Mar 2020", type: "Identity" },
  { key: 4, name: "Educational Certificate",  date: "20 Jun 2010", type: "Academic" },
  { key: 5, name: "Service Agreement",        date: "01 Jan 2010", type: "Official" },
  { key: 6, name: "Medical Fitness Certificate", date: "10 Jan 2024", type: "Medical" },
];

// ── Activity timeline ─────────────────────────────────────────
const timeline = [
  { date: "28 Apr 2026", action: "Leave Request submitted for 20–25 Apr", color: T.gold },
  { date: "07 Mar 2026", action: "Medical Leave approved (3 days)",        color: T.green },
  { date: "01 Mar 2026", action: "Payslip generated — Feb 2026",           color: T.blue },
  { date: "12 Jan 2026", action: "Casual Leave approved (3 days)",         color: T.green },
  { date: "01 Jan 2026", action: "Annual appraisal completed — Grade A",   color: T.gold },
  { date: "01 Dec 2025", action: "Salary revised — GP-6 effective",        color: T.amber },
];

// ── Leave balance ─────────────────────────────────────────────
const leaveBalance = [
  { type: "Casual Leave",  used: 4,  total: 12, color: T.gold },
  { type: "Medical Leave", used: 3,  total: 12, color: T.green },
  { type: "Earned Leave",  used: 6,  total: 30, color: T.blue },
  { type: "Half-Day",      used: 1,  total: 6,  color: T.amber },
];

// ── Info row helper ───────────────────────────────────────────
const InfoRow = ({ label, value, span = 12 }) => (
  <Col span={span}>
    <div style={{ marginBottom: 16 }}>
      <div style={labelSt}>{label}</div>
      <div style={{ ...valueSt, marginTop: 4 }}>{value || <span style={{ color: T.textFaint }}>—</span>}</div>
    </div>
  </Col>
);

// ── Status Tag ────────────────────────────────────────────────
const StatusTag = ({ status }) => {
  const cfg = {
    Active:   { color: T.green,  bg: T.greenBg,  border: "#1a3a2a" },
    Inactive: { color: T.blue,   bg: "rgba(74,122,155,0.1)", border: T.border },
    Blocked:  { color: T.amber,  bg: T.amberBg,  border: "#3a2010" },
    Approved: { color: T.green,  bg: T.greenBg,  border: "#1a3a2a" },
    Pending:  { color: T.gold,   bg: T.goldGlow, border: "#3a2d0a" },
    Paid:     { color: T.green,  bg: T.greenBg,  border: "#1a3a2a" },
  }[status] || {};
  return (
    <Tag style={{
      background: cfg.bg, border: `1px solid ${cfg.border}`,
      color: cfg.color, fontFamily: "'Georgia',serif", fontSize: 11,
    }}>{status}</Tag>
  );
};

// ── Edit Modal ────────────────────────────────────────────────
function EditModal({ open, onClose }) {
  const [form] = Form.useForm();
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={600} centered
      styles={{
        content: { background: "#0a1520", border: `1px solid ${T.border}`, borderRadius: 6, padding: 0 },
        header:  { background: "#06101a", borderBottom: `1px solid ${T.border}`, padding: "14px 24px", borderRadius: "6px 6px 0 0" },
        mask:    { background: "rgba(0,0,0,0.75)" },
      }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 3, height: 22, background: "linear-gradient(180deg,#c9a84c,#8b6914)", borderRadius: 2 }} />
          <span style={{ color: T.goldLight, fontFamily: "'Georgia',serif", fontSize: 15, fontWeight: "bold" }}>Edit Profile</span>
        </div>
      }
    >
      <div style={{ padding: "20px 24px" }}>
        <Form form={form} layout="vertical">
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item label={<span style={labelSt}>MOBILE</span>} name="mobile">
                <Input style={inputStyle} defaultValue={employee.mobile} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={labelSt}>EMAIL</span>} name="email">
                <Input style={inputStyle} defaultValue={employee.email} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={<span style={labelSt}>LOCAL ADDRESS</span>} name="localAddress">
                <Input.TextArea style={{ ...inputStyle, resize: "none" }} rows={2} defaultValue={employee.localAddress} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={labelSt}>EMERGENCY CONTACT</span>} name="emergencyName">
                <Input style={inputStyle} defaultValue={employee.emergencyName} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={labelSt}>EMERGENCY PHONE</span>} name="emergencyPhone">
                <Input style={inputStyle} defaultValue={employee.emergencyPhone} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div style={{
        padding: "12px 24px", background: "#06101a",
        borderTop: `1px solid ${T.border}`, borderRadius: "0 0 6px 6px",
        display: "flex", justifyContent: "flex-end", gap: 10,
      }}>
        <Button onClick={onClose}
          style={{ background: T.inputBg, border: `1px solid ${T.border}`, color: T.blueLight, fontFamily: "'Georgia',serif" }}>
          Cancel
        </Button>
        <Button type="primary" onClick={onClose}
          style={{ background: "linear-gradient(90deg,#8b6914,#c9a84c,#8b6914)", border: "none", color: "#07111c", fontFamily: "'Georgia',serif", fontWeight: "bold" }}>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function EmployeeProfile() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const handlePhotoUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => setPhotoUrl(e.target.result);
    reader.readAsDataURL(file.originFileObj || file);
    return false;
  };

  const leaveColumns = [
    { title: "Leave Type", dataIndex: "type",   render: v => <span style={valueSt}>{v}</span> },
    { title: "From",       dataIndex: "from",   render: v => <span style={{ ...valueSt, color: T.blueMid }}>{v}</span> },
    { title: "To",         dataIndex: "to",     render: v => <span style={{ ...valueSt, color: T.blueMid }}>{v}</span> },
    { title: "Days",       dataIndex: "days",   render: v => <span style={{ color: T.goldLight, fontFamily: "'Georgia',serif" }}>{v}</span> },
    { title: "Status",     dataIndex: "status", render: v => <StatusTag status={v} /> },
  ];

  const payslipColumns = [
    { title: "Month",     dataIndex: "month",     render: v => <span style={valueSt}>{v}</span> },
    { title: "Gross",     dataIndex: "gross",     render: v => <span style={{ color: T.green, fontFamily: "'Georgia',serif" }}>{v}</span> },
    { title: "Deduction", dataIndex: "deduction", render: v => <span style={{ color: T.amber, fontFamily: "'Georgia',serif" }}>{v}</span> },
    { title: "Net Pay",   dataIndex: "net",       render: v => <span style={{ color: T.goldLight, fontFamily: "'Georgia',serif", fontWeight: "bold" }}>{v}</span> },
    { title: "Status",    dataIndex: "status",    render: v => <StatusTag status={v} /> },
    {
      title: "Action", render: () => (
        <Button size="small" icon={<DownloadOutlined />}
          style={{ background: T.inputBg, border: `1px solid ${T.border}`, color: T.blueMid, fontSize: 11 }}>
          PDF
        </Button>
      ),
    },
  ];

  const docColumns = [
    { title: "Document",  dataIndex: "name", render: v => <span style={valueSt}><FileTextOutlined style={{ marginRight: 6, color: T.blue }} />{v}</span> },
    { title: "Type",      dataIndex: "type", render: v => <Tag style={{ background: T.inputBg, border: `1px solid ${T.border}`, color: T.blueMid, fontFamily: "'Georgia',serif", fontSize: 10 }}>{v}</Tag> },
    { title: "Date",      dataIndex: "date", render: v => <span style={{ color: T.blueMid, fontFamily: "'Georgia',serif", fontSize: 12 }}>{v}</span> },
    {
      title: "Action", render: () => (
        <Button size="small" icon={<DownloadOutlined />}
          style={{ background: T.inputBg, border: `1px solid ${T.border}`, color: T.blueMid, fontSize: 11 }}>
          Download
        </Button>
      ),
    },
  ];

  const tabItems = [
    {
      key: "personal",
      label: <span style={{ fontFamily: "'Georgia',serif", fontSize: 12 }}>Personal Info</span>,
      children: (
        <div style={{ padding: "20px 0" }}>
          <Row gutter={[24, 0]}>
            <InfoRow label="Full Name"       value={employee.name} />
            <InfoRow label="Employee Code"   value={employee.empCode} />
            <InfoRow label="Date of Birth"   value={employee.dob} />
            <InfoRow label="Gender"          value={employee.gender} />
            <InfoRow label="Blood Group"     value={employee.bloodGroup} />
            <InfoRow label="Religion"        value={employee.religion} />
            <InfoRow label="Caste Category"  value={employee.caste} />
            <InfoRow label="Marital Status"  value={employee.maritalStatus} />
            <InfoRow label="Permanent Address" value={employee.address}     span={24} />
            <InfoRow label="Local Address"     value={employee.localAddress} span={24} />
            <Divider style={{ borderColor: T.border, margin: "4px 0 16px", gridColumn: "1/-1" }} />
            <Col span={24}><div style={{ ...labelSt, marginBottom: 12, color: T.gold }}>EMERGENCY CONTACT</div></Col>
            <InfoRow label="Contact Name"   value={employee.emergencyName} />
            <InfoRow label="Contact Phone"  value={employee.emergencyPhone} />
          </Row>
        </div>
      ),
    },
    {
      key: "identity",
      label: <span style={{ fontFamily: "'Georgia',serif", fontSize: 12 }}>Identity Docs</span>,
      children: (
        <div style={{ padding: "20px 0" }}>
          <Row gutter={[24, 0]}>
            <InfoRow label="Aadhar Number"     value={employee.aadhar} />
            <InfoRow label="PAN Number"        value={employee.pan} />
            <InfoRow label="Voter ID"          value={employee.voterId} />
            <InfoRow label="Driving License"   value={employee.drivingLicense} />
            <InfoRow label="Passport Number"   value={employee.passport} />
            <InfoRow label="Passport Expiry"   value={employee.passportExpiry} />
            <InfoRow label="PF Account No."    value={employee.pfAccount} />
            <InfoRow label="ESI Number"        value={employee.esiNumber} />
          </Row>
          <Divider style={{ borderColor: T.border, margin: "8px 0 16px" }} />
          <div style={{ ...labelSt, color: T.gold, marginBottom: 12 }}>BANK DETAILS</div>
          <Row gutter={[24, 0]}>
            <InfoRow label="Bank Name"      value={employee.bankName} />
            <InfoRow label="Account Number" value={employee.accountNumber} />
            <InfoRow label="IFSC Code"      value={employee.ifscCode} />
            <InfoRow label="Account Type"   value={employee.accountType} />
          </Row>
        </div>
      ),
    },
    {
      key: "employment",
      label: <span style={{ fontFamily: "'Georgia',serif", fontSize: 12 }}>Employment</span>,
      children: (
        <div style={{ padding: "20px 0" }}>
          <Row gutter={[24, 0]}>
            <InfoRow label="Employee Type"    value={<Tag style={{ background: T.goldGlow, border: `1px solid #3a2d0a`, color: T.goldLight, fontFamily: "'Georgia',serif" }}>{employee.type}</Tag>} />
            <InfoRow label="Department"       value={employee.department} />
            <InfoRow label="Designation"      value={employee.designation} />
            <InfoRow label="Pay Grade"        value={<span style={{ color: T.goldLight, fontWeight: "bold" }}>{employee.payGrade}</span>} />
            <InfoRow label="Date of Joining"  value={employee.joiningDate} />
            <InfoRow label="Retirement Date"  value={employee.retirementDate} />
            <InfoRow label="Reporting To"     value={employee.reportingTo} />
            <InfoRow label="Qualification"    value={employee.qualification} />
          </Row>
          {/* Service duration bar */}
          <Divider style={{ borderColor: T.border, margin: "8px 0 16px" }} />
          <div style={{ ...labelSt, color: T.gold, marginBottom: 12 }}>SERVICE DURATION</div>
          <div style={{ marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
            <span style={{ ...valueSt, fontSize: 12 }}>Jan 2010 → Mar 2042 (32 years total)</span>
            <span style={{ color: T.goldLight, fontFamily: "'Georgia',serif", fontSize: 12 }}>16 yrs completed</span>
          </div>
          <Progress percent={50} showInfo={false} size={["100%", 6]}
            strokeColor={{ from: "#8b6914", to: "#c9a84c" }}
            trailColor="rgba(255,255,255,0.05)" />
        </div>
      ),
    },
    {
      key: "contact",
      label: <span style={{ fontFamily: "'Georgia',serif", fontSize: 12 }}>Contact</span>,
      children: (
        <div style={{ padding: "20px 0" }}>
          <Row gutter={[24, 0]}>
            <InfoRow label="Mobile"           value={<><PhoneOutlined style={{ marginRight: 6, color: T.blue }} />{employee.mobile}</>} />
            <InfoRow label="Alternate Mobile" value={<><PhoneOutlined style={{ marginRight: 6, color: T.blue }} />{employee.altMobile}</>} />
            <InfoRow label="Official Email"   value={<><MailOutlined  style={{ marginRight: 6, color: T.blue }} />{employee.email}</>} />
            <InfoRow label="Personal Email"   value={<><MailOutlined  style={{ marginRight: 6, color: T.blue }} />{employee.personalEmail}</>} />
          </Row>
        </div>
      ),
    },
    {
      key: "leave",
      label: <span style={{ fontFamily: "'Georgia',serif", fontSize: 12 }}>Leave</span>,
      children: (
        <div style={{ padding: "20px 0" }}>
          {/* Leave balance */}
          <div style={{ ...labelSt, color: T.gold, marginBottom: 12 }}>LEAVE BALANCE — FY 2025–26</div>
          <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
            {leaveBalance.map(lb => (
              <Col xs={12} sm={6} key={lb.type}>
                <div style={{
                  background: T.inputBg, border: `1px solid ${T.border}`,
                  borderRadius: 4, padding: "12px 14px",
                }}>
                  <div style={{ ...labelSt, fontSize: 10, marginBottom: 6 }}>{lb.type.toUpperCase()}</div>
                  <div style={{ color: lb.color, fontFamily: "'Georgia',serif", fontSize: 20, fontWeight: "bold" }}>
                    {lb.total - lb.used}
                  </div>
                  <div style={{ color: T.textFaint, fontFamily: "'Georgia',serif", fontSize: 10, marginTop: 2 }}>
                    of {lb.total} remaining
                  </div>
                  <Progress percent={Math.round(((lb.total - lb.used) / lb.total) * 100)}
                    showInfo={false} size={["100%", 3]}
                    strokeColor={lb.color} trailColor="rgba(255,255,255,0.05)"
                    style={{ marginTop: 8 }} />
                </div>
              </Col>
            ))}
          </Row>
          <div style={{ ...labelSt, color: T.gold, marginBottom: 12 }}>LEAVE HISTORY</div>
          <Table dataSource={leaveHistory} columns={leaveColumns}
            pagination={{ pageSize: 5 }} size="small" />
        </div>
      ),
    },
    {
      key: "payroll",
      label: <span style={{ fontFamily: "'Georgia',serif", fontSize: 12 }}>Payroll</span>,
      children: (
        <div style={{ padding: "20px 0" }}>
          {/* Salary summary cards */}
          <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
            {[
              { label: "Basic Salary",  value: "₹32,500", color: T.blueLight },
              { label: "HRA",           value: "₹8,500",  color: T.gold },
              { label: "DA",            value: "₹7,400",  color: T.green },
              { label: "Net Pay",       value: "₹44,200", color: T.goldLight },
            ].map(s => (
              <Col xs={12} sm={6} key={s.label}>
                <div style={{
                  background: T.inputBg, border: `1px solid ${T.border}`,
                  borderRadius: 4, padding: "12px 14px",
                }}>
                  <div style={{ ...labelSt, fontSize: 10, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ color: s.color, fontFamily: "'Georgia',serif", fontSize: 18, fontWeight: "bold" }}>{s.value}</div>
                </div>
              </Col>
            ))}
          </Row>
          <div style={{ ...labelSt, color: T.gold, marginBottom: 12 }}>PAYSLIP HISTORY</div>
          <Table dataSource={payslips} columns={payslipColumns}
            pagination={{ pageSize: 5 }} size="small" />
        </div>
      ),
    },
    {
      key: "documents",
      label: <span style={{ fontFamily: "'Georgia',serif", fontSize: 12 }}>Documents</span>,
      children: (
        <div style={{ padding: "20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ ...labelSt, color: T.gold }}>UPLOADED DOCUMENTS</div>
            <Upload showUploadList={false}>
              <Button size="small" icon={<UploadOutlined />}
                style={{ background: T.inputBg, border: `1px solid ${T.border}`, color: T.blueLight, fontFamily: "'Georgia',serif" }}>
                Upload Document
              </Button>
            </Upload>
          </div>
          <Table dataSource={documents} columns={docColumns}
            pagination={false} size="small" />
        </div>
      ),
    },
    {
      key: "activity",
      label: <span style={{ fontFamily: "'Georgia',serif", fontSize: 12 }}>Activity</span>,
      children: (
        <div style={{ padding: "20px 0" }}>
          <div style={{ ...labelSt, color: T.gold, marginBottom: 16 }}>RECENT ACTIVITY LOG</div>
          <Timeline
            items={timeline.map(t => ({
              color: t.color,
              children: (
                <div>
                  <div style={{ color: T.text, fontFamily: "'Georgia',serif", fontSize: 13 }}>{t.action}</div>
                  <div style={{ color: T.textDim, fontFamily: "'Georgia',serif", fontSize: 11, marginTop: 2 }}>
                    <ClockCircleOutlined style={{ marginRight: 4 }} />{t.date}
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px 28px", background: T.bg, minHeight: "100vh" }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 4, height: 28, borderRadius: 2, background: "linear-gradient(180deg,#c9a84c,#8b6914)" }} />
          <div>
            <div style={{ color: T.goldLight, fontFamily: "'Georgia',serif", fontSize: 20, fontWeight: "bold" }}>
              Employee Profile
            </div>
            {/* <div style={{ color: T.textDim, fontFamily: "'Georgia',serif", fontSize: 11, letterSpacing: 1.5, marginTop: 2 }}>
              GAUHATI MUNICIPAL CORPORATION — HRMS
            </div> */}
          </div>
        </div>
        <Divider style={{ borderColor: T.border, margin: "14px 0 0" }} />
      </div>

      <Row gutter={[20, 20]}>

        {/* ── Left column — Profile card ── */}
        <Col xs={24} lg={7}>

          {/* Profile card */}
          <Card style={{ ...cardStyle, marginBottom: 16 }} styles={{ body: { padding: 0 } }}>
            {/* Gold banner */}
            <div style={{
              height: 80,
              background: "linear-gradient(135deg,#0a1520 0%,#1a2d10 40%,#2a1a08 70%,#0d1b2a 100%)",
              borderBottom: `1px solid ${T.border}`,
              borderRadius: "6px 6px 0 0",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(201,168,76,0.03) 20px,rgba(201,168,76,0.03) 40px)",
              }} />
            </div>

            <div style={{ padding: "0 24px 24px", textAlign: "center" }}>
              {/* Avatar with upload */}
              <div style={{ position: "relative", display: "inline-block", marginTop: -44 }}>
                <Avatar
                  size={88}
                  src={photoUrl}
                  icon={!photoUrl && <UserOutlined />}
                  style={{
                    background: "linear-gradient(135deg,#0d3a5a,#1a6a9a)",
                    border: `3px solid ${T.gold}`,
                    boxShadow: `0 0 20px ${T.goldGlow}`,
                    fontSize: 32,
                  }}
                />
                {/* Camera upload button */}
                <Upload
                  showUploadList={false}
                  accept="image/*"
                  beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onload = (e) => setPhotoUrl(e.target.result);
                    reader.readAsDataURL(file);
                    return false;
                  }}
                >
                  <Tooltip title="Change photo">
                    <div style={{
                      position: "absolute", bottom: 2, right: 2,
                      width: 26, height: 26, borderRadius: "50%",
                      background: T.gold, border: `2px solid ${T.bg}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", fontSize: 12, color: "#07111c",
                    }}>
                      <CameraOutlined />
                    </div>
                  </Tooltip>
                </Upload>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ color: T.goldLight, fontFamily: "'Georgia',serif", fontSize: 17, fontWeight: "bold" }}>
                  {employee.name}
                </div>
                <div style={{ color: T.blueMid, fontFamily: "'Georgia',serif", fontSize: 12, marginTop: 3 }}>
                  {employee.designation}
                </div>
                <div style={{ color: T.textDim, fontFamily: "'Georgia',serif", fontSize: 11, marginTop: 2 }}>
                  {employee.empCode} · {employee.department}
                </div>
              </div>

              <div style={{ margin: "12px 0", display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
                <StatusTag status={employee.status} />
                <Tag style={{ background: T.goldGlow, border: `1px solid #3a2d0a`, color: T.goldLight, fontFamily: "'Georgia',serif", fontSize: 11 }}>
                  {employee.type}
                </Tag>
              </div>

              <Divider style={{ borderColor: T.border, margin: "12px 0" }} />

              {/* Quick info */}
              {[
                { icon: <PhoneOutlined />, value: employee.mobile },
                { icon: <MailOutlined  />, value: employee.email },
                { icon: <EnvironmentOutlined />, value: "Guwahati, Assam" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  marginBottom: 8, justifyContent: "flex-start",
                }}>
                  <span style={{ color: T.blue, fontSize: 13, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: T.text, fontFamily: "'Georgia',serif", fontSize: 12 }}>{item.value}</span>
                </div>
              ))}

              <Divider style={{ borderColor: T.border, margin: "12px 0" }} />

              {/* Action buttons */}
              <Space direction="vertical" style={{ width: "100%" }} size={8}>
                <Button block icon={<EditOutlined />} onClick={() => setEditOpen(true)}
                  style={{ background: T.goldGlow, border: `1px solid #3a2d0a`, color: T.goldLight, fontFamily: "'Georgia',serif" }}>
                  Edit Profile
                </Button>
                <Button block icon={<PrinterOutlined />}
                  style={{ background: T.inputBg, border: `1px solid ${T.border}`, color: T.blueLight, fontFamily: "'Georgia',serif" }}>
                  Print Profile
                </Button>
                <Button block icon={<LockOutlined />}
                  style={{ background: T.inputBg, border: `1px solid ${T.border}`, color: T.blueMid, fontFamily: "'Georgia',serif" }}>
                  Reset Password
                </Button>
              </Space>
            </div>
          </Card>

          {/* Employment summary card */}
          <Card style={cardStyle} styles={{ header: headStyle, body: { padding: "14px 18px" } }}
            title="Employment Summary">
            {[
              { label: "Pay Grade",    value: employee.payGrade,      color: T.goldLight },
              { label: "Joining",      value: employee.joiningDate,   color: T.text },
              { label: "Retirement",   value: employee.retirementDate,color: T.text },
              { label: "Reporting To", value: employee.reportingTo,   color: T.blueLight },
              { label: "Qualification",value: employee.qualification, color: T.text },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: i < 4 ? 12 : 0,
                paddingBottom: i < 4 ? 12 : 0,
                borderBottom: i < 4 ? `1px solid ${T.borderSub}` : "none",
              }}>
                <span style={{ ...labelSt, fontSize: 10 }}>{item.label}</span>
                <span style={{ color: item.color, fontFamily: "'Georgia',serif", fontSize: 12, textAlign: "right", maxWidth: "55%" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </Card>
        </Col>

        {/* ── Right column — Tabs ── */}
        <Col xs={24} lg={17}>
          <Card style={cardStyle} styles={{ body: { padding: "0 20px 20px" } }}>
            <Tabs
              items={tabItems}
              style={{ fontFamily: "'Georgia',serif" }}
            />
          </Card>
        </Col>
      </Row>

      <EditModal open={editOpen} onClose={() => setEditOpen(false)} />

      {/* Global overrides */}
      <style>{`
        .ant-tabs-tab { color: ${T.blueMid} !important; font-family: 'Georgia',serif !important; }
        .ant-tabs-tab:hover { color: ${T.goldLight} !important; }
        .ant-tabs-tab-active .ant-tabs-tab-btn { color: ${T.goldLight} !important; }
        .ant-tabs-ink-bar { background: ${T.gold} !important; }
        .ant-tabs-nav { border-bottom: 1px solid ${T.border} !important; margin-bottom: 0 !important; }
        .ant-table { background: transparent !important; }
        .ant-table-thead > tr > th {
          background: #06101a !important; color: ${T.textDim} !important;
          border-bottom: 1px solid ${T.border} !important;
          font-family: 'Georgia',serif !important; font-size: 11px !important;
          letter-spacing: 1px !important; text-transform: uppercase !important;
        }
        .ant-table-tbody > tr > td {
          background: transparent !important; border-bottom: 1px solid ${T.borderSub} !important;
        }
        .ant-table-tbody > tr:hover > td { background: rgba(74,122,155,0.06) !important; }
        .ant-timeline-item-tail { border-inline-start: 2px solid ${T.border} !important; }
        .ant-pagination-item { background: rgba(255,255,255,0.03) !important; border-color: ${T.border} !important; }
        .ant-pagination-item a { color: ${T.blueLight} !important; font-family: 'Georgia',serif !important; }
        .ant-pagination-item-active { background: ${T.goldGlow} !important; border-color: #8b6914 !important; }
        .ant-pagination-item-active a { color: ${T.goldLight} !important; }
        .ant-pagination-prev button, .ant-pagination-next button {
          background: rgba(255,255,255,0.03) !important; border-color: ${T.border} !important; color: ${T.blueLight} !important;
        }
        .ant-modal .ant-input, .ant-modal .ant-input-affix-wrapper, .ant-modal .ant-input-textarea {
          background: rgba(255,255,255,0.04) !important; border-color: ${T.border} !important; color: ${T.text} !important;
        }
        .ant-modal .ant-input:focus, .ant-modal .ant-input-affix-wrapper:focus-within {
          border-color: ${T.gold} !important; box-shadow: 0 0 0 2px rgba(201,168,76,0.12) !important;
        }
        .ant-modal .ant-input::placeholder { color: ${T.textFaint} !important; }
        .ant-card-head-title { color: ${T.goldLight} !important; }
        .ant-progress-bg { transition: width 0.6s ease !important; }
      `}</style>
    </div>
  );
}