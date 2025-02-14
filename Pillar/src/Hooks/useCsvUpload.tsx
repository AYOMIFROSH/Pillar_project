import { useState, useCallback } from "react";
import { message, notification } from "antd";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import { useCsvContext } from "../context/CsvContext";
import { useAuth } from "../context/useContext";

// Define the headers that your CSV files are expected to have.
const keyHeaders = [
  "Full Name",
  "Email",
  "Work Experience",
  "Current Position",
  "Work Status",
  "Connections",
  "Platforms",
];

/**
 * This hook provides functions to upload a CSV file,
 * as well as fetch, update, and delete CSV records via your API routes.
 */
export const useCsvUpload = () => {
  const { setData, setLoading, setError } = useCsvContext();
  const [internalLoading, setInternalLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { token } = useAuth();

  const createCsv = useCallback(
  async (name: string, newEntries: any[]) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/entries/csv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, data: newEntries }),
      });

      if (!response.ok) throw new Error("Failed to create CSV record");

      // Append new data to existing table data
      setData((prevData) => [...prevData, ...newEntries]);

      notification.success({
        message: "Success",
        description: "CSV entries added successfully!",
        duration: 3,
      });
    } catch (error) {
      console.error("Error creating CSV record:", error);
      setError("Error creating CSV record");
      message.error("Error creating CSV record");
    } finally {
      setLoading(false);
    }
  },
  [token, setData, setLoading, setError]
);

  /**
   * Upload a CSV file:
   * - Read the file using FileReader (to track progress).
   * - Parse the file using Papa Parse.
   * - Create a new CSV record on the server.
   */
  const uploadCsvFile = (file: File) => {
    setLoading(true);
    setInternalLoading(true);
    setError(null);
    setUploadProgress(0);

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percent);
      }
    };

    reader.onload = (e) => {
      const csvText = e.target?.result;
      if (!csvText || typeof csvText !== "string") {
        setError("Failed to read file");
        message.error("Failed to read file");
        setLoading(false);
        setInternalLoading(false);
        return;
      }
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: async (result) => {
          // Map the parsed rows to your structure.
          const parsedData = result.data.map((row: any) => {
            const structuredRow: any = {};
            keyHeaders.forEach((header) => {
              structuredRow[header.trim()] = row[header] || "";
            });
            // Generate an id for client-side use.
            structuredRow.id = uuidv4();
            return structuredRow;
          });

          // Use the file name as the record name and send the data to the API.
          await createCsv(file.name, parsedData);
          setLoading(false);
          setInternalLoading(false);
          setUploadProgress(100);
        },
        error: (error: any) => {
          console.error("Error parsing CSV:", error);
          setError("Failed to parse CSV file");
          message.error("Failed to parse CSV file");
          setLoading(false);
          setInternalLoading(false);
        },
      });
    };

    reader.onerror = () => {
      setError("Failed to read file");
      message.error("Failed to read file");
      setLoading(false);
      setInternalLoading(false);
    };

    reader.readAsText(file);
  };

  /**
   * Fetch all CSV records.
   */
  const fetchCsvRecords = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/entries/csv", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch CSV records");

      const records = await response.json();
      // Flatten all entries from all CSV records.
      const allEntries = records.flatMap((record: any) => record.data);
      setData(allEntries);
    } catch (error) {
      console.error("Error fetching CSV records:", error);
      setError("Error fetching CSV records");
      message.error("Error fetching CSV records");
    } finally {
      setLoading(false);
    }
  }, [token, setData, setLoading, setError]);

  /**
   * Update an existing CSV record.
   */
  const updateCsvRecord = useCallback(
    async (id: string, updateData: any) => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/entries/csv/row/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
          }
        );
        if (!response.ok) throw new Error("Failed to update CSV record");
        await response.json();
        // Re-fetch records to update the state.
        await fetchCsvRecords();
        notification.success({
          message: "Success",
          description: "CSV record updated successfully!",
          duration: 3,
        });
      } catch (error) {
        console.error("Error updating CSV record:", error);
        setError("Error updating CSV record");
        message.error("Error updating CSV record");
      } finally {
        setLoading(false);
      }
    },
    [token, fetchCsvRecords, setLoading, setError]
  );

  /**
   * Delete a CSV record.
   */
  const deleteCsvRecord = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/entries/csv/deleterow/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to delete entry");

        setData((prev) => prev.filter((entry) => entry.id !== id));
        notification.success({
          message: "Success",
          description: "Entry deleted successfully!",
          duration: 3,
        });
      } catch (error) {
        setError("Error deleting CSV record");
        message.error("Error deleting CSV record");
      } finally {
        setLoading(false);
      }
    },
    [token, setData, setLoading, setError]
  );

  /**
   * Bulk delete CSV records.
   * Accepts an array of record IDs and calls the API endpoint for bulk deletion.
   */
  const bulkDeleteCsvRecords = useCallback(
    async (ids: string[]) => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/entries/csv/deletebulkrows", 
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ids }),
          }
        );
        if (!response.ok)
          throw new Error("Failed to bulk delete CSV rows");
        await response.json();
        // Update local state by filtering out the deleted rows.
        setData((prev) => prev.filter((entry) => !ids.includes(entry.id)));
        notification.success({
          message: "Success",
          description: "CSV rows deleted successfully!",
          duration: 3,
        });
      } catch (error) {
        console.error("Error bulk deleting CSV rows:", error);
        setError("Error bulk deleting CSV rows");
        message.error("Error bulk deleting CSV rows");
      } finally {
        setLoading(false);
      }
    },
    [token, setLoading, setError, setData]
  );
  

  return {
    internalLoading,
    uploadProgress,
    uploadCsvFile,
    fetchCsvRecords,
    updateCsvRecord,
    deleteCsvRecord,
    bulkDeleteCsvRecords,
    setData,
  };
};

