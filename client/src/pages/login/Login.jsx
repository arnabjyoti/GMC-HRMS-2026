import React from 'react'
import { Form, Input, Button, Select, Card, Row, Col, Typography } from "antd";
import { UserOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";

import './Login.css';

import GMC_Logo from "../../assets/Guwahati_Municipal_Corporation_Logo.png";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Login_Page() {

    const onFinish = (values) => {
        console.log("Login Data:", values);
        // call API here
    };


    return (
        <section>
            <div className="login-wrapper">
                <Row justify="center" align="middle" className="login-row">
                    <Col xs={22} sm={18} md={12} lg={8}>
                        <Card className="login-card" bordered={false}>

                            <div className="login-header">
                                <img
                                    src={GMC_Logo}
                                    alt="GMC Logo"
                                    className="login-logo"
                                />
                                <Title level={3} className="login-title">
                                    HRMS Portal
                                </Title>
                                <Text type="secondary">
                                    Guwahati Municipal Corporation
                                </Text>
                            </div>

                            <Form
                                name="hrms_login"
                                onFinish={onFinish}
                                layout="vertical"
                                className="login-form"
                            >
                                <Form.Item
                                    name="role"
                                    label="Select Role"
                                    rules={[{ required: true, message: "Please select role" }]}
                                >
                                    <Select placeholder="Choose your role">
                                        <Option value="admin">Admin</Option>
                                        <Option value="hr">HR Manager</Option>
                                        <Option value="employee">Employee</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="username"
                                    label="User ID"
                                    rules={[{ required: true, message: "Please enter your user ID" }]}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Enter User ID"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true, message: "Please enter password" }]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Enter Password"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="captcha"
                                    label="Captcha"
                                    rules={[{ required: true, message: "Please enter captcha" }]}
                                >
                                    <Input
                                        prefix={<SafetyOutlined />}
                                        placeholder="Enter Captcha"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block size="large">
                                        Login
                                    </Button>
                                </Form.Item>

                                <div className="login-footer">
                                    <a href="#">Forgot Password?</a>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    )
}
