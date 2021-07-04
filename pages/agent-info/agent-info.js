import { API_IMS_UPLOAD } from "../../apis/vip-info.js"
import { wxRequest } from "../../apis/index.js"

import { API_ADDRESS_GET, API_ADDRESS_GET_CITY, API_ADDRESS_GET_COUNTY, API_ADDRESS_GET_PROVINCE } from "../../apis/address-info.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      photo: 'https://oss.angsi.com/frontend-picture/1575883521729.png',
      nickName: '',
      gender: 0, // 0,保密 1,男士 2,女士
      birthday: '',
      mobile: '',
    },
    genderShow: false, // 性别弹窗
    datePickerShow: false, // 日期弹窗
    actions: [
      {
        name: '男士',
        openType: 'select'
      },
      {
        name: '女士',
        openType: 'select'
      },
      {
        name: '保密',
      },
    ],
    minDate: new Date(1900, 1, 1).getTime(),
    maxDate: new Date().getTime(),
    province_list: [],
    city_list: [],
    county_list: [],
    cityShow: false,
    selected_region: [0, 0, 0],
  },

  /**
   * 选择头像
   */
  onSelectPhoto: function () {
    let { userInfo } = this.data;
    wx.chooseImage({
      count: 1,
      success: params => {
        if (params.tempFiles[0].size > 5 * 1024 * 1024) {
          return wx.showToast({
            title: '请上传不超过5M的PNG、JPG图片',
            icon: 'none'
          })
        }
        console.log(params)
        console.log('开始上传图片');
        wx.showLoading()
        let formCollection = [];
        console.log('开始上传图片2');
        formCollection[0] = params.tempFilePaths && params.tempFilePaths[0];
        console.log('开始上传图片3');
        wx.uploadFile({
          name: 'file',
          url: API_IMS_UPLOAD,
          filePath: params.tempFilePaths && params.tempFilePaths[0],
          formData: formCollection,
          success: e => {
            wx.hideLoading()
            console.log('123444===')
            console.log(e);
            const data = JSON.parse(e.data)
            userInfo.header = data.data;
            this.setData({
              userInfo
            })
          },
          fail(e) {
            console.log("上传失败" + e);
            wx.hideLoading()
          }
        })
      }
    })
  },

  /**
   * 性别选择
   */
  onGenderSelect(e) {
    console.log(e.detail, 'onSelect');
    let name = e.detail.name;
    let { userInfo } = this.data;
    // userInfo.gender = name == '男士' ? 1 : name == '女士' ? 2 : 0;
    userInfo.gender = name

    this.setData({
      userInfo,
      genderShow: false
    })
  },

  /**
   * 省市区选择
   */
  onSelectAddress() {
    this.getAddressProvince();
    // return Promise.all([
    //   this.getAddressProvince(),
    //   this.getAddressCity(),
    //   this.getAddressCounty(),
    // ]);
  },

  /**
  * 获取市区数据
  */
  getAddressCounty(cityId) {
    console.log('县城' + cityId);
    wxRequest({
      url: API_ADDRESS_GET_COUNTY,
      data: { cityId: cityId },
      method: "GET"
    }).then(response => {
      console.log(response);
      console.log(this.county_list)
      this.setData({
        county_list: response.data
      })
    })
  },

  /**
   * 获取市区数据
   */
  getAddressCity(provinceId) {
    wxRequest({
      url: API_ADDRESS_GET_CITY,
      data: { provinceId: provinceId },
      method: "GET"
    }).then(response => {
      this.getAddressCounty(response.data[0].id);
      this.setData({
        city_list: response.data
      })
    })
  },

  /**
   * 获取省市区数据
   */
  getAddressProvince() {
    wxRequest({
      url: API_ADDRESS_GET_PROVINCE,
      method: "GET"
    }).then(response => {
      console.log(response);
      console.log(this.province_list)
      this.getAddressCity(response.data[0].id)
      this.setData({
        cityShow: true,
        province_list: response.data
      })
    })
  },

  /**
   * 关闭弹框
   */
  onClose() {
    this.setData({
      cityShow: false,
      genderShow: false,
    })
  },

  /**
   * 选择省市区绑定
   * @param {}} e 
   */
  bindChange(e) {
    console.log("path" + e)
    let { province_list, city_list, county_list, userInfo, selected_region } = this.data;
    var path = e.detail.value;
    console.log('path=' + path);
    if (path[0] != province_list[0]) {
      path[1] = 0;
      path[2] = 0;
    }
    var path = e.detail.value;
    this.getAddressCity(province_list[path[0]].id)
    // if (path[0] != selected_region[0]){
    //   path[1] = 0;
    //   path[2] = 0;
    //   await this.getAddressCity(province_list[path[0]].id)
    // }
    // if (path[1] != selected_region[1]) {
    //   path[2] = 0;
    //   await this.getAddressCounty(city_list[path[1].id])
    // }
    //选择省

    //选择市

    //选择区


    userInfo.address = province_list[path[0]].name + city_list[path[1]].name + county_list[path[2]].name
    this.setData({
      userInfo
    })
  },

  /**
   * 选择性别
   */
  onSelectGender() {
    this.setData({
      genderShow: true
    })
  },

  // 关闭性别选项弹窗
  onGenderCancel: function () {
    this.setData({
      genderShow: false
    })
  },

  /**
   * 保存用户信息
   */
  saveUserInfo: function () {
    wx.showToast({
      title: '保存成功',
    })
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
    const { userInfo } = this.data;
    let nickName = wx.getStorageSync("nickName");
    if (nickName) {
      userInfo.nickName = nickName;
      this.setData({
        userInfo
      }, () => {
        wx.removeStorageSync("nickName");
      });
    }
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