import { host } from "./host.js";
// 全局数据
const app = getApp();

// wx.request封装
const wxRequest = (options) => {
  let {
    url = "",
    method = "GET",
    data = {},
    header = {},
    type,
    needTimestamp = false,
  } = options;
  console.log("是否需要时间戳", needTimestamp);
  method = method.toUpperCase();
  let openId = wx.getStorageSync("userInfo").openId;
  let ecoHeader = {
    openId: openId
  }

  // 设置cookie参数
  const setCookie = () => {
    // 登录态参数
    let uid = wx.getStorageSync("uid") || null;
    let skey = wx.getStorageSync("skey") || null;
    let popId = wx.getStorageSync("popId") || null;

    // 营销
    let params = "";

    let openId = wx.getStorageSync("openId") || null;
    let sessionKey = wx.getStorageSync("sessionKey") || null;
    
    if (openId && sessionKey) {
      params = `openId=${openId};sessionKey=${sessionKey};open_id=${openId};session_key=${sessionKey};`;
    }

    return params;
  };


  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        "Content-Type":
          type == "formData"
            ? "application/x-www-form-urlencoded; charset=UTF-8"
            : type == "json"
              ? "application/json"
              : "application/json; charset=UTF-8",
        Cookie: setCookie(),
        "x-app-type": "mini",
        "openId": wx.getStorageSync("userInfo").openId,
        ecoHeader,
        ...header,
        "X-Request-Tag": wx.getStorageSync("angsiEnvUrl")
          ? wx.getStorageSync("angsiEnvUrl")
          : "", //后端监听标识
      },
      success(request) {
        // 普遍有code的情况渲染
        console.log('123123hhhh');
        if (request.data.code === 0 || request.data.errno === 0) {
          resolve(request.data);
          return;
        }
        // 直接是一个数字
        if (typeof request.data === "number") {
          resolve(request.data);
          return;
        }
        // 登录过期
        if (request.data.errno === 1024) {
          console.log(1024);
          reject(request.data);
          return;
        }
        // 监听成功后的操作
        console.log(request);
        if (request.data.errorCode === 0) {
          //目前授权登录模块
          resolve(request.data);
        } else {
          console.log('123123hhhhelse');
          //如果没有获取成功返回值,把request.data传入到reject中
          reject(request.data);
        }
      },
      fail(error) {
        //返回失败也同样传入reject()方法
        reject(error.data);
      },
    });
  });
};

const wxGet = (options = {}) => {
  return wxRequest({
    ...options,
    method: "GET",
  });
};
const wxPost = (options) => {
  return wxRequest({
    ...options,
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded;",
    },
  });
};
const wxPut = (options) => {
  return wxRequest({
    ...options,
    method: "PUT",
  });
};
const wxDelete = (options) => {
  return wxRequest({
    ...options,
    method: "DELETE",
  });
};

module.exports = {
  wxRequest,
  wxGet,
  wxPost,
  wxPut,
  wxDelete,
};
