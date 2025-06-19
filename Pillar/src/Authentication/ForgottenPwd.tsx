import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spin, message, Typography, Form, Input, Button, Card } from "antd";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";
import { useForgotPassword } from "../Hooks/useForgotPassword";
import '../index.css';

const { Title, Text } = Typography;

type ForgottenPwdFormValues = {
  email: string;
};

type ForgottenPwdErrors = {
  email?: string;
};

const ForgottenPwd = () => {
  useDocumentTitle("SecretPlace - Forgot Password");

  const [formValues, setFormValues] = useState<ForgottenPwdFormValues>({
    email: "",
  });
  const [errors, setErrors] = useState<ForgottenPwdErrors>({});
  const { forgotPassword, loading } = useForgotPassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors: ForgottenPwdErrors = {};
    if (!formValues.email) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Enter a valid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await forgotPassword({ email: formValues.email });
      message.success("Reset password link sent! Please check your email.");
    } catch (err: any) {
      message.error(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}
    >
      <Card
        style={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 10 }}>
          Forgot Password
        </Title>
        <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
          Please enter your email address, and we'll send instructions to reset
          your password.
        </Text>

        <Form layout="vertical" style={{ marginTop: 20 }}>
          <Form.Item
            label="Email Address"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email}
          >
            <Input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formValues.email}
              onChange={handleChange}
            />
          </Form.Item>

          <Button
            type="primary"
            block
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : "Submit"}
          </Button>

          <Text
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            Remembered your password?{" "}
            <Link to="/login" style={{ color: "#1890ff" }}>
              Login
            </Link>
          </Text>
        </Form>
      </Card>
    </div>
    </div>
  );
};

export default ForgottenPwd;


