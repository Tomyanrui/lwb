const {
  GRID_DEMO_URL
} = getApp().globalData
const app = getApp()


import {
  API_JOB_SEARCH
} from '../../apis/job.js'
import {
  API_ADS_GET
} from '../../apis/ads.js'


import {
  wxRequest
} from "../../apis/index.js";

import {
  API_ADDRESS_PROVINCE,
  API_ADDRESS_CITY,
  API_ADDRESS_COUNTY
} from '../../apis/address.js'
import {DEFAULT_IMAGE} from '../../config/constants'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    swiperImages: [],
    gridIcon: "../../images/icon_resources_HL.png",
    grids: [{
        icon: "../../images/icon_resources_HL.png",
        title: "小时工"
      },
      {
        icon: "../../images/icon_resources_HL.png",
        title: "高返费"
      },
      {
        icon: "../../images/icon_resources_HL.png",
        title: "大龄工"
      },
      {
        icon: "../../images/icon_resources_HL.png",
        title: "找企业"
      },
      {
        icon: "../../images/icon_resources_HL.png",
        title: "找劳务"
      },
      {
        icon: "../../images/icon_resources_HL.png",
        title: "找代理"
      }
    ],
    optionAreaArry: [{
      "name": "地区",
      "id": "1"
    }, {
      "name": "中国",
      "id": "2"
    }, {
      "name": "美国",
      "id": "3"
    }, {
      "name": "意大利",
      "id": "4"
    }],
    //职位
    optionPositionArry: [{
      "name": "职位",
      "id": "1"
    }, {
      "name": "员工",
      "id": "2"
    }, {
      "name": "经理",
      "id": "3"
    }, {
      "name": "老板",
      "id": "4"
    }],
    //计薪
    optionMoneyArry: [{
      "name": "计薪",
      "id": "1"
    }, {
      "name": "小时",
      "id": "2"
    }, {
      "name": "天",
      "id": "3"
    }, {
      "name": "月",
      "id": "4"
    }],
    //排序
    optionDescArry: [{
        "name": "最近发布",
        "id": "1"
      }, {
        "name": "由近及远",
        "id": "2"
      }, {
        "name": "小时工高到低",
        "id": "3"
      },
      {
        "name": "返费高到低",
        "id": "4"
      }
    ],
    jobs: [],
    pageIndex: 1,
    pageSize: 10,
    DEFAULT_IMAGE:'../../images/job.png',
    loadingMoreHidden: true,
  },

  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    this.setData({
      grade_name: name,
      select: false
    })
  },

  searchJobs: function () {
    let that = this
    let pIndex = that.data.pageIndex
    let pSize = that.data.pageSize
    //获取区/县
    wxRequest({
      url: `${API_JOB_SEARCH}?PageIndex=${pIndex}&PageSize=${pSize}`,
      method: "GET"
    }).then(response => {
      console.log("---job list get---")
      let loadingMoreHidden = pSize > response.data.length ? true : false;
      let dataList =
      pIndex == 1 ? response.data : that.data.dataList.concat(response.data);
      console.log(response)
      that.setData({
        jobs: dataList
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetAds()
    this.setData({
      search: this.search.bind(this)
    })
    console.log("----------------")
    if (wx.getStorageSync('userInfo')) {
      this.searchJobs()
    } else {
      app.loginReadyCallback = () => {
        this.searchJobs()
      }
    }
  },

  GetAds: function () {
    let that = this
    wxRequest({
      url: API_ADS_GET,
      method: "GET"
    }).then(response => {
      console.log("---ads get---")
      console.log(response)
      that.setData({
        swiperImages: response.data
      })
    })
  },

  search: function (value) {
    return new Promise((resolve, reject) => {
      if (this.data.i % 2 === 0) {
        setTimeout(() => {
          resolve([{
            text: '搜索结果',
            value: 1
          }, {
            text: '搜索结果2',
            value: 2
          }])
        }, 200)
      } else {
        setTimeout(() => {
          resolve([])
        }, 200)
      }
      console.log('搜索结果=' + value)
      this.setData({
        i: this.data.i + 1
      })
    })
  },

  selectResult: function (e) {
    console.log('select result', e.detail)
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
   * 点击公司跳转
   */
  toDetailsTap: function(e) {
   
    wx.navigateTo({
      url: '/pages/job/job?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("下拉。。")
    this.setData({
      pageIndex: 1,
      pageSize: 10
    })
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.loadingMoreHidden) {
      this.setData({
        pageIndex: (this.data.pageIndex += 1),
      });
      this.searchJobs();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})