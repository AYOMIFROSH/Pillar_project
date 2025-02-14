import { useState } from "react";
import { Card, Button, message, Typography } from "antd";

const { Text, Title } = Typography;

const VerificationPage = () => {
  const [loading, setLoading] = useState(false);

  const resendVerification = async () => {
    setLoading(true);
    try {
      const email = sessionStorage.getItem("user_email");
      if (!email) {
        message.error("User email is missing. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:3000/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        message.success("Verification email resent successfully!");
      } else {
        const errorData = await res.json();
        message.error(errorData.message || "Failed to resend verification email.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
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
          borderRadius: 8,
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ marginBottom: 16 }}>
          Verify Your Account
        </Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
          Please check your email to verify your account before proceeding. If
          you didn’t receive the email, you can resend it.
        </Text>
        <Button
          type="primary"
          block
          size="large"
          onClick={resendVerification}
          loading={loading}
        >
          Resend Verification Email
        </Button>
      </Card>
    </div>
  );
};

export default VerificationPage;


