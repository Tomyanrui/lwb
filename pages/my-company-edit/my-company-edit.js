import {
  API_ADDRESS_PROVINCE,
  API_ADDRESS_CITY,
  API_ADDRESS_COUNTY
} from '../../apis/address.js'
import {
  API_SC_SAVE,
  API_SC_GET
} from '../../apis/service-company.js'
import {
  API_IMS_UPLOAD
} from '../../apis/vip-info.js'
import {
  wxRequest
} from "../../apis/index.js";
// miniprogram/pages/my-company-edit/my-company-edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    showModal: false,
    showModalAddress: false,
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
    modifyWhich: '',
    multiArray: [],
    multiIndex: [0, 0, 0],
    provinceArray: [],
    cityArray: [],
    countyArray: [],
    addressRemark: ''
  },

  bindMultiPickerChange: function (e) {
    console.log(e)
    this.setData({
      multiIndex: e.detail.value
    })
    var company = this.data.serviceCompany
    company.province = this.data.provinceArray[e.detail.value[0]].id
    company.city = this.data.cityArray[e.detail.value[1]].id
    company.county = this.data.countyArray[e.detail.value[2]].id
    this.setData({
      serviceCompany: company
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log(e)
    if (e.detail.column === 0) {
      this.provinceChange(this.data.provinceArray[e.detail.value].id)
      this.setData({
        multiIndex: [e.detail.value, 0, 0]
      })
    } else if (e.detail.column === 1) {
      this.cityChange(this.data.cityArray[e.detail.value].id)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
    let that = this
    console.log('缓存信息')
    console.log(wx.getStorageSync('userInfo'))
    wxRequest({
      url: API_SC_GET,
      method: "GET"
    }).then(response => {
      console.log("---sc get---")
      console.log(response)
      that.setData({
        serviceCompany: response.data,
        addressRemark:`${response.data.provinceName} ${response.data.cityName} ${response.data.countyName}`
      })
    })

    //获取省
    wxRequest({
      url: API_ADDRESS_PROVINCE,
      method: "GET"
    }).then(response => {
      console.log("---address province get---")
      console.log(response)
      that.setData({
        provinceArray: response.data
      })
      //获取市
      wxRequest({
        url: `${API_ADDRESS_CITY}?provinceId=${response.data[0].id}`,
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
          console.log('------------------cnt------------------')
          console.log(response.data.length)
          let provinceList = []
          for (var i = 0; i < response.data.length; i++) {
            provinceList.push(response.data[i].name)
          }
          let cityList = []
          for (var i = 0; i < response_city.data.length; i++) {
            cityList.push(response_city.data[i].name)
          }
          let countyList = []
          for (var i = 0; i < response_county.data.length; i++) {
            countyList.push(response_county.data[i].name)
          }
          that.setData({
            multiArray: [provinceList, cityList, countyList]
          })

        })
      })
    })
  },

  modifyName: function (e) {
    this.setData({
      showModal: true,
      modifyWhich: 'name'
    })
  },

  modifyAddress: function (e) {
    this.setData({
      showModalAddress: true,
      modifyWhich: 'address'
    })
  },

  modifyPeopleNumber: function (e) {
    this.setData({
      showModal: true,
      modifyWhich: 'peopleNumber'
    })
  },

  /**
   * 获取input输入值
   */
  wish_put: function (e) {
    let company = this.data.serviceCompany
    if (this.data.modifyWhich == 'name') {
      company.name = e.detail.value
      this.setData({
        serviceCompany: company
      })
    } else if (this.data.modifyWhich == 'address') {
      company.address = e.detail.value
      this.setData({
        serviceCompany: company
      })
    } else if (this.data.modifyWhich == 'peopleNumber') {
      company.peopleNumber = e.detail.value
      this.setData({
        serviceCompany: company
      })
    }
  },

  companyRemark: function (e) {
    let company = this.data.serviceCompany
    company.remark = e.detail.value
    this.setData({
      serviceCompany: company
    })
  },

  /**
   * 点击返回按钮隐藏
   */
  back: function () {
    this.setData({
      showModal: false,
      showModalAddress: false
    })
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
      this.setData({
        addressRemark: `${that.data.provinceArray[that.data.multiIndex[0]].name} ${that.data.cityArray[that.data.multiIndex[1]].name} ${that.data.countyArray[that.data.multiIndex[2]].name}`
      })
    }
  },

  save: function (e) {
    console.log('保存')
    console.log(this.data.serviceCompany)
    let data = this.data.serviceCompany
    wxRequest({
      url: API_SC_SAVE,
      data,
      method: "POST"
    }).then(response => {
      console.log('---sc save---');
      console.log(response);
      if (response.isSuccess) {
        wx.showToast({
          title: '保存成功',
        })
      } else {
        wx.showToast({
          title: '保存失败',
          icon: 'error'
        })
      }
    }, reject => {
      wx.showToast({
        title: `保存失败:${reject.errorMsg}`,
        icon: 'error'
      })
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
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
        let company = that.data.serviceCompany
        company.logo = JSON.parse(res.data).data[0]
        that.setData({
          serviceCompany: company
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
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
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