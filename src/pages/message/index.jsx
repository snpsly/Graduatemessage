import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, Input } from "antd";
import { useEffect } from "react";
import { useRef } from "react";
const Message = () => {
  const [usermessagelist, setusermessagelist] = useState([]);
  const [usermessage, setusermessage] = useState("");
  const websocket = new WebSocket("ws://localhost:8080/socket");
  const sendMsg = (usermessage) => {
    websocket && websocket.send(usermessage);
  };
  websocket.onmessage = function (event) {
    setusermessagelist([...usermessagelist, JSON.parse(event.data)]);
  };
  const lt = useRef(null);
  return (
    <div className={styles.layout}>
      <div className={styles.text} ref={lt}>
        {usermessagelist.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.pop}
              style={
                item.name === "user"
                  ? { alignItems: "flex-start" }
                  : { alignItems: "flex-end" }
              }
            >
              {item.name === "user" ? (
                <span
                  style={{
                    padding: "5px",
                  }}
                >
                  {item.username}
                </span>
              ) : (
                <span
                  style={{
                    padding: "5px",
                  }}
                >
                  我
                </span>
              )}
              <span
                style={{
                  backgroundColor: "antiquewhite",
                  padding: "5px",
                }}
              >
                {item.message}
              </span>
            </div>
          );
        })}
      </div>
      <Input.Group compact>
        <Input
          style={{ width: "calc(100% - 200px)" }}
          value={usermessage}
          onChange={(e) => {
            setusermessage(e.target.value);
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            sendMsg(JSON.stringify({ name: "kf", message: usermessage }));
            setusermessage("");
          }}
        >
          发送
        </Button>
      </Input.Group>
    </div>
  );
};

export default React.memo(Message);
