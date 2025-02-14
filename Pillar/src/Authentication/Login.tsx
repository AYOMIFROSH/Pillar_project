import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, message, Input, Form, Button, Typography, Card } from "antd";
import useLogin from "../Hooks/useLogin";
import "../index.css"

const { Title, Text } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const { loginUser, loading, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    const newErrors: LoginErrors = {};

    if (!formValues.email) newErrors.email = "Email address is required";
    if (!formValues.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      loginUser(formValues);
    }
  };

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <div className="container">
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
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
        <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
          Welcome Back
        </Title>

        <Form layout="vertical">
          <Form.Item
            label="Email Address"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email}
          >
            <Input
              name="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password}
          >
            <Input.Password
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spin /> : "Sign In"}
          </Button>

          <Text
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 16,
            }}
          >
            <Link to="/forgot" style={{ color: "#1890ff" }}>
              Forgot Password?
            </Link>
          </Text>

          <Text style={{ display: "block", textAlign: "center", marginTop: 8 }}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#1890ff" }}>
              Sign Up
            </Link>
          </Text>
        </Form>
      </Card>
    </div>
    </div>
  );
};

export default Login;


