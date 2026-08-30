import React, { useState } from "react";
import {
    Layout, Table, Button, Input, Tag, Avatar, Space, Tooltip,
    Modal, Form, Select, DatePicker, Row, Col, Divider, Steps,
    Popconfirm, Typography,
} from "antd";
import {
    TeamOutlined, UserAddOutlined, SearchOutlined, DownloadOutlined,
    EditOutlined, DeleteOutlined, StopOutlined,
    UserOutlined, IdcardOutlined, PhoneOutlined,
    BankOutlined, ReloadOutlined,
    CheckCircleOutlined, CloseCircleOutlined, PauseCircleOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";

const { Content } = Layout;
const { Option } = Select;

// ── Theme ─────────────────────────────────────────────────────
const T = {
    bg:        "#07111c",
    panel:     "linear-gradient(145deg,#0a1520 0%,#0d1b2a 100%)",
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
    inputBg:   "rgba(255,255,255,0.03)",
    green:     "#6a9a7a",
    amber:     "#c97a4a",
};

// ── Form input styles — lighter, more readable ────────────────
const formInputStyle = {
    background: "rgba(13,27,42,0.9)",
    border: "1px solid #2a5570",
    borderRadius: 4,
    color: "#ddeeff",
    fontFamily: "'Georgia',serif",
    fontSize: 13,
    height: 38,
};

const formTextAreaStyle = {
    background: "rgba(13,27,42,0.9)",
    border: "1px solid #2a5570",
    borderRadius: 4,
    color: "#ddeeff",
    fontFamily: "'Georgia',serif",
    fontSize: 13,
    resize: "none",
};

const labelStyle = {
    color: "#8aaec4",
    fontFamily: "'Georgia',serif",
    fontSize: 11,
    letterSpacing: 0.8,
    fontWeight: 600,
};

const selectStyle = { width: "100%", fontFamily: "'Georgia',serif" };

// ── Table search/toolbar input style ──────────────────────────
const inputStyle = {
    background: T.inputBg,
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    color: T.text,
    fontFamily: "'Georgia',serif",
    fontSize: 13,
};

// ── Dummy data ────────────────────────────────────────────────
const makeEmployees = (type, count, startId) =>
    Array.from({ length: count }, (_, i) => ({
        key: `${type}-${startId + i}`,
        empCode: `GMC${String(startId + i).padStart(4, "0")}`,
        name: ["Rajib Borah", "Priya Sharma", "Deepak Kalita", "Minakshi Das",
            "Anupam Gogoi", "Ritu Devi", "Sanjay Paul", "Nitu Baruah",
            "Bipul Das", "Kabita Nath"][i % 10],
        department: ["Administration", "Engineering", "Finance", "HR", "IT",
            "Medical", "Legal", "Payroll", "Compliance", "Recruitment"][i % 10],
        designation: ["HR Manager", "Software Developer", "Accountant",
            "Admin Officer", "IT Head", "Medical Officer", "Legal Advisor",
            "Payroll Clerk", "Compliance Officer", "Recruiter"][i % 10],
        dob: "15 Mar 1985",
        joiningDate: "01 Jan 202" + (i % 5),
        retirementDate: "31 Mar 204" + (i % 5),
        payGrade: ["GP-1", "GP-2", "GP-3", "GP-4", "Fixed"][i % 5],
        gender: i % 2 === 0 ? "Male" : "Female",
        religion: ["Hindu", "Muslim", "Christian", "Buddhist"][i % 4],
        caste: ["General", "OBC", "SC", "ST"][i % 4],
        contact: `98540${String(10000 + startId + i).slice(1)}`,
        address: `${100 + i} Gandhi Road, Guwahati, Assam`,
        aadhar: `XXXX-XXXX-${String(1000 + i)}`,
        pan: `ABCDE${String(1000 + i)}F`,
        type,
        status: ["Active", "Active", "Active", "Inactive", "Blocked"][i % 5],
    }));

const permanentData   = makeEmployees("Permanent",   18, 1);
const contractualData = makeEmployees("Contractual", 12, 101);
const deputationData  = makeEmployees("Deputation",   8, 201);

// ── Status tag ────────────────────────────────────────────────
const StatusTag = ({ status }) => {
    const map = {
        Active:   { color: "#6a9a7a", bg: "rgba(106,154,122,0.15)", border: "#1a4a2a", icon: <CheckCircleOutlined /> },
        Inactive: { color: "#6a8fa8", bg: "rgba(74,122,155,0.12)",  border: "#1e3a50", icon: <PauseCircleOutlined /> },
        Blocked:  { color: "#c97a4a", bg: "rgba(201,122,74,0.15)",  border: "#4a2010", icon: <CloseCircleOutlined /> },
    };
    const s = map[status] || map.Active;
    return (
        <Tag icon={s.icon} style={{
            background: s.bg, border: `1px solid ${s.border}`,
            color: s.color, fontFamily: "'Georgia',serif", fontSize: 11,
            display: "inline-flex", alignItems: "center", gap: 4,
            lineHeight: "20px", padding: "0 8px",
        }}>
            {status}
        </Tag>
    );
};

// ── Type badge ────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
    const map = {
        Permanent:   { color: T.goldLight, bg: "rgba(201,168,76,0.12)",  border: "#3a2d0a" },
        Contractual: { color: "#8aaec4",   bg: "rgba(74,122,155,0.12)",  border: "#1e3a50" },
        Deputation:  { color: "#b08ac4",   bg: "rgba(160,122,176,0.12)", border: "#3a1a4a" },
    };
    const s = map[type] || map.Permanent;
    return (
        <Tag style={{
            background: s.bg, border: `1px solid ${s.border}`,
            color: s.color, fontFamily: "'Georgia',serif", fontSize: 11,
        }}>
            {type}
        </Tag>
    );
};

