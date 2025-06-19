import React, { useState } from "react";
import { Modal, Button, Input, Form, Spin, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useGenerateEmail } from "../Hooks/useGeneratedEmail";
import SendingProgressBar from "./LoadingForEmail"; 
import { useDocumentTitle } from "./useDocumentTitle";

const { TextArea } = Input;

interface MassSendModalProps {
  visible: boolean;
  onCancel: () => void;
  onSendComplete: () => void;
  selectedEmails: string[];
}

const MassSendModal: React.FC<MassSendModalProps> = ({
  visible,
  onCancel,
  onSendComplete,
  selectedEmails,
}) => {
  useDocumentTitle("SecretPlace - Mass Email Send");

  const [form] = Form.useForm();
  const [loadingOpenAI, setLoadingOpenAI] = useState(false);
  const { generateEmail, sendEmails, isSending } = useGenerateEmail();

  const handleOpenAISend = async () => {
    try {
      const values = await form.validateFields(["prompt"]);
      const prompt = values.prompt;
      form.setFieldsValue({ subject: "Generating subject...", emailBody: "Loading, reasoning..." });
      setLoadingOpenAI(true);
      const result = await generateEmail(prompt);
      if (result.subject && result.emailBody) {
        form.setFieldsValue({ subject: result.subject, emailBody: result.emailBody });
      } else {
        form.setFieldsValue({ subject: "", emailBody: "" });
      }
    } catch (error: any) {
      message.error("Error generating email: " + error.message);
      form.setFieldsValue({ subject: "", emailBody: "" });
    } finally {
      setLoadingOpenAI(false);
    }
  };

  const handleEmailSend = async () => {
    try {
      const values = await form.validateFields(["subject", "emailBody"]);
      const subject = values.subject;
      const emailBody = values.emailBody;
      await sendEmails(subject, emailBody, selectedEmails);
      message.success("Emails sent successfully!");
      form.resetFields();
      onSendComplete();
    } catch (error: any) {
      message.error("Error sending emails: " + error.message);
    }
  };

  return (
    <Modal
      title={
        <div>
          <SendingProgressBar isSending={isSending} />
          <h2>Expand your network</h2>
          <p>Effortlessly connect with your next potential partner</p>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Prompt"
          name="prompt"
          rules={[{ required: true, message: "Please input the prompt!" }]}
        >
          <Input
            placeholder="Enter your prompt here"
            suffix={
              <Button type="text" onClick={handleOpenAISend} icon={loadingOpenAI ? <Spin /> : <SendOutlined />} />
            }
          />
        </Form.Item>
        <Form.Item
          label="Email Subject"
          name="subject"
          rules={[{ required: true, message: "Please input the subject!" }]}
        >
          <Input placeholder="Enter email subject" />
        </Form.Item>
        <Form.Item
          label="Email Body"
          name="emailBody"
          rules={[{ required: true, message: "Please input the email body!" }]}
        >
          <TextArea rows={6} placeholder="OpenAI response will appear here" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleEmailSend} block disabled={isSending}>
            Send Email
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MassSendModal;

