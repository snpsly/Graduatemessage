export function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes();

  var s = date.getSeconds();
  return Y + M + D + h + m;
}
export var changeTimes = function (time) {
  var temp = time.split(" ");
  var arr = temp[0].split("-");
  var brr = temp[1].split(":");
  if (brr.length == 3) {
    var timestamp = new Date(
      Date.UTC(arr[0], arr[1] - 1, arr[2], +brr[0] - 8, brr[1], brr[2])
    );
  } else if (brr.length == 2) {
    var timestamp = new Date(
      Date.UTC(arr[0], arr[1] - 1, arr[2], +brr[0] - 8, brr[1])
    );
  }
  var timestamp = timestamp.getTime() / 1000;
  return timestamp;
};
