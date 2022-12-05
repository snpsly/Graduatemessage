import styles from "./cleantable.module.css";
import { Space, Table, Tag } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BankOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input } from "antd";
import {
  selectorder,
  selectclean,
  pushclearorders,
  selectclean2,
  selectcleanorder,
} from "../../api/message";
import { timestampToTime, changeTimes } from "../../api/date";
const { Column, ColumnGroup } = Table;
const { Search } = Input;
const Order = () => {
  const [data, setdata] = useState();
  const [clean, setclean] = useState([]);
  const [cardflag, setcardflag] = useState(false);
  const [id, setid] = useState();
  const [de, setde] = useState(0);
  const [date, setdate] = useState();
  const [datepause, setdatepause] = useState();
  const [selectusername, setselectusername] = useState("");
  const pageonchange = (page, pageSize) => {
    selectorder(page).then((res) => {
      res.data.map((item) => {
        item.date = timestampToTime(item.date);
        item.date_pause = timestampToTime(item.date_pause);

        switch (item.order_state) {
          case 0:
            item.order_state = "未分配订单";
            break;
          case 1:
            item.order_state = "已分配";
            break;
          case 2:
            item.order_state = "保洁前往目的地";
            break;
          case 999:
            item.order_state = "用户取消订单";
            break;
          case 3:
            item.order_state = "保洁已完成订单";
            break;
          default:
        }
      });
      setdata(res.data);
    });
  };
  useEffect(() => {
    selectorder(1).then((res) => {
      res.data.map((item) => {
        item.date = timestampToTime(item.date);
        item.date_pause = timestampToTime(item.date_pause);

        switch (item.order_state) {
          case 0:
            item.order_state = "未分配订单";
            break;
          case 1:
            item.order_state = "已分配";
            break;
          case 2:
            item.order_state = "保洁前往目的地";
            break;
          case 999:
            item.order_state = "用户取消订单";
            break;
          case 3:
            item.order_state = "保洁已完成订单";
            break;
          default:
        }
      });

      setdata(res.data);
    });
  }, [cardflag, de]);

  const onSearch = (value) => {
    setselectusername(value);
    // selectfun(1, value).then((res) => {
    //   setdata(res.data);
    // });
  };
  const addbtn = () => {
    selectclean().then((res) => {
      res.data.map((item) => {
        selectcleanorder(item.id).then((res1) => {
          if (res1.data.length < 1) {
            item.w = "空闲";
          } else {
            res1.data.map((i) => {
              if (date > i.date_pause || datepause < i.date) {
                item.w = "空闲";
              } else {
                item.w = "繁忙";
              }
            });
          }
          setTimeout(() => {
            setclean(res.data);
          }, 0);
        });
      });
    });
    setcardflag(true);
  };
  return (
    <div className={styles.cit}>
      <Table
        dataSource={data}
        rowKey="id"
        pagination={{
          defaultCurrent: 1,
          total: 50,
          onChange: pageonchange,
          defaultPageSize: 6,
        }}
      >
        <Column title="订单名" dataIndex="shop_title" key="shop_title" />
        <Column title="订单开始" dataIndex="date" key="date" />
        <Column title="订单结束" dataIndex="date_pause" key="date_pause" />
        <Column title="用户名" dataIndex="user_name" key="user_name" />
        <Column title="地址" dataIndex="user_address" key="user_address" />
        <Column title="手机号" dataIndex="user_phone" key="user_phone" />
        <Column title="保洁员" dataIndex="clean_name" key="clean_name" />
        <Column title="订单状态" dataIndex="order_state" key="order_state" />
        <Column
          title="操作"
          render={(item) => {
            return item.order_state === "未分配订单" ? (
              <div className={styles.tablebut}>
                <Button
                  type="primary"
                  onClick={() => {
                    addbtn(item.id);
                    setid(item.id);

                    setdate(changeTimes(item.date));
                    setdatepause(changeTimes(item.date_pause));
                  }}
                >
                  分配
                </Button>
              </div>
            ) : item.order_state === "已分配" ? (
              <div className={styles.tablebut}>
                <Button
                  type="primary"
                  onClick={() => {
                    addbtn();
                    setid(item.id);
                    setdate(changeTimes(item.date));
                    setdatepause(changeTimes(item.date_pause));
                  }}
                >
                  重新分配
                </Button>
              </div>
            ) : (
              <div className={styles.tablebut}>不能修改</div>
            );
          }}
        />
      </Table>

      <div
        className={styles.zz}
        style={cardflag ? { display: "-webkit-box" } : { display: "none" }}
      >
        <Card
          className={styles.cardture}
          bodyStyle={{ backgroundColor: "#ffffff" }}
          style={{
            width: 300,
          }}
        >
          {clean.map((item) => {
            return (
              clean !== [] && (
                <div className={styles.cardclean} key={item.id}>
                  <UserOutlined />
                  {item.name}
                  {item.w}
                  <Button
                    type="primary"
                    onClick={() => {
                      pushclearorders({
                        id: id,
                        clean_id: item.id,
                        updateorder: 1,
                        clean_name: item.name,
                      }).then((res) => {
                        setcardflag(false);
                      });
                    }}
                  >
                    分配
                  </Button>
                </div>
              )
            );
          })}

          <Button
            type="primary"
            className={styles.rightbut}
            onClick={() => {
              setcardflag(false);
            }}
          >
            取消
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Order;
