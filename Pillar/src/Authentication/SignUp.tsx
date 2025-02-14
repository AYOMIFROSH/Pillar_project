import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, message, Input, Form, Button, Typography, Card } from "antd";
import UseRegister from "../Hooks/useSignup";
import '../index.css';

const { Title, Text } = Typography;

type FormValues = {
  Name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = {
  Name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    Name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const { loading, error, registeruser } = UseRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    const newErrors: Errors = {};
    if (!formValues.Name) newErrors.Name = "Username is required";
    if (!formValues.email) newErrors.email = "Email address is required";
    if (!formValues.password) newErrors.password = "Password is required";
    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      registeruser({
        Name: formValues.Name,
        email: formValues.email,
        password: formValues.password
      });
    }
  };

  useEffect(() => {
    if (error) {
      message.error({
        className: "antd-error",
        content: error,
      });
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
          Create an Account
        </Title>

        <Form layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            label="Name"
            validateStatus={errors.Name ? "error" : ""}
            help={errors.Name}
          >
            <Input
              name="Name"
              placeholder="Enter your name"
              value={formValues.Name}
              onChange={handleChange}
            />
          </Form.Item>

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

          <Form.Item
            label="Confirm Password"
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword}
          >
            <Input.Password
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formValues.confirmPassword}
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
            {loading ? <Spin /> : "Sign Up"}
          </Button>
        </Form>

        <Text style={{ display: "block", textAlign: "center", marginTop: 16 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1890ff" }}>
            Login
          </Link>
        </Text>
      </Card>
    </div>
    </div>
  );
};

export default SignUp;
