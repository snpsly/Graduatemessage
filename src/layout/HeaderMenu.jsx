import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const HeaderMenu = () => {
  const navigate = useNavigate();
  const menu = (
    <Menu
      style={{ textAlign: "center" }}
      items={[
        {
          key: "1",
          label: (
            <div
              onClick={() => {
                navigate("/login");
              }}
            >
              登出
            </div>
          ),
        },
      ]}
    />
  );
  return (
    <Dropdown
      overlay={menu}
      placement="bottom"
      overlayStyle={{ width: "70px" }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size="large" icon={<UserOutlined />} />
        </Space>
      </a>
    </Dropdown>
  );
};
