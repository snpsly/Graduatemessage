import React from "react";
import { Card } from "antd";
import styles from "./index.module.css";
import Loginform from "./loginform";
const Login = () => {
  return (
    <>
      <Card style={{ width: 300 }} className={styles.card}>
        客服
        <Loginform></Loginform>
      </Card>
    </>
  );
};
export default Login;
