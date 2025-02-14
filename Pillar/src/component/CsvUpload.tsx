import React, { useState } from "react";

const UploadCsv = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check if the file is a CSV
      if (file.type !== "text/csv") {
        setError("Please upload a valid CSV file.");
        return;
      }

      setError(null);
      onUpload(file);
    }
  };

  return (
    <div className="container">
      <div className="upload-container">
        <span className="upload-title">
          Effortlessly extract public data to find your ideal audience
        </span>
        <div className="upload-body">
          <div>
            <span className="upload-cta">
              <i className="fas fa-check icon"></i> Upload Your CSV File
            </span>
            <p className="upload-snippet">
              <a href="">Click here</a> to download
            </p>
          </div>
          <div>
            <span className="upload-cta">
              <i className="fas fa-check icon"></i> Get immediate visualization
            </span>
            <p className="upload-snippet">
              Use any unzip app to extract the file
            </p>
          </div>
          <div>
            <span className="upload-cta">
              <i className="fas fa-check icon"></i> Cold email everyone in seconds
            </span>
            <p className="upload-snippet">
              please provide your name and email
            </p>
          </div>
          {/* Display the error message if there is any */}
          {error && <div style={{ color: "red" }}>{error}</div>}
          <input
            type="file"
            id="csv-upload-input"
            style={{ display: "none" }}
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadCsv;



