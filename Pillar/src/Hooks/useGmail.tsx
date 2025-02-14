import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useAuth } from "../context/useContext";

export const useGmail = () => {
    const { token } = useAuth();
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false); 

    const connectGmail = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/email/generate",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    validateStatus: (status) => status < 500,
                }
            );

            if (response.status === 401 && response.data.redirect) {
                message.info("Redirecting to Gmail authorization...");
                window.location.href = response.data.redirect;
            } else {
                message.error("Unexpected response from server.");
            }
        } catch (error) {
            console.error("Error connecting Gmail:", error);
            message.error("Failed to connect Gmail.");
        }
    };

    const checkConnection = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get("http://localhost:3000/api/email/status", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsConnected(response.data.isConnected);
        } catch (error) {
            console.error("Error checking connection status:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        checkConnection();

        const params = new URLSearchParams(window.location.search);
        const authSuccess = params.get("authSuccess");
        const error = params.get("error");

        if (authSuccess === "true") {
            message.success("Authorization successful. You can now send emails.");
            setIsConnected(true);
        } else if (authSuccess === "false") {
            message.error(`Authorization failed: ${error}`);
        }
    }, [token]);

    return { isConnected, loading, connectGmail };
};
