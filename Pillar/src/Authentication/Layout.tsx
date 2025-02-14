import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { DashboardOutlined, FileOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../context/useContext";

const { Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth(); // Access the logout function from AuthContext
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/user",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/csv",
      icon: <FileOutlined />,
      label: "CSV Upload",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        style={{
          backgroundColor: collapsed ? "#f0f0f0" : "#ffffff",
          borderRight: "1px solid #f0f0f0",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          position: "fixed", 
          height: "100vh", 
          overflow: "hidden", 
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={(e) => navigate(e.key)}
          items={menuItems}
        />
        <Menu
          mode="inline"
          selectable={false}
          style={{
            position: "relative",
            top: "24.5rem", 
            fontSize: "1.5rem",
          }}
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: () => logout(),
              style: { color: "red", fontSize: "1.2rem", },
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? "80px" : "200px", transition: "all 0.3s ease" }}>
        <Content
          style={{
            margin: "16px",
            backgroundColor: "#f8f9fa",
            overflow: "auto", 
            height: "calc(100vh - 32px)", 
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;




