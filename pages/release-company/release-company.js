// pages/release-company/release-company.js

import {
  API_COMPANY_SAVE
} from '../../apis/company.js'

import {
  wxRequest
} from "../../apis/index.js";

import {
  API_ADDRESS_PROVINCE,
  API_ADDRESS_CITY,
  API_ADDRESS_COUNTY
} from '../../apis/address.js'

import {
  API_IMS_UPLOAD
} from '../../apis/vip-info.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    company: {
      id: 0,
      name: "",
      logo: "",
      province: 0,
      city: 0,
      county: 0,
      provinceStr: "",
      cityStr: "",
      countyStr: "",
      address: "",
      personScale: "",
      remark: ""
    },
    showModal: false,
    modifyWhich: "",
    showModalAddress: false,
    multiArray: [],
    multiIndex: [0, 0, 0],
    provinceArray: [],
    cityArray: [],
    countyArray: []
  },

  bindMultiPickerChange: function (e) {
    console.log(e)
    this.setData({
      multiIndex: e.detail.value
    })
    var company = this.data.company
    company.province = this.data.provinceArray[e.detail.value[0]].id
    company.city = this.data.cityArray[e.detail.value[1]].id
    company.county = this.data.countyArray[e.detail.value[2]].id
    this.setData({
      serviceCompany: company
    })
  },

  bindMultiPickerColumnChange: function (e) {
    let that = this
    console.log(e)
    if (e.detail.column === 0) {
      this.provinceChange(this.data.provinceArray[e.detail.value].id)
      this.setData({
        multiIndex: [e.detail.value, 0, 0]
      })
    } else if (e.detail.column === 1) {
      this.cityChange(this.data.cityArray[e.detail.value].id)
      this.setData({
        multiIndex: [that.data.multiIndex[0], e.detail.value, 0]
      })
    } else if (e.detail.column === 2) {
      this.setData({
        multiIndex: [that.data.multiIndex[0], that.data.multiIndex[1], e.detail.value]
      })
    }
  },

  cityChange: function (cityId) {
    let that = this
    //获取区/县
    wxRequest({
      url: `${API_ADDRESS_COUNTY}?cityId=${cityId}`,
      method: "GET"
    }).then(response_county => {
      console.log("---address county get---")
      console.log(response_county)
      that.setData({
        countyArray: response_county.data
      })
      that.addressPickerSetData()
    })
  },

  provinceChange: function (provinceId) {
    let that = this
    wxRequest({
      url: `${API_ADDRESS_CITY}?provinceId=${provinceId}`,
      method: "GET"
    }).then(response_city => {
      console.log("---address city get---")
      console.log(response_city)
      that.setData({
        cityArray: response_city.data
      })
      //获取区/县
      wxRequest({
        url: `${API_ADDRESS_COUNTY}?cityId=${response_city.data[0].id}`,
        method: "GET"
      }).then(response_county => {
        console.log("---address county get---")
        console.log(response_county)
        that.setData({
          countyArray: response_county.data
        })
        that.addressPickerSetData()
      })
    })
  },

  modifyName: function () {
    this.setData({
      showModal: true,
      modifyWhich: 'name'
    })
  },

  modifyPeopleScale: function () {
    this.setData({
      showModal: true,
      modifyWhich: 'peopleScale'
    })
  },

  modifyAddress: function () {
    this.setData({
      showModalAddress: true,
      modifyWhich: 'address'
    })
  },

  back: function () {
    this.setData({
      showModal: false
    })
  },

  /**
   * 获取input输入值
   */
  wish_put: function (e) {
    let company = this.data.company
    if (this.data.modifyWhich == 'name') {
      company.name = e.detail.value
      this.setData({
        company: company
      })
    } else if (this.data.modifyWhich == 'peopleScale') {
      company.personScale = e.detail.value
      this.setData({
        company: company
      })
    } else if (this.data.modifyWhich == 'address') {
      company.address = e.detail.value
      this.setData({
        company: company
      })
    }
  },

  /**
   * 点击确定按钮获取input值并且关闭弹窗
   */
  ok: function () {
    let that = this
    this.setData({
      showModal: false
    })
    this.setData({
      showModalAddress: false
    })
    if (this.data.modifyWhich == 'address') {

    }
  },

  uplaodFile(files) {
    let that = this;
    console.log('upload files', files)
    wx.uploadFile({
      filePath: files.tempFilePaths[0],
      name: 'name',
      url: API_IMS_UPLOAD,
      success: function (res) {
        console.log(res)
        let company = that.data.company
        company.logo = JSON.parse(res.data).data[0]
        that.setData({
          company: company
        })
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '上传图片失败',
          icon: 'error',
          duration: 2000
        })
      }
    })
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      resolve({
        urls: files.tempFilePaths
      })
      // setTimeout(() => {
      //   reject('some error')
      // }, 1000)
    })
  },

  save: function () {
    let reqData = this.data.company
    wxRequest({
      url: `${API_COMPANY_SAVE}`,
      data: reqData,
      method: "POST"
    }).then(response => {
      console.log("---company save---")
      console.log(response)
      wx.showToast({
        title: '保存成功',
      })
    }, errorRes => {
      wx.showToast({
        title: errorRes.errorMsg,
        icon: 'error'
      })
    })
  },

  /**
   * 地址选择器选择改变初始化
   */
  addressPickerSetData: function () {
    let provinceList = []
    for (var i = 0; i < this.data.provinceArray.length; i++) {
      provinceList.push(this.data.provinceArray[i].name)
    }
    let cityList = []
    for (var i = 0; i < this.data.cityArray.length; i++) {
      cityList.push(this.data.cityArray[i].name)
    }
    let countyList = []
    for (var i = 0; i < this.data.countyArray.length; i++) {
      countyList.push(this.data.countyArray[i].name)
    }
    this.setData({
      multiArray: [provinceList, cityList, countyList]
    })
  },

  companyRemark: function (e) {
    let company = this.data.company
    company.remark = e.detail.value
    this.setData({
      company: company
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      uplaodFile: this.uplaodFile.bind(this)
    })

    //获取省
    let that = this
    wxRequest({
      url: API_ADDRESS_PROVINCE,
      method: "GET"
    }).then(response => {
      console.log("---address province get---")
      console.log(response)
      that.setData({
        provinceArray: response.data
      })
      that.provinceChange(response.data[0].id)

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