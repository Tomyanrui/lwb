// miniprogram/pages/my-collection/my-collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    activeTab: 0,
    tabList: {
      'LDKQ': { title: "立等可取", state: 'LDKQ', pageNo: 1, isLoaded: false, data: [] },
      'YY': { title: "预约订单", state: 'YY', pageNo: 1, isLoaded: false, data: [] },
      'DPJ': { title: "待评价", state: 'DPJ', pageNo: 1, isLoaded: false, data: [] },
      'all': { title: "全部", state: 'all', pageNo: 1, isLoaded: false, data: [] }
    },
    dataList: [
      '1',
      "2",
      "3",
      "4",
      // "5",
      // "6",
      // "7",
      // "8"
    ],
    mounted: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const titles = ['全部', '职位', '企业', '劳务', '代理']
    const tabs = titles.map(item => ({ title: item }))
    this.setData({ tabs })
    this.setData({
      mounted: true,
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