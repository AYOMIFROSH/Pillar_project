// UserPage.tsx
import { useState } from "react";
import { Button, Modal, Progress } from "antd";
import Gmail from "../assets/Gmail-logo.png";
import UploadCsv from "../component/CsvUpload";
import { useGmail } from "../Hooks/useGmail";
import { useCsvUpload } from "../Hooks/useCsvUpload";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useContext";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";

const UserPage = () => {
    useDocumentTitle("SecretPlace - Dashboard");
    
    const navigate = useNavigate();
    const { userData } = useAuth();
    const { isConnected, loading, connectGmail } = useGmail();
    const { uploadCsvFile, internalLoading, uploadProgress } = useCsvUpload(); 

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const handleUploadButton = (file: File) => {
        uploadCsvFile(file);
        // Optionally, wait for upload to finish before navigating.
        navigate("/csv");
    };

    const roles = [
        "Sales marketer",
        "Web developer",
        "Product designer",
        "Marketing manager",
        "Financial analyst",
    ];

    return (
        <div className="container">
            <span>
              Welcome! <small className="username">{userData.name}</small>
            </span>
            <div className="cold-title-wrapper">
                <h1 className="cold-title">Streamline your connection and cold outreach</h1>
                <p className="title-cta">Connect an account to get started</p>
            </div>

            <div className="cta-container">
                <div className="wrapper">
                    <div className="cta-wrapper">
                        <div className="cta">
                            <img src={Gmail} alt="Gmail Logo" className="cta-image" />Gmail
                        </div>
                        <Button
                            className="cta-button"
                            onClick={connectGmail}
                            disabled={isConnected || loading}
                        >
                            {loading ? " Checking..." : isConnected ? "Connected" : "Connect"}
                        </Button>
                    </div>
                    <div className="cta-alt-wrapper">
                        <div className="cta-alt"></div>
                        <span>or</span>
                        <div className="cta-alt"></div>
                    </div>
                </div>
                <div className="cta-display">
                    {roles.map((role, index) => (
                        <span key={index} className="cta-broker">
                            {role}
                        </span>
                    ))}
                </div>
            </div>

            <div className="upload-section">
                <Button className="cta-button" onClick={showModal}>
                    Upload Csv
                </Button>
            </div>

            <Modal
                title="Upload Your CSV File"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={
                    <Button
                        className="cta-button"
                        onClick={() => document.getElementById("csv-upload-input")?.click()}
                    >
                        Upload
                    </Button>
                }
                width={500}
            >
                <UploadCsv onUpload={handleUploadButton} />
                {internalLoading && (
                    <Progress percent={uploadProgress} status="active" style={{ marginTop: 10 }} />
                )}
            </Modal>
        </div>
    );
};

export default UserPage;
