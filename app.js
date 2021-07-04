//app.js
import {
  host
} from "./apis/host.js";
import {
  wxRequest
} from "./apis/index.js";
import {
  API_USER_LOGIN,
  API_USER_INFO,
  API_USER_GET_PHONE
} from './apis/vip-info.js'



App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.setStorageSync("wxLoginCode", res.code);
        let data = {
          "code": res.code
        }
        wxRequest({
          url: API_USER_LOGIN,
          data,
          method: "POST"
        }).then(response => {
          console.log('---login---');
          console.log(response);
          wx.setStorageSync('userInfo', {
            'openId': response.data.openId,
            'vipId': response.data.vipId
          })
          if (this.loginReadyCallback) {
            this.loginReadyCallback()
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  /**
   * 获取用户手机号码
   */
  getPhoneNumber() {
    let data = {
      sessionKey: wx.getStorageSync('sessionKey'),
      session_key: wx.getStorageSync('sessionKey')
    };

    wxRequest({
      data: data,
      url: API_USER_GET_PHONE,
      method: "POST"
    }).then(response => {
      console.log('succes123222getPhone');
      console.log(response);
    })
  },

  globalData: {
    userInfo: null
  }
})