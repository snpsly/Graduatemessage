import request from "../utils/request";

export const loginmessage = ({ username, password }) => {
  return request({
    url: "message/loginmessage",
    method: "post",
    data: {
      username,
      password,
    },
  });
};
export const selectorder = ({}) => {
  return request({
    url: "message/selectorder",
    method: "post",
  });
};
export const selectclean = () => {
  return request({
    url: "message/selectclean",
    method: "post",
  });
};
export function pushclearorders({ id, clean_id, updateorder, clean_name }) {
  console.log(clean_id);
  return request({
    url: "order/pushclearorders",
    method: "post",
    data: { id, clean_id, updateorder, clean_name },
  });
}
export const selectclean2 = (item) => {
  console.log(item);
  return request({
    url: "message/selectclean2",
    method: "post",
    data: { item },
  });
};
export const selectcleanorder = (id) => {
  return request({
    url: "message/selectcleanorder",
    method: "post",
    data: { id },
  });
};
