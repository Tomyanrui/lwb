// miniprogram/pages/my-release/my-release.js
import {
  wxRequest
} from "../../apis/index.js";
import {
  API_SC_GETCCOMPANY
} from '../../apis/service-company.js'
import {
  API_JOB_LIST
} from "../../apis/job.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    activeTab: 0,
    dataList: [],
    mounted: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const titles = ['全部职位', '关联企业']
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs
    })
    this.setData({
      mounted: true,
    })

    this.GetJobs()
    this.GetCCompany()
  },

  GetCCompany: function () {
    let that = this
    wxRequest({
      url: API_SC_GETCCOMPANY,
      method: "GET"
    }).then(response => {
      console.log("---sc c company get---")
      console.log(response)
      that.setData({
        dataList1: response.data
      })
    })
  },

  GetJobs: function () {
    let that = this
    wxRequest({
      url: `${API_JOB_LIST}`,
      method: "GET"
    }).then(response => {
      console.log("---jobs get---")
      console.log(response)
      that.setData({
        dataList: response.data
      })
    }, errorRes => {
      wx.showToast({
        title: errorRes.errorMsg,
        icon: 'error'
      })
    })
  },

  onTabCLick: function (e) {
    console.log(e)
    this.setData({
      activeTab: e.detail.index
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