import {
  API_COMPANY_LIST
} from '../../apis/company.js'
import {
  API_JOBTYPE_LIST
} from '../../apis/jobtype.js'
import {
  API_JOB_SAVE,
  API_JOB_DETAIL
} from '../../apis/job.js'
import {
  API_RESOURCE_LIST
} from '../../apis/resource.js'
import {
  wxRequest
} from "../../apis/index.js";
import {
  BASE_AGE
} from "../../apis/ages.js";
import {
  API_ADDRESS_PROVINCE,
  API_ADDRESS_CITY,
  API_ADDRESS_COUNTY
} from '../../apis/address.js'
import {
  API_IMS_UPLOAD
} from '../../apis/vip-info.js'
// miniprogram/pages/release-enterprise/release-enterprise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [{
      url: ""
    }],
    job: {
      id: 0,
      image: "",
      companyId: 0,
      companyName: "",
      jobRemark: "",
      resourceId: 0,
      resourceName: "",
      ageBegin: 0,
      ageEnd: 0,
      jobMoneyType: 0,
      jobMoney: 0,
      getMoneyType: 0,
      getMoney: 0,
      getMoneyRemark: "",
      jobTypeId: 0,
      jobTypeName: "",
      province: 0,
      provinceName: "",
      city: 0,
      cityName: "",
      county: 0,
      countyName: "",
      address: "",
      contactsPeople1: "",
      contactsPhone1: "",
      contactsPeople2: "",
      contactsPhone2: "",
      contactsPeople3: "",
      contactsPhone3: ""
    },
    companyArray: [],
    companyIndex: 0,
    objectCompany: [],
    jobTypeArray: [],
    jobTypeIndex: 0,
    objectJobType: [],
    resourceArry: [],
    resourceIndex: 0,
    objectResource: [],

    ages: BASE_AGE,
    ageBeginIndex: 0,
    ageEndIndex: 0,
    jobMoneyType: [
      "时薪",
      "日薪",
      "月薪"
    ],
    jobMoneyIndex: 0,
    getMoneyType: [
      "时返",
      "天返",
      "月返",
      "一次返"
    ],
    getMoneyIndex: 0,

    multiArray: [],
    multiIndex: [0, 0, 0],
    provinceArray: [],
    cityArray: [],
    countyArray: [],
    addressSelect: "请选择"
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
        let job = that.data.job
        job.image = JSON.parse(res.data).data[0]
        that.setData({
          job: job
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

  getCompanyList: function (id) {
    let that = this
    wxRequest({
      url: API_COMPANY_LIST,
      method: "GET"
    }).then(response => {
      console.log('---c get---');
      console.log(response);
      let companyList = []
      
      that.setData({
        companyArray: response.data,
        objectCompany: response.data
      })
      if (id == 0) {
        let job = that.data.job
        job.companyId = response.data[0].id
        that.setData({
          job: job
        })
      }
    })
  },

  /**
   * 获取职位列表
   */
  getJobTypeList: function (id) {
    let that = this
    wxRequest({
      url: API_JOBTYPE_LIST,
      method: "GET"
    }).then(response => {
      console.log('---jobtype get---');
      console.log(response);
      let jobTypeList = []
      for (var i = 0; i < response.data.length; i++) {
        jobTypeList.push(response.data[i].name)
      }
      that.setData({
        jobTypeArray: jobTypeList,
        objectJobType: response.data
      })
      if (id == 0) {
        let job = that.data.job
        job.jobTypeId = response.data[0].id
        that.setData({
          job: job
        })
      }
    })
  },

  /**
   * 获取职位列表
   */

  getResourceList: function (id) {
    let that = this
    wxRequest({
      url: API_RESOURCE_LIST,
      method: "GET"
    }).then(response => {
      console.log('---resource get---');
      console.log(response);
      let resourceList = []
      for (var i = 0; i < response.data.length; i++) {
        resourceList.push(response.data[i].name)
      }
      that.setData({
        resourceArray: resourceList,
        objectResource: response.data
      })
      if (id == 0) {
        let job = that.data.job
        job.resourceId = response.data[0].id
        that.setData({
          job: job
        })
      }
    })
  },

  /**
   * 详细地址
   */
  addressInput: function (e) {
    console.log(e.detail.value)
    let job = this.data.job
    job.address = e.detail.value
    this.setData({
      job: job
    })
  },

  /**
   * 联系人姓名
   */
  contactsPeople1Change: function (e) {
    console.log(e.detail.value)
    let job = this.data.job
    job.contactsPeople1 = e.detail.value
    this.setData({
      job: job
    })
  },

  /**
   * 联系人电话
   */
  contactsPhone1Change: function (e) {
    let job = this.data.job
    job.contactsPhone1 = e.detail.value
    if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(e.detail.value)){
        job.contactsPhone1 = '';
        wx.showToast({
        title: '请输入正确的手机号',
        icon: 'error'
      })
    }
    this.setData({
      job: job
    })
  },

  /**
   * 企业
   */
  bindCompanyChange: function (e) {
    console.log(e)
    let job = this.data.job
    job.companyId = this.data.objectCompany[e.detail.value].id
    this.setData({
      companyIndex: e.detail.value,
      job: job
    })
  },
  bindCompanyChangeNew: function (e) {
    console.log(e)
    let job = this.data.job
    job.companyId = e.detail.id;
    job.companyName = e.detail.name
    this.setData({
      
      job
    })
  },

  /**
   * 返费
   */
  getMoneyInput: function (e) {
    console.log(e)
    let job = this.data.job
    job.getMoney = e.detail.value
    this.setData({
      job: job
    })
  },

  /**
   * 返费类型
   */
  bindGetMoneyTypeChange: function (e) {
    console.log(e.detail.value * 1 + 1)
    let job = this.data.job
    job.getMoneyType = e.detail.value * 1 + 1
    this.setData({
      getMoneyIndex: e.detail.value,
      job: job
    })
  },

  /**
   * 薪资
   */
  jobMoneyInput: function (e) {
    let job = this.data.job
    job.jobMoney = e.detail.value
    this.setData({
      job: job
    })
  },

  /**
   * 薪资类型
   */
  bindJobMoneyTypeChange: function (e) {
    let job = this.data.job
    job.jobMoneyType = e.detail.value * 1 + 1
    this.setData({
      jobMoneyIndex: e.detail.value,
      job: job
    })
  },

  /**
   * 返费政策
   */
  getMoneyRemarkInput: function (e) {
    console.log(e.detail.value)
    let job = this.data.job
    job.getMoneyRemark = e.detail.value
    this.setData({
      job: job
    })
  },

  /**
   * 职位介绍
   */
  remarkInput: function (e) {
    console.log(e.detail.value)
    let job = this.data.job
    job.jobRemark = e.detail.value
    this.setData({
      job: job
    })
  },

  /**
   * 职位类型
   */
  bindJobTypeChange: function (e) {
    let jobTypeId = this.data.objectJobType[e.detail.value].id
    let job = this.data.job
    job.jobTypeId = jobTypeId
    this.setData({
      jobTypeIndex: e.detail.value,
      job: job
    })
  },

  /**
   * 招聘职位
   */
  bindResourceChange: function (e) {
    let job = this.data.job
    job.resourceId = this.data.objectResource[e.detail.value].id
    this.setData({
      job: job,
      resourceIndex: e.detail.value
    })
  },

  bindAgeBeginChange: function (e) {
    let job = this.data.job
    job.ageBegin = this.data.ages[e.detail.value]
    this.setData({
      ageBeginIndex: e.detail.value
    })
  },

  bindAgeEndChange: function (e) {
    let job = this.data.job
    job.ageEnd = this.data.ages[e.detail.value]
    this.setData({
      ageEndIndex: e.detail.value
    })
  },

  provinceChange: function (provinceId, isload) {
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
        if (isload) {
          that.addressPickerSetData()
        }
      })
    })
  },

  cityChange: function (cityId, isload) {
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
      if (isload) {
        that.addressPickerSetData()
      }
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

  bindMultiPickerChange: function (e) {
    console.log(e)
    this.setData({
      multiIndex: e.detail.value
    })
    var job = this.data.job
    job.province = this.data.provinceArray[e.detail.value[0]].id
    job.city = this.data.cityArray[e.detail.value[1]].id
    job.county = this.data.countyArray[e.detail.value[2]].id
    let multiArray1 = this.data.multiArray
    let multiIndex1 = this.data.multiIndex
    this.setData({
      job: job,
      addressSelect: `${multiArray1[0][multiIndex1[0]]} ${multiArray1[1][multiIndex1[1]]} ${multiArray1[2][multiIndex1[2]]}`
    })
  },

  bindMultiPickerColumnChange: function (e) {
    let that = this
    console.log(e)
    if (e.detail.column === 0) {
      this.provinceChange(this.data.provinceArray[e.detail.value].id, true)

    } else if (e.detail.column === 1) {
      this.cityChange(this.data.cityArray[e.detail.value].id, true)

    } else if (e.detail.column === 2) {

    }
  },

  /**
   * 保存
   */
  save: function () {
    let reqData = this.data.job
    reqData.jobMoney = reqData.jobMoney * 1
    reqData.getMoney = reqData.getMoney * 1
    wxRequest({
      url: `${API_JOB_SAVE}`,
      data: reqData,
      method: "POST"
    }).then(response => {
      console.log("---company save---")
      console.log(response)
      wx.showToast({
        title: '保存成功',
      })
      wx.navigateTo({
          url: '/pages/my-release/my-release'
      });
    }, errorRes => {
      wx.showToast({
        title: errorRes.errorMsg,
        icon: 'error'
      })
    })
  },

  init: function (id) {
    this.getCompanyList(id)
    this.getJobTypeList(id)
    this.getResourceList(id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id = options.id
    let that = this

    this.init(id)

    if (id > 0) {
      wxRequest({
        url: `${API_JOB_DETAIL}?id=${id}`,
        method: "GET"
      }).then(response => {
        console.log("---job get---")
        console.log(response)
        let imgs = that.data.files
        imgs[0].url = response.data.image
        that.setData({
          job: response.data,
          files: imgs,
          ageBeginIndex: that.data.ages.indexOf(response.data.ageBegin > 0 ? response.data.ageBegin : that.data.ages[0]),
          ageEndIndex: that.data.ages.indexOf(response.data.ageEnd > 0 ? response.data.ageEnd : that.data.ages[0]),
          jobMoneyIndex: (response.data.jobMoneyType * 1) > 0 ? response.data.jobMoneyType * 1 - 1 : 0,
          getMoneyIndex: (response.data.getMoneyType * 1) > 0 ? response.data.getMoneyType * 1 - 1 : 0,
          companyIndex: that.data.objectCompany.map(o => o.id).indexOf(response.data.companyId),
          resourceIndex: that.data.objectResource.map(o => o.id).indexOf(response.data.resourceId),
          jobTypeIndex: that.data.objectJobType.map(o => o.id).indexOf(response.data.jobTypeId),
          addressSelect: `${response.data.provinceName} ${response.data.cityName} ${response.data.countyName}`
        })
      })
    } else {
      let job = that.data.job
      job.ageBegin = that.data.ages[0]
      job.ageEnd = that.data.ages[0]
      job.jobMoneyType = 1
      job.getMoneyType = 1
      that.setData({
        files: [],
        job: job
      })
    }

    this.setData({
      uplaodFile: this.uplaodFile.bind(this)
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
      that.provinceChange(response.data[0].id, true)
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