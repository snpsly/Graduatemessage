import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginmessage } from "../../api/message";

const App = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    loginmessage(values).then((res) => {
      console.log(res.data);
      if (res.data === "成功") {
        navigate("/message/order");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
