import { useEffect, useState } from "react";
import { Table, Input, message, Button, Pagination } from "antd";
import { useCsvContext } from "../context/CsvContext";
import { useCsvUpload } from "../Hooks/useCsvUpload";
import LoadingProgress from "../Hooks/LoadingProgress";
import MassSendModal from "../Hooks/MassSendModal";
import { useDocumentTitle } from "../Hooks/useDocumentTitle";

interface EditingCell {
  id: string;
  column: string;
  value: string;
}

const SimpleEditableCsvTable = () => {
  useDocumentTitle("SecretPlace - Csv Table");

  const { data } = useCsvContext();
  const { fetchCsvRecords, updateCsvRecord, deleteCsvRecord, bulkDeleteCsvRecords } = useCsvUpload();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isMassSendModalVisible, setIsMassSendModalVisible] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchCsvRecords();
  }, []);

  const handleSendComplete = () => {
    setIsMassSendModalVisible(false);
  };

  const handleSave = async () => {
    if (editingCell) {
      try {
        await updateCsvRecord(editingCell.id, { [editingCell.column]: editingCell.value });
        setEditingCell(null);
      } catch (error) {
        message.error("Failed to update record");
      }
    }
  };

  const renderEditableCell = (record: any, columnKey: string, value: string) => {
    if (editingCell && editingCell.id === record.id && editingCell.column === columnKey) {
      return (
        <Input
          autoFocus
          value={editingCell.value}
          onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
          onBlur={handleSave}
          onPressEnter={handleSave}
        />
      );
    }
    return (
      <div onClick={() => setEditingCell({ id: record.id, column: columnKey, value })} style={{ cursor: "pointer" }}>
        {value}
      </div>
    );
  };

  const handleCheckboxChange = (recordId: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, recordId]);
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== recordId));
    }
  };

  const filteredData = data.filter((record: any) =>
    Object.values(record).some((val) => String(val).toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Apply pagination to filtered data
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSelectAll = () => {
    const allIds = filteredData.map((record: any) => record.id);
    setSelectedRows(allIds);
  };

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return;
    try {
      if (selectedRows.length === 1) {
        await deleteCsvRecord(selectedRows[0]);
      } else {
        await bulkDeleteCsvRecords(selectedRows);
      }
      setSelectedRows([]);
      await fetchCsvRecords();
    } catch (error) {
      message.error("Failed to delete selected rows");
    }
  };

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const dataColumns = [
    {
      title: "Full Name",
      dataIndex: "Full Name",
      key: "fullName",
      render: (value: string, record: any) => renderEditableCell(record, "Full Name", value),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
      render: (value: string, record: any) => renderEditableCell(record, "Email", value),
    },
    {
      title: "Work Experience",
      dataIndex: "Work Experience",
      key: "workExperience",
      render: (value: string, record: any) => renderEditableCell(record, "Work Experience", value),
    },
    {
      title: "Current Position",
      dataIndex: "Current Position",
      key: "currentPosition",
      render: (value: string, record: any) => renderEditableCell(record, "Current Position", value),
    },
    {
      title: "Work Status",
      dataIndex: "Work Status",
      key: "workStatus",
      render: (value: string, record: any) => renderEditableCell(record, "Work Status", value),
    },
    {
      title: "Connections",
      dataIndex: "Connections",
      key: "connections",
      render: (value: string, record: any) => renderEditableCell(record, "Connections", value),
    },
    {
      title: "Platforms",
      dataIndex: "Platforms",
      key: "platforms",
      render: (value: string, record: any) => renderEditableCell(record, "Platforms", value),
    },
  ];

  const selectionColumn = {
    title: "",
    key: "select",
    width: 50,
    render: (_: any, record: any) => {
      const isChecked = selectedRows.includes(record.id);
      return (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleCheckboxChange(record.id, e.target.checked)}
        />
      );
    },
  };

  const finalColumns = [selectionColumn, ...dataColumns];

  return (
    <div style={{ padding: 20 }}>
      <LoadingProgress />

      <div style={{ marginBottom: 16 }}>
        <h1>Mass Email Sending</h1>
        <p>
          Showing {filteredData.length} CSV record{filteredData.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Top control bar with flex layout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        {/* Left side: Search & action buttons */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            placeholder="Search CSV records"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); 
            }}
            style={{ width: 300, marginRight: 10 }}
          />
          {selectedRows.length === 0 && filteredData.length > 0 && (
            <Button onClick={handleSelectAll} style={{ marginRight: 10 }}>
              Select All
            </Button>
          )}
          {selectedRows.length > 0 && (
            <>
              <Button type="primary" danger onClick={handleDeleteSelected} style={{ marginRight: 8 }}>
                <i className="fas fa-trash" style={{ marginRight: 4 }}></i>
                Delete {selectedRows.length > 1 ? "Selected" : ""}
              </Button>
              <Button onClick={handleDeselectAll} style={{ marginRight: 10 }}>
                Deselect All
              </Button>
              <Button
                type="primary"
                onClick={() => setIsMassSendModalVisible(true)}
                disabled={selectedRows.length === 0}
              >
                Mass Send
              </Button>
            </>
          )}
        </div>
        {/* Right side: External Pagination */}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      {/* Table container with custom scrollbar class */}
      <div className="custom-scrollbar">
        <Table
          dataSource={paginatedData}
          columns={finalColumns}
          rowKey="id"
          pagination={false}
          scroll={{ x: "max-content" }}
        />
      </div>

      <MassSendModal
        visible={isMassSendModalVisible}
        onCancel={() => setIsMassSendModalVisible(false)}
        onSendComplete={handleSendComplete}
        selectedEmails={selectedRows
          .map((id) => {
            const record = data.find((d: any) => d.id === id);
            return record ? record.Email : null;
          })
          .filter((email) => email !== null)}
      />
    </div>
  );
};

export default SimpleEditableCsvTable;
