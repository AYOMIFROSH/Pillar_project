import { Button, Card, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";

const { Title, Text } = Typography;

const CheckEmailPage = () => {
  useDocumentTitle("SecretPlace - Passowrd Reset");

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
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
          textAlign: "center",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MailOutlined style={{ fontSize: 48, color: "#1890ff", marginBottom: 16 }} />
        <Title level={3}>Check Your Email</Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
          We have sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
        </Text>
        <Button type="primary" size="large" block onClick={handleLoginRedirect}>
          Back to Login
        </Button>
      </Card>
    </div>
  );
};

export default CheckEmailPage;

