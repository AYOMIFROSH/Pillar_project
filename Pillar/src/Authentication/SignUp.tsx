import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, message, Input, Form, Button, Typography, Card } from "antd";
import UseRegister from "../Hooks/useSignup";
import '../Auth.css';
import { initializeTheme, toggleTheme, setAuthBackground } from "../utils/ThemeManager";
import feature1 from '../assets/image2.png'

const { Title, Text } = Typography;

// Inline Logo Component
const InlineSecretPlaceLogo: React.FC = () => {
  return (
    <div className="logo-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 60"
        className="secret-place-logo"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Main Logo Group */}
        <g fill="url(#logo-gradient)">
          {/* Abstract icon representing connection/communication */}
          <g transform="translate(0, 10)">
            <circle cx="20" cy="20" r="16" fill="none" stroke="url(#logo-gradient)" strokeWidth="2.5" />
            <path d="M20,10 L30,20 L20,30 L10,20 Z" fill="url(#logo-gradient)" opacity="0.6" />
            <circle cx="20" cy="20" r="6" fill="url(#logo-gradient)" />
          </g>

          {/* Text "SecretPlace" */}
          <text x="48" y="35" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24">
            SecretPlace
          </text>
        </g>
      </svg>
    </div>
  );
};

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

  const handleToggleTheme = () => {
    const newTheme = toggleTheme(isDarkMode);
    setIsDarkMode(newTheme);

    setAuthBackground(newTheme);
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
    <div className={`auth-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="auth-wrapper">
        <Card
          className={`auth-card ${isDarkMode ? 'dark' : 'light'}`}
        >
          <div className="theme-toggle-container">
            <button
              onClick={handleToggleTheme}
              className="theme-toggle"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>

          <InlineSecretPlaceLogo />

          <Title level={3} className="auth-title">
            Create an Account
          </Title>

          <Form layout="vertical" className="auth-form">
            <Form.Item
              label="Name"
              validateStatus={errors.Name ? "error" : ""}
              help={errors.Name}
              className="form-item"
            >
              <Input
                name="Name"
                placeholder="Enter your name"
                value={formValues.Name}
                onChange={handleChange}
                className={`auth-input ${isDarkMode ? 'dark' : 'light'}`}
              />
            </Form.Item>

            <Form.Item
              label="Email Address"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email}
              className="form-item"
            >
              <Input
                name="email"
                placeholder="Enter your email"
                value={formValues.email}
                onChange={handleChange}
                className={`auth-input ${isDarkMode ? 'dark' : 'light'}`}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={errors.password ? "error" : ""}
              help={errors.password}
              className="form-item"
            >
              <Input.Password
                name="password"
                placeholder="Enter your password"
                value={formValues.password}
                onChange={handleChange}
                className={`auth-input ${isDarkMode ? 'dark' : 'light'}`}
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={errors.confirmPassword}
              className="form-item"
            >
              <Input.Password
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                className={`auth-input ${isDarkMode ? 'dark' : 'light'}`}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              onClick={handleSubmit}
              disabled={loading}
              className="auth-button"
            >
              {loading ? <Spin /> : "Sign Up"}
            </Button>
          </Form>

          <div className="auth-footer">
            <Text className="auth-text">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </Text>
          </div>

          <div className="auth-back">
            <Link to="/" className="back-link">
              ← Back to home
            </Link>
          </div>
        </Card>
        {/* New feature showcase section with a different image */}
        <div className="auth-feature-showcase">
          <div className="auth-feature-image">
            <img
              src={feature1}
              alt="AI Email Feature"
            />
          </div>
          <div className="auth-feature-caption">
            <strong>AI-Powered Communication</strong>
            Generate professional emails with our advanced AI assistant, helping you communicate effectively while saving time.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;