// ── Table columns — fixed overlap ────────────────────────────
const makeColumns = (onEdit, onDelete, onBlock) => [
    {
        title: "Employee",
        dataIndex: "name",
        fixed: "left",
        width: 220,
        // ✅ overflow hidden prevents tag bleed from adjacent columns
        onCell: () => ({ style: { overflow: "hidden" } }),
        render: (name, row) => (
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <Avatar size={34} icon={<UserOutlined />} style={{
                    background: "linear-gradient(135deg,#0d3a5a,#1a6a9a)",
                    border: `1px solid ${T.border}`, flexShrink: 0,
                }} />
                <div style={{ lineHeight: 1.4, minWidth: 0, overflow: "hidden" }}>
                    <div style={{
                        color: T.text, fontFamily: "'Georgia',serif", fontSize: 13,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>{name}</div>
                    <div style={{
                        color: T.textDim, fontFamily: "'Georgia',serif", fontSize: 11,
                        whiteSpace: "nowrap",
                    }}>{row.empCode}</div>
                </div>
            </div>
        ),
    },
    {
        title: "Department",
        dataIndex: "department",
        width: 150,
        onCell: () => ({ style: { overflow: "hidden" } }),
        render: (d) => (
            <Tag style={{
                background: "rgba(74,122,155,0.1)", border: `1px solid #1e3a50`,
                color: T.blueLight, fontFamily: "'Georgia',serif", fontSize: 11,
                maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap", display: "inline-block",
            }}>{d}</Tag>
        ),
    },
    {
        title: "Designation",
        dataIndex: "designation",
        width: 170,
        onCell: () => ({ style: { overflow: "hidden" } }),
        render: (d) => (
            <span style={{
                color: T.text, fontFamily: "'Georgia',serif", fontSize: 12,
                display: "block", whiteSpace: "nowrap",
                overflow: "hidden", textOverflow: "ellipsis",
            }}>{d}</span>
        ),
    },
    {
        title: "Pay Grade",
        dataIndex: "payGrade",
        width: 100,
        render: (p) => (
            <span style={{
                color: T.goldLight, fontFamily: "'Georgia',serif",
                fontSize: 12, fontWeight: "bold",
            }}>{p}</span>
        ),
    },
    {
        title: "Joining",
        dataIndex: "joiningDate",
        width: 115,
        render: (d) => (
            <span style={{ color: T.blueMid, fontFamily: "'Georgia',serif", fontSize: 12 }}>{d}</span>
        ),
    },
    {
        title: "Retirement",
        dataIndex: "retirementDate",
        width: 115,
        render: (d) => (
            <span style={{ color: T.blueMid, fontFamily: "'Georgia',serif", fontSize: 12 }}>{d}</span>
        ),
    },
    {
        title: "Contact",
        dataIndex: "contact",
        width: 125,
        render: (c) => (
            <span style={{ color: T.text, fontFamily: "'Georgia',serif", fontSize: 12 }}>{c}</span>
        ),
    },
    {
        title: "Status",
        dataIndex: "status",
        width: 110,
        render: (s) => <StatusTag status={s} />,
    },
    {
        title: "Actions",
        fixed: "right",
        width: 110,
        render: (_, row) => (
            <Space size={5}>
                <Tooltip title="Edit" placement="top">
                    <Button size="small" icon={<EditOutlined />} onClick={() => onEdit(row)}
                        style={{
                            background: "rgba(201,168,76,0.08)", border: "1px solid #3a2d0a",
                            color: T.gold, width: 28, height: 28, padding: 0,
                        }} />
                </Tooltip>
                <Tooltip title="Block" placement="top">
                    <Button size="small" icon={<StopOutlined />} onClick={() => onBlock(row)}
                        style={{
                            background: "rgba(201,122,74,0.08)", border: "1px solid #3a2010",
                            color: T.amber, width: 28, height: 28, padding: 0,
                        }} />
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                    <Popconfirm
                        title={<span style={{ color: T.text, fontFamily: "'Georgia',serif" }}>Delete this employee?</span>}
                        onConfirm={() => onDelete(row.key)}
                        okText="Yes" cancelText="No"
                        okButtonProps={{ style: { background: "#8b1a1a", border: "none" } }}
                        placement="left"
                    >
                        <Button size="small" icon={<DeleteOutlined />}
                            style={{
                                background: "rgba(139,26,26,0.08)", border: "1px solid #3a0808",
                                color: "#cf6060", width: 28, height: 28, padding: 0,
                            }} />
                    </Popconfirm>
                </Tooltip>
            </Space>
        ),
    },
];

// ── Step definitions ──────────────────────────────────────────
const STEPS = [
    { title: "Personal",   icon: <UserOutlined /> },
    { title: "Identity",   icon: <IdcardOutlined /> },
    { title: "Employment", icon: <BankOutlined /> },
    { title: "Contact",    icon: <PhoneOutlined /> },
];

// ── Section header inside form ────────────────────────────────
const SectionLabel = ({ children }) => (
    <div style={{
        color: T.gold, fontFamily: "'Georgia',serif", fontSize: 11,
        letterSpacing: 1.5, textTransform: "uppercase",
        borderBottom: "1px solid #1e3a50", paddingBottom: 6, marginBottom: 16,
        marginTop: 4,
    }}>
        {children}
    </div>
);

// ── Add/Edit Employee Modal ───────────────────────────────────
function EmployeeFormModal({ open, onClose, editData, employeeType }) {
    const [form] = Form.useForm();
    const [step, setStep] = useState(0);
    const handleClose = () => { setStep(0); form.resetFields(); onClose(); };

    const stepContent = [
        // ── Step 0: Personal ──────────────────────────────────
        <div key="personal">
            <SectionLabel>Basic Information</SectionLabel>
            <Row gutter={[16, 4]}>
                <Col span={12}>
                    <Form.Item name="name" label={<span style={labelStyle}>Full Name</span>}
                        rules={[{ required: true, message: "Required" }]}>
                        <Input style={formInputStyle} placeholder="e.g. Rajib Borah" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="empCode" label={<span style={labelStyle}>Emp Code / ID</span>}
                        rules={[{ required: true }]}>
                        <Input style={formInputStyle} placeholder="e.g. GMC0001" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="dob" label={<span style={labelStyle}>Date of Birth</span>}
                        rules={[{ required: true }]}>
                        <DatePicker style={{ ...formInputStyle, width: "100%" }} format="DD MMM YYYY" placeholder="Select DOB" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="gender" label={<span style={labelStyle}>Gender</span>}
                        rules={[{ required: true }]}>
                        <Select style={selectStyle} placeholder="Select gender">
                            {["Male", "Female", "Other"].map(g => <Option key={g} value={g}>{g}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="bloodGroup" label={<span style={labelStyle}>Blood Group</span>}>
                        <Select style={selectStyle} placeholder="Select">
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(b =>
                                <Option key={b} value={b}>{b}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="religion" label={<span style={labelStyle}>Religion</span>}>
                        <Select style={selectStyle} placeholder="Select">
                            {["Hindu", "Muslim", "Christian", "Buddhist", "Sikh", "Jain", "Other"].map(r =>
                                <Option key={r} value={r}>{r}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="caste" label={<span style={labelStyle}>Caste Category</span>}>
                        <Select style={selectStyle} placeholder="Select">
                            {["General", "OBC", "SC", "ST", "EWS"].map(c =>
                                <Option key={c} value={c}>{c}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="maritalStatus" label={<span style={labelStyle}>Marital Status</span>}>
                        <Select style={selectStyle} placeholder="Select">
                            {["Single", "Married", "Divorced", "Widowed"].map(m =>
                                <Option key={m} value={m}>{m}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <SectionLabel>Address</SectionLabel>
            <Row gutter={[16, 4]}>
                <Col span={24}>
                    <Form.Item name="address" label={<span style={labelStyle}>Permanent Address</span>}
                        rules={[{ required: true }]}>
                        <Input.TextArea style={formTextAreaStyle} rows={2} placeholder="Enter full permanent address" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="localAddress" label={<span style={labelStyle}>Local / Present Address</span>}>
                        <Input.TextArea style={formTextAreaStyle} rows={2} placeholder="Enter local address (if different)" />
                    </Form.Item>
                </Col>
            </Row>
        </div>,

        // ── Step 1: Identity ──────────────────────────────────
        <div key="identity">
            <SectionLabel>Government ID Documents</SectionLabel>
            <Row gutter={[16, 4]}>
                <Col span={12}>
                    <Form.Item name="aadhar" label={<span style={labelStyle}>Aadhar Number</span>}
                        rules={[{ required: true }, { len: 12, message: "Must be 12 digits" }]}>
                        <Input style={formInputStyle} placeholder="xxxx xxxx xxxx" maxLength={12} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="pan" label={<span style={labelStyle}>PAN Number</span>}
                        rules={[{ required: true }]}>
                        <Input style={formInputStyle} placeholder="ABCDE1234F" maxLength={10} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="voterId" label={<span style={labelStyle}>Voter ID</span>}>
                        <Input style={formInputStyle} placeholder="Enter Voter ID" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="drivingLicense" label={<span style={labelStyle}>Driving License (if any)</span>}>
                        <Input style={formInputStyle} placeholder="Enter DL number" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="passport" label={<span style={labelStyle}>Passport No. (if any)</span>}>
                        <Input style={formInputStyle} placeholder="Enter passport number" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="passportExpiry" label={<span style={labelStyle}>Passport Expiry</span>}>
                        <DatePicker style={{ ...formInputStyle, width: "100%" }} format="DD MMM YYYY" placeholder="Select date" />
                    </Form.Item>
                </Col>
            </Row>
            <SectionLabel>Provident Fund & ESI</SectionLabel>
            <Row gutter={[16, 4]}>
                <Col span={12}>
                    <Form.Item name="pfAccount" label={<span style={labelStyle}>PF Account No.</span>}>
                        <Input style={formInputStyle} placeholder="e.g. AS/GHY/001/0001" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="esiNumber" label={<span style={labelStyle}>ESI Number</span>}>
                        <Input style={formInputStyle} placeholder="Enter ESI number" />
                    </Form.Item>
                </Col>
            </Row>
        </div>,

        // ── Step 2: Employment ────────────────────────────────
        <div key="employment">
            <SectionLabel>Role & Classification</SectionLabel>
            <Row gutter={[16, 4]}>
                <Col span={12}>
                    <Form.Item name="employeeType" label={<span style={labelStyle}>Employee Type</span>}
                        rules={[{ required: true }]} initialValue={employeeType}>
                        <Select style={selectStyle} placeholder="Select type">
                            {["Permanent", "Contractual", "Deputation"].map(t =>
                                <Option key={t} value={t}>{t}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="department" label={<span style={labelStyle}>Department</span>}
                        rules={[{ required: true }]}>
                        <Select style={selectStyle} placeholder="Select department">
                            {["Administration", "Engineering", "Finance", "Human Resources",
                                "Information Technology", "Medical", "Legal", "Payroll",
                                "Compliance", "Recruitment", "Public Works", "Revenue"].map(d =>
                                    <Option key={d} value={d}>{d}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="designation" label={<span style={labelStyle}>Designation</span>}
                        rules={[{ required: true }]}>
                        <Select style={selectStyle} placeholder="Select designation" showSearch>
                            {["Commissioner", "Deputy Commissioner", "HR Manager", "HR Officer",
                                "Software Developer", "Senior Developer", "System Admin", "IT Head",
                                "Accountant", "Finance Officer", "Chief Finance Officer",
                                "Medical Officer", "Junior Medical Officer", "Legal Advisor",
                                "Admin Officer", "Junior Admin Officer", "Payroll Clerk",
                                "Compliance Officer", "Recruiter", "Data Entry Operator",
                                "Junior Engineer", "Senior Engineer", "Executive Engineer",
                                "Ward Officer", "Health Officer"].map(d =>
                                    <Option key={d} value={d}>{d}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="payGrade" label={<span style={labelStyle}>Pay Grade</span>}
                        rules={[{ required: true }]}>
                        <Select style={selectStyle} placeholder="Select pay grade">
                            {["Fixed", "GP-1 (₹1800)", "GP-2 (₹1900)", "GP-3 (₹2000)",
                                "GP-4 (₹2400)", "GP-5 (₹2800)", "GP-6 (₹4200)",
                                "GP-7 (₹4600)", "GP-8 (₹4800)", "GP-9 (₹5400)",
                                "GP-10 (₹6600)", "GP-11 (₹7600)", "GP-12 (₹8700)"].map(g =>
                                    <Option key={g} value={g}>{g}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <SectionLabel>Service Dates</SectionLabel>
            <Row gutter={[16, 4]}>
                <Col span={8}>
                    <Form.Item name="joiningDate" label={<span style={labelStyle}>Date of Joining</span>}
                        rules={[{ required: true }]}>
                        <DatePicker style={{ ...formInputStyle, width: "100%" }} format="DD MMM YYYY" placeholder="Select date" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="retirementDate" label={<span style={labelStyle}>Retirement Date</span>}>
                        <DatePicker style={{ ...formInputStyle, width: "100%" }} format="DD MMM YYYY" placeholder="Select date" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="status" label={<span style={labelStyle}>Status</span>} initialValue="Active">
                        <Select style={selectStyle}>
                            <Option value="Active">Active</Option>
                            <Option value="Inactive">Inactive</Option>
                            <Option value="Blocked">Blocked</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="qualification" label={<span style={labelStyle}>Highest Qualification</span>}>
                        <Select style={selectStyle} placeholder="Select">
                            {["10th Pass", "12th Pass", "Diploma", "B.A.", "B.Sc.", "B.Com.",
                                "B.Tech / B.E.", "M.A.", "M.Sc.", "M.Com.", "M.Tech",
                                "MBA", "LLB", "MBBS", "Ph.D.", "Other"].map(q =>
                                    <Option key={q} value={q}>{q}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="reportingManager" label={<span style={labelStyle}>Reporting Manager</span>}>
                        <Input style={formInputStyle} placeholder="Manager name or code" />
                    </Form.Item>
                </Col>
            </Row>
        </div>,

        // ── Step 3: Contact & Bank ────────────────────────────
        <div key="contact">
            <SectionLabel>Contact Information</SectionLabel>
            <Row gutter={[16, 4]}>
                <Col span={12}>
                    <Form.Item name="mobile" label={<span style={labelStyle}>Mobile Number</span>}
                        rules={[{ required: true }]}>
                        <Input style={formInputStyle} placeholder="+91 XXXXX XXXXX" maxLength={13} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="alternateMobile" label={<span style={labelStyle}>Alternate Mobile</span>}>
                        <Input style={formInputStyle} placeholder="+91 XXXXX XXXXX" maxLength={13} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="email" label={<span style={labelStyle}>Official Email</span>}
                        rules={[{ type: "email" }]}>
                        <Input style={formInputStyle} placeholder="name@gmc.gov.in" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="personalEmail" label={<span style={labelStyle}>Personal Email</span>}
                        rules={[{ type: "email" }]}>
                        <Input style={formInputStyle} placeholder="personal@email.com" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="emergencyContact" label={<span style={labelStyle}>Emergency Contact Name</span>}>
                        <Input style={formInputStyle} placeholder="Enter name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="emergencyPhone" label={<span style={labelStyle}>Emergency Contact No.</span>}>
                        <Input style={formInputStyle} placeholder="+91 XXXXX XXXXX" />
                    </Form.Item>
                </Col>
            </Row>
            <SectionLabel>Bank Details</SectionLabel>
            <Row gutter={[16, 4]}>
                <Col span={12}>
                    <Form.Item name="bankName" label={<span style={labelStyle}>Bank Name</span>}>
                        <Input style={formInputStyle} placeholder="e.g. State Bank of India" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="accountNumber" label={<span style={labelStyle}>Account Number</span>}>
                        <Input style={formInputStyle} placeholder="Enter account number" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="ifscCode" label={<span style={labelStyle}>IFSC Code</span>}>
                        <Input style={formInputStyle} placeholder="e.g. SBIN0001234" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="accountType" label={<span style={labelStyle}>Account Type</span>}>
                        <Select style={selectStyle} placeholder="Select">
                            <Option value="Savings">Savings</Option>
                            <Option value="Current">Current</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </div>,
    ];

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            width={800}
            centered
            styles={{
                content: {
                    background: "#08131e",
                    border: "1px solid #1e3a50",
                    borderRadius: 8,
                    padding: 0,
                    boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
                },
                header: {
                    background: "linear-gradient(90deg,#06101a,#0c1e30)",
                    borderBottom: "1px solid #1e3a50",
                    // no padding override — let Ant Design handle it so close btn stays in its spot
                    borderRadius: "8px 8px 0 0",
                },
                body: { padding: 0 },
                mask: { background: "rgba(0,0,0,0.8)" },
            }}
            title={
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                        width: 3, height: 24,
                        background: "linear-gradient(180deg,#f0d080,#8b6914)",
                        borderRadius: 2,
                    }} />
                    <div>
                        <div style={{ color: T.goldLight, fontFamily: "'Georgia',serif", fontSize: 15, fontWeight: "bold" }}>
                            {editData ? "Edit Employee" : `Add ${employeeType} Employee`}
                        </div>
                        <div style={{ color: T.textDim, fontFamily: "'Georgia',serif", fontSize: 10, letterSpacing: 1, marginTop: 2 }}>
                            GAUHATI MUNICIPAL CORPORATION — HRMS
                        </div>
                    </div>
                </div>
            }
        >
            {/* ── Steps bar ── */}
            <div style={{
                padding: "14px 32px",
                background: "linear-gradient(90deg,#06101a,#0c1e30)",
                borderBottom: "1px solid #162840",
            }}>
                <Steps current={step} size="small">
                    {STEPS.map((s, i) => (
                        <Steps.Step
                            key={s.title}
                            title={
                                <span style={{
                                    color: i === step ? T.goldLight : i < step ? T.green : "#3a6080",
                                    fontSize: 12, fontFamily: "'Georgia',serif",
                                    fontWeight: i === step ? "bold" : "normal",
                                }}>
                                    {s.title}
                                </span>
                            }
                            icon={
                                <span style={{
                                    color: i === step ? T.gold : i < step ? T.green : "#2a5070",
                                    fontSize: 15,
                                }}>
                                    {s.icon}
                                </span>
                            }
                        />
                    ))}
                </Steps>
            </div>

            {/* ── Form body ── */}
            <div style={{
                padding: "24px 32px",
                maxHeight: 440,
                overflowY: "auto",
                background: "#09141f",
            }}>
                <Form form={form} layout="vertical" requiredMark={false}>
                    {stepContent[step]}
                </Form>
            </div>

            {/* ── Footer ── */}
            <div style={{
                padding: "14px 24px",
                background: "linear-gradient(90deg,#06101a,#0c1e30)",
                borderTop: "1px solid #1e3a50",
                borderRadius: "0 0 8px 8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                {/* Progress dots */}
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {STEPS.map((_, i) => (
                        <div key={i} style={{
                            width: i === step ? 20 : 7,
                            height: 7,
                            borderRadius: 4,
                            background: i === step ? T.gold : i < step ? T.green : "#1e3a50",
                            transition: "all 0.3s",
                        }} />
                    ))}
                    <span style={{ color: T.textDim, fontFamily: "'Georgia',serif", fontSize: 11, marginLeft: 8 }}>
                        Step {step + 1} of {STEPS.length}
                    </span>
                </div>

                <Space size={10}>
                    {step > 0 && (
                        <Button onClick={() => setStep(s => s - 1)} style={{
                            background: "rgba(74,122,155,0.1)", border: "1px solid #2a5570",
                            color: T.blueLight, fontFamily: "'Georgia',serif",
                        }}>
                            ← Previous
                        </Button>
                    )}
                    <Button onClick={handleClose} style={{
                        background: "transparent", border: "1px solid #1e3a50",
                        color: T.blueMid, fontFamily: "'Georgia',serif",
                    }}>
                        Cancel
                    </Button>
                    {step < STEPS.length - 1 ? (
                        <Button type="primary" onClick={() => setStep(s => s + 1)} style={{
                            background: "linear-gradient(90deg,#8b6914,#c9a84c,#8b6914)",
                            border: "none", color: "#07111c",
                            fontFamily: "'Georgia',serif", fontWeight: "bold",
                            paddingLeft: 20, paddingRight: 20,
                        }}>
                            Next →
                        </Button>
                    ) : (
                        <Button type="primary" icon={<CheckCircleOutlined />}
                            onClick={() => form.validateFields().then(() => handleClose())}
                            style={{
                                background: "linear-gradient(90deg,#1a4a2a,#2a7a4a,#1a4a2a)",
                                border: "none", color: "#fff",
                                fontFamily: "'Georgia',serif", fontWeight: "bold",
                            }}>
                            Save Employee
                        </Button>
                    )}
                </Space>
            </div>

            <style>{`
                /* Modal close button — make it visible */
                .ant-modal .ant-modal-close {
                    color: #6a8fa8 !important;
                    top: 14px !important;
                    inset-inline-end: 16px !important;
                }
                .ant-modal .ant-modal-close:hover { color: #f0d080 !important; background: rgba(201,168,76,0.1) !important; border-radius: 4px; }
                .ant-modal .ant-modal-close-x { font-size: 16px !important; }
                /* Header title area padding so it doesn't crash into close btn */
                .ant-modal .ant-modal-header { padding: 14px 48px 14px 24px !important; }
                .ant-modal .ant-modal-title { width: 100% !important; }
                /* Steps */
                .ant-steps-item-process .ant-steps-item-icon { background: rgba(201,168,76,0.15) !important; border-color: #c9a84c !important; }
                .ant-steps-item-finish .ant-steps-item-icon { background: rgba(106,154,122,0.15) !important; border-color: #6a9a7a !important; }
                .ant-steps-item-finish .ant-steps-icon { color: #6a9a7a !important; }
                .ant-steps-item-wait .ant-steps-item-icon { background: rgba(42,80,112,0.3) !important; border-color: #1e3a50 !important; }
                .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after { background-color: #6a9a7a !important; }
                .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after { background-color: #1e3a50 !important; }

                /* Form inputs inside modal — the key fix */
                .ant-modal .ant-input,
                .ant-modal .ant-input-affix-wrapper {
                    background: rgba(13,27,42,0.9) !important;
                    border-color: #2a5570 !important;
                    color: #ddeeff !important;
                }
                .ant-modal .ant-input::placeholder { color: #3a6888 !important; }
                .ant-modal .ant-input:hover,
                .ant-modal .ant-input-affix-wrapper:hover { border-color: #4a8aab !important; }
                .ant-modal .ant-input:focus,
                .ant-modal .ant-input-affix-wrapper:focus-within {
                    border-color: #c9a84c !important;
                    box-shadow: 0 0 0 2px rgba(201,168,76,0.15) !important;
                }
                /* TextArea */
                .ant-modal textarea.ant-input {
                    height: auto !important;
                    background: rgba(13,27,42,0.9) !important;
                    border-color: #2a5570 !important;
                    color: #ddeeff !important;
                }
                /* DatePicker */
                .ant-modal .ant-picker {
                    background: rgba(13,27,42,0.9) !important;
                    border-color: #2a5570 !important;
                }
                .ant-modal .ant-picker:hover { border-color: #4a8aab !important; }
                .ant-modal .ant-picker-focused { border-color: #c9a84c !important; box-shadow: 0 0 0 2px rgba(201,168,76,0.15) !important; }
                .ant-modal .ant-picker-input > input { color: #ddeeff !important; background: transparent !important; }
                .ant-modal .ant-picker-input > input::placeholder { color: #3a6888 !important; }
                .ant-modal .ant-picker-suffix { color: #4a7a9b !important; }
                /* Select */
                .ant-modal .ant-select-selector {
                    background: rgba(13,27,42,0.9) !important;
                    border-color: #2a5570 !important;
                    height: 38px !important;
                    align-items: center !important;
                }
                .ant-modal .ant-select:not(.ant-select-disabled) .ant-select-selector:hover { border-color: #4a8aab !important; }
                .ant-modal .ant-select-focused .ant-select-selector { border-color: #c9a84c !important; box-shadow: 0 0 0 2px rgba(201,168,76,0.15) !important; }
                .ant-modal .ant-select-selection-item,
                .ant-modal .ant-select-selection-placeholder { color: #ddeeff !important; font-family: 'Georgia',serif !important; line-height: 36px !important; }
                .ant-modal .ant-select-selection-placeholder { color: #3a6888 !important; }
                .ant-modal .ant-select-arrow { color: #4a7a9b !important; }
                /* Dropdown */
                .ant-select-dropdown { background: #0d1e2e !important; border: 1px solid #2a5570 !important; box-shadow: 0 8px 32px rgba(0,0,0,0.6) !important; }
                .ant-select-item { color: #8aaec4 !important; font-family: 'Georgia',serif !important; padding: 8px 12px !important; }
                .ant-select-item-option-active { background: rgba(74,122,155,0.12) !important; }
                .ant-select-item-option-selected { background: rgba(201,168,76,0.12) !important; color: #f0d080 !important; }
                /* DatePicker dropdown */
                .ant-picker-dropdown .ant-picker-panel-container { background: #0d1e2e !important; border: 1px solid #2a5570 !important; }
                .ant-picker-dropdown .ant-picker-header { color: #c9a84c !important; border-bottom: 1px solid #1e3a50 !important; }
                .ant-picker-dropdown .ant-picker-header button { color: #8aaec4 !important; }
                .ant-picker-dropdown .ant-picker-content th { color: #4a7a9b !important; }
                .ant-picker-dropdown .ant-picker-cell .ant-picker-cell-inner { color: #6a8fa8 !important; }
                .ant-picker-dropdown .ant-picker-cell-in-view .ant-picker-cell-inner { color: #c0d8e8 !important; }
                .ant-picker-dropdown .ant-picker-cell:hover .ant-picker-cell-inner { background: rgba(74,122,155,0.12) !important; }
                .ant-picker-dropdown .ant-picker-cell-selected .ant-picker-cell-inner { background: #c9a84c !important; color: #07111c !important; }
                .ant-picker-dropdown .ant-picker-today-btn { color: #c9a84c !important; }
                /* Form labels */
                .ant-modal .ant-form-item-label > label { color: #8aaec4 !important; font-family: 'Georgia',serif !important; }
                .ant-modal .ant-form-item-explain-error { color: #e07060 !important; font-family: 'Georgia',serif !important; font-size: 11px !important; }
                /* Scrollbar */
                div[style*="overflowY"]::-webkit-scrollbar { width: 5px; }
                div[style*="overflowY"]::-webkit-scrollbar-track { background: #06101a; }
                div[style*="overflowY"]::-webkit-scrollbar-thumb { background: #2a5570; border-radius: 3px; }
                div[style*="overflowY"]::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
            `}</style>
        </Modal>
    );
}

// ── Main Employee List ────────────────────────────────────────
export default function EmployeeList() {
    const [search, setSearch]       = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData]   = useState(null);
    const [activeType, setActiveType] = useState("Permanent");

    const dataMap = { Permanent: permanentData, Contractual: contractualData, Deputation: deputationData };
    const currentData = dataMap[activeType] || [];

    const filtered = currentData.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.empCode.toLowerCase().includes(search.toLowerCase()) ||
        e.department.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit   = (row) => { setEditData(row); setModalOpen(true); };
    const handleDelete = (key) => { /* wire to API */ };
    const handleBlock  = (row) => { /* wire to API */ };

    const handleExport = () => {
        const exportData = currentData.map(e => ({
            "Emp Code": e.empCode, "Name": e.name, "Department": e.department,
            "Designation": e.designation, "Pay Grade": e.payGrade,
            "Joining Date": e.joiningDate, "Retirement Date": e.retirementDate,
            "DOB": e.dob, "Gender": e.gender, "Religion": e.religion,
            "Caste": e.caste, "Contact": e.contact, "Address": e.address,
            "Aadhar": e.aadhar, "PAN": e.pan, "Type": e.type, "Status": e.status,
        }));
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `${activeType} Employees`);
        XLSX.writeFile(wb, `GMC_${activeType}_Employees_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const typeConfig = {
        Permanent:   { color: T.goldLight, border: "#3a2d0a", bg: "rgba(201,168,76,0.1)",  count: permanentData.length },
        Contractual: { color: T.blueLight, border: T.border,  bg: "rgba(74,122,155,0.1)",  count: contractualData.length },
        Deputation:  { color: "#b08ac4",   border: "#3a1a4a", bg: "rgba(160,122,176,0.1)", count: deputationData.length },
    };

    return (
        <Content style={{ background: T.bg, minHeight: "100vh", padding: "24px 28px" }}>

            {/* ── Page header ── */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 4, height: 28, borderRadius: 2, background: "linear-gradient(180deg,#c9a84c,#8b6914)" }} />
                        <div>
                            <div style={{ color: T.goldLight, fontFamily: "'Georgia',serif", fontSize: 20, fontWeight: "bold" }}>
                                Employee Management
                            </div>
                            <div style={{ color: T.textDim, fontFamily: "'Georgia',serif", fontSize: 11, letterSpacing: 1.5, marginTop: 2 }}>
                                GAUHATI MUNICIPAL CORPORATION — HRMS
                            </div>
                        </div>
                    </div>
                    <Space>
                        <Button icon={<DownloadOutlined />} onClick={handleExport} style={{
                            background: "rgba(106,154,122,0.1)", border: "1px solid #1a3a2a",
                            color: T.green, fontFamily: "'Georgia',serif",
                        }}>
                            Export Excel
                        </Button>
                        <Button type="primary" icon={<UserAddOutlined />}
                            onClick={() => { setEditData(null); setModalOpen(true); }}
                            style={{
                                background: "linear-gradient(90deg,#8b6914,#c9a84c,#8b6914)",
                                border: "none", color: "#07111c",
                                fontFamily: "'Georgia',serif", fontWeight: "bold",
                            }}>
                            + Add Employee
                        </Button>
                    </Space>
                </div>
                <Divider style={{ borderColor: T.border, margin: "14px 0 0" }} />
            </div>

            {/* ── Type selector cards ── */}
            <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
                {Object.entries(typeConfig).map(([type, cfg]) => (
                    <Col xs={24} sm={8} key={type}>
                        <div onClick={() => setActiveType(type)} style={{
                            background: activeType === type
                                ? `linear-gradient(135deg,${cfg.bg},rgba(0,0,0,0.3))`
                                : "linear-gradient(145deg,#0a1520,#0d1b2a)",
                            border: `1px solid ${activeType === type ? cfg.border : T.border}`,
                            borderRadius: 6, padding: "16px 20px", cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: activeType === type ? `0 4px 20px ${cfg.bg}` : "none",
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ color: T.textDim, fontFamily: "'Georgia',serif", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" }}>
                                        {type} Employees
                                    </div>
                                    <div style={{ color: cfg.color, fontFamily: "'Georgia',serif", fontSize: 28, fontWeight: "bold", lineHeight: 1.3, marginTop: 4 }}>
                                        {cfg.count}
                                    </div>
                                    <div style={{ color: T.textFaint, fontFamily: "'Georgia',serif", fontSize: 10, marginTop: 2 }}>
                                        registered
                                    </div>
                                </div>
                                <TeamOutlined style={{ fontSize: 30, color: activeType === type ? cfg.color : T.textFaint, opacity: 0.5 }} />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* ── Table ── */}
            <div style={{ background: "linear-gradient(145deg,#0a1520,#0d1b2a)", border: `1px solid ${T.border}`, borderRadius: 6 }}>
                {/* Toolbar */}
                <div style={{
                    padding: "12px 18px", background: "#06101a",
                    borderBottom: `1px solid ${T.border}`, borderRadius: "6px 6px 0 0",
                    display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <TypeBadge type={activeType} />
                        <span style={{ color: T.goldLight, fontFamily: "'Georgia',serif", fontSize: 13, fontWeight: "bold" }}>
                            {activeType} Employees
                        </span>
                        <Tag style={{
                            background: "rgba(201,168,76,0.08)", border: "1px solid #3a2d0a",
                            color: T.gold, fontFamily: "'Georgia',serif", fontSize: 11,
                        }}>
                            {filtered.length} records
                        </Tag>
                    </div>
                    <Space>
                        <Input
                            prefix={<SearchOutlined style={{ color: T.blue }} />}
                            placeholder="Search name, code, dept..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            allowClear
                            style={{ ...inputStyle, width: 240, height: 34 }}
                        />
                        <Tooltip title="Clear search">
                            <Button size="small" icon={<ReloadOutlined />} onClick={() => setSearch("")}
                                style={{ background: T.inputBg, border: `1px solid ${T.border}`, color: T.blueMid, height: 34, width: 34 }} />
                        </Tooltip>
                    </Space>
                </div>

                <Table
                    dataSource={filtered}
                    columns={makeColumns(handleEdit, handleDelete, handleBlock)}
                    scroll={{ x: 1100 }}
                    size="middle"
                    tableLayout="fixed"
                    pagination={{
                        pageSize: 8,
                        showSizeChanger: true,
                        pageSizeOptions: ["8", "15", "25", "50"],
                        showTotal: (total, range) => (
                            <span style={{ color: T.textDim, fontFamily: "'Georgia',serif", fontSize: 11 }}>
                                Showing {range[0]}–{range[1]} of {total} employees
                            </span>
                        ),
                        style: { padding: "12px 18px", borderTop: `1px solid ${T.borderSub}` },
                    }}
                    style={{ background: "transparent" }}
                />
            </div>

            <EmployeeFormModal
                open={modalOpen}
                onClose={() => { setModalOpen(false); setEditData(null); }}
                editData={editData}
                employeeType={activeType}
            />

            <style>{`
                /* Table base */
                .ant-table { background: transparent !important; }
                .ant-table-thead > tr > th {
                    background: #06101a !important; color: ${T.textDim} !important;
                    border-bottom: 1px solid ${T.border} !important;
                    font-family: 'Georgia',serif !important; font-size: 11px !important;
                    letter-spacing: 1px !important; text-transform: uppercase !important;
                    padding: 10px 12px !important;
                    overflow: hidden !important;
                }
                /* Fixed header cells need same bg */
                .ant-table-thead .ant-table-cell-fix-left,
                .ant-table-thead .ant-table-cell-fix-right { background: #06101a !important; }
                .ant-table-tbody > tr > td {
                    background: transparent !important;
                    border-bottom: 1px solid ${T.borderSub} !important;
                    padding: 11px 12px !important;
                    /* ✅ Critical fix: prevents cell content from bleeding into adjacent cells */
                    overflow: hidden !important;
                    max-width: 0;
                }
                .ant-table-tbody > tr:hover > td { background: rgba(74,122,155,0.06) !important; }
                /* Fixed columns — match table body bg exactly */
                .ant-table-cell-fix-left,
                .ant-table-cell-fix-right { background: #0a1520 !important; }
                /* On row hover match the hover tint */
                .ant-table-tbody > tr:hover .ant-table-cell-fix-left,
                .ant-table-tbody > tr:hover .ant-table-cell-fix-right { background: #0e2030 !important; }
                /* Remove the default pseudo-shadow/line Ant puts on fixed cols */
                .ant-table-cell-fix-left::after { box-shadow: none !important; border-right: 1px solid #1e3a50 !important; }
                .ant-table-cell-fix-right::before { box-shadow: none !important; border-left: 1px solid #1e3a50 !important; }
                /* Pagination */
                .ant-pagination-item { background: rgba(255,255,255,0.03) !important; border-color: ${T.border} !important; }
                .ant-pagination-item a { color: ${T.blueLight} !important; font-family: 'Georgia',serif !important; }
                .ant-pagination-item-active { background: rgba(201,168,76,0.12) !important; border-color: #8b6914 !important; }
                .ant-pagination-item-active a { color: ${T.goldLight} !important; }
                .ant-pagination-prev button, .ant-pagination-next button {
                    background: rgba(255,255,255,0.03) !important; border-color: ${T.border} !important; color: ${T.blueLight} !important;
                }
                .ant-pagination-options .ant-select-selector {
                    background: rgba(255,255,255,0.03) !important; border-color: ${T.border} !important; color: ${T.blueLight} !important;
                }
                /* Search input */
                .ant-input-affix-wrapper { background: rgba(255,255,255,0.03) !important; border-color: ${T.border} !important; }
                .ant-input-affix-wrapper:hover { border-color: ${T.blue} !important; }
                .ant-input-affix-wrapper:focus-within { border-color: ${T.gold} !important; box-shadow: 0 0 0 2px rgba(201,168,76,0.12) !important; }
                .ant-input { background: transparent !important; color: ${T.text} !important; }
                .ant-input::placeholder { color: ${T.textFaint} !important; }
                /* Tooltip */
                .ant-tooltip-inner { background: #0d1b2a !important; border: 1px solid ${T.border} !important; color: ${T.text} !important; font-family: 'Georgia',serif !important; }
                .ant-tooltip-arrow::before { background: #0d1b2a !important; }
                /* Popconfirm */
                .ant-popover-inner { background: #0d1b2a !important; border: 1px solid ${T.border} !important; }
                .ant-popover-inner-content { color: ${T.text} !important; }
                .ant-btn-sm { height: 28px !important; }
                /* Disable ant's overflow:visible that causes bleed */
                .ant-table-wrapper .ant-spin-nested-loading .ant-spin-container { overflow: hidden !important; }
            `}</style>
        </Content>
    );
}