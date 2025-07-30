import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, message, Typography, Form, Input, Button, Card } from "antd";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";
import { useForgotPassword } from "../Hooks/useForgotPassword";
import { initializeTheme, setAuthBackground } from "../utils/ThemeManager";
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
    const [isDarkMode, setIsDarkMode] = useState(true);

        useEffect(() => {
      // Initialize theme from localStorage on component mount
      const initialTheme = initializeTheme();
      setIsDarkMode(initialTheme);
  
      // Set the background image via CSS variable
      setAuthBackground(initialTheme);
  
    }, []);

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
    <div className="auth-container">
    <div
      className="auth-wrapper"
    >
      <Card
        className={`auth-card ${isDarkMode ? 'dark' : 'light'}`}

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
              className={`auth-input ${isDarkMode ? 'dark' : 'light'}`}
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


