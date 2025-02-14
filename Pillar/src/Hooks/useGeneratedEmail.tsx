import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../context/useContext";

export const useGenerateEmail = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Function to generate email subject & body via OpenAI
  const generateEmail = async (prompt: string): Promise<{ subject: string; emailBody: string }> => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/open/find-complexity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.success) {
        return { subject: data.subject, emailBody: data.emailBody };
      } else {
        message.error("OpenAI API error: " + data.error);
        return { subject: "", emailBody: "" };
      }
    } catch (error: any) {
      message.error("Error generating email: " + error.message);
      return { subject: "", emailBody: "" };
    } finally {
      setLoading(false);
    }
  };

  // Function to send emails to multiple recipients.
  // The progress bar will now be driven solely by the isSending flag.
  const sendEmails = async (subject: string, content: string, emails: string[]): Promise<boolean> => {
    setIsSending(true);
    try {
      for (let i = 0; i < emails.length; i++) {
        const response = await fetch("http://localhost:3000/api/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ subject, content, toEmail: emails[i] }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to send email");
        }
        // Optionally, if you need to simulate a delay for a more visible progress effect during testing:
        // await new Promise(resolve => setTimeout(resolve, 200));
      }
      return true;
    } catch (error: any) {
      throw error;
    } finally {
      setIsSending(false);
    }
  };

  return { generateEmail, sendEmails, loading, isSending };
};

