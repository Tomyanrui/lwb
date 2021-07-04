Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
  },

  // 修改昵称
  confirmModify() {
    const { nickName } = this.data;
    if(nickName===''){
      wx.showToast({ title: "请填写正确的昵称", icon: "none" });
      return false;
    }
    wx.setStorageSync("nickName", nickName);
    wx.navigateBack();
  },

  onInput(e) {
    let value = e.detail.value;
    value = value.replace(/[^\w\u4E00-\u9FA5]/g, '')
    console.log('old-------',value)
    if(!value) return;
    const { title } = e.detail;
    if (title === '昵称') {
      this.setData({
        nickName: value
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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