import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import "./index.css";
import { Outlet, useNavigate } from "react-router-dom";
import { HeaderMenu } from "./HeaderMenu";

const { Header, Sider, Content } = Layout;

const App = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const menuclick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/message/order");
        break;
      case "2":
        navigate("/message/lt");
        break;
      default:
    }
  };
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100%",
        fontSize: "20px",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={menuclick}
          style={{ fontSize: "15px", padding: "10px 0" }}
          items={[
            {
              key: "1",
              icon: <BankOutlined />,
              label: "分配订单",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "聊天",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: "0 20px", paddingRight: "40px" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <HeaderMenu></HeaderMenu>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            display: "block",
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
