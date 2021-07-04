import {
  API_SC_GET,
  API_SC_RELEASEJOBS,
  API_SC_GETCCOMPANY
} from '../../apis/service-company.js'
import {
  wxRequest
} from "../../apis/index.js";
// miniprogram/pages/my-company/my-company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowEdit: false,
    dataList: [],
    dataList1: [],
    mounted: false,
    serviceCompany: {
      logo: "",
      name: "",
      businessLicense: "",
      peopleNumber: "",
      province: 0,
      city: 0,
      address: "",
      county: 0,
      remark: "",
      province: 0,
      city: 0,
      county: 0
    },
  },

  //编辑 
  edit: function () {
    wx.navigateTo({
      url: '../my-company-edit/my-company-edit',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    if (options.id == wx.getStorageSync('userInfo').vipId) {
      this.setData({
        isShowEdit: true
      })
    }
    this.GetServiceCompanyDetail(options.id)
    this.GetReleaseJobs(options.id)
    this.GetCCompany(options.id)
  },

  GetCCompany: function (id) {
    let that = this
    wxRequest({
      url: `${API_SC_GETCCOMPANY}?vipId=${id}`,
      method: "GET"
    }).then(response => {
      console.log("---sc c company get---")
      console.log(response)
      that.setData({
        dataList1: response.data
      })
    })
  },

  GetServiceCompanyDetail: function (id) {
    let that = this
    wxRequest({
      url: `${API_SC_GET}?vipId=${id}`,
      method: "GET"
    }).then(response => {
      console.log("---sc get---")
      console.log(response)
      if (response.data) {
        that.setData({
          serviceCompany: response.data
        })
      } else {
        wx.navigateTo({
          url: '/pages/my-company-edit/my-company-edit',
        })
      }
    })
  },

  GetReleaseJobs: function (id) {
    let that = this
    wxRequest({
      url: `${API_SC_RELEASEJOBS}?vipId=${id}`,
      method: "GET"
    }).then(response => {
      console.log("---sc release jobs get---")
      console.log(response)
      that.setData({
        dataList: response.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})