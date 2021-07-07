// pages/company/company.js
import {
  API_COMPANY_GET,
  API_COMPANY_GETJOBS,
  API_COMPANY_CSC
} from '../../apis/company.js'
import {
  wxRequest
} from "../../apis/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: {},
    dataList: [],
    dataList1: [],
    DEFAULT_IMAGE:'../../images/company.jpg',
    DEFAULT_JOB_IMAGE:'../../images/job.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.GetCompany(id)
    this.GetJobs(id)
    this.GetCSC(id)
  },

  GetCompany: function (id) {
    let that = this
    wxRequest({
      url: `${API_COMPANY_GET}?id=${id}`,
      method: "GET"
    }).then(response => {
      console.log("---company get---")
      console.log(response)
      that.setData({
        company: response.data
      })
    })
  },

  GetJobs: function (id) {
    let that = this
    wxRequest({
      url: `${API_COMPANY_GETJOBS}?companyId=${id}`,
      method: "GET"
    }).then(response => {
      console.log("---company job get---")
      console.log(response)
      that.setData({
        dataList: response.data
      })
    })
  },

  GetCSC: function (id) {
    let that = this
    wxRequest({
      url: `${API_COMPANY_CSC}?companyId=${id}`,
      method: "GET"
    }).then(response => {
      console.log("---company csc get---")
      console.log(response)
      that.setData({
        dataList1: response.data
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