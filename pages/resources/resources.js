// pages/resources/resources.js

import { API_COMPANY_SEARCH } from "../../apis/company.js";

import { API_SC_SEARCH } from "../../apis/service-company.js";

import { wxRequest } from "../../apis/index.js";

import {
  API_ADDRESS_PROVINCE,
  API_ADDRESS_CITY,
  API_ADDRESS_COUNTY,
} from "../../apis/address.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    activeTab: 0,
    optionAreaArry: [
      {
        name: "地区",
        id: "1",
      },
      {
        name: "中国",
        id: "2",
      },
      {
        name: "美国",
        id: "3",
      },
      {
        name: "意大利",
        id: "4",
      },
    ],
    //职位
    optionPositionArry: [
      {
        name: "职位",
        id: "1",
      },
      {
        name: "员工",
        id: "2",
      },
      {
        name: "经理",
        id: "3",
      },
      {
        name: "老板",
        id: "4",
      },
    ],
    //计薪
    optionMoneyArry: [
      {
        name: "计薪",
        id: "1",
      },
      {
        name: "小时",
        id: "2",
      },
      {
        name: "天",
        id: "3",
      },
      {
        name: "月",
        id: "4",
      },
    ],
    tabList: {
      LDKQ: {
        title: "立等可取",
        state: "LDKQ",
        pageNo: 1,
        isLoaded: false,
        data: [],
      },
      YY: {
        title: "预约订单",
        state: "YY",
        pageNo: 1,
        isLoaded: false,
        data: [],
      },
      DPJ: {
        title: "待评价",
        state: "DPJ",
        pageNo: 1,
        isLoaded: false,
        data: [],
      },
      all: {
        title: "全部",
        state: "all",
        pageNo: 1,
        isLoaded: false,
        data: [],
      },
    },
    dataList: [],
    mounted: false,
    pageIndex: 1,
    pageSize: 5,
    loadingMoreHidden: true,
    inputVal: "",
    DEFAULT_IMAGE: "../../images/job.png",
    locationInfo: [],
    name: "",
  },

  onTabCLick: function (e) {
    console.log(e);
    console.log(this.data.tabs);
    console.log(this.data.activeTab);
    this.setData({
      activeTab: e.detail.index,
    });
  },

  onChange: function (e) {
    this.setData({
      pageIndex: 1,
      loadingMoreHidden: true,
      name: "",
    });
    this.getListByActiveTab();
  },
  onSearch: function (e) {
    this.setData({
      name: e.detail,
      pageIndex: 1,
      loadingMoreHidden: true,
    });
    this.getListByActiveTab();
  },
  searchCancel: function (e) {
    this.setData({
      name: "",
      pageIndex: 1,
      loadingMoreHidden: true,
    });
    this.getListByActiveTab();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const titles = ["找企业", "找劳务"];
    const tabs = titles.map((item) => ({
      title: item,
    }));

    this.setData({
      mounted: true,
      tabs,
    });
    this.searchCompany();
  },

  /**
   * 查找企业
   */
  searchCompany: function () {
    let that = this;
    let pIndex = that.data.pageIndex;
    let pSize = that.data.pageSize;
    let name = that.data.name ? `&Name=${that.data.name}` : "";
    //获取区/县
    wxRequest({
      url: `${API_COMPANY_SEARCH}?PageIndex=${pIndex}&PageSize=${pSize}` + name,
      method: "GET",
    }).then((response) => {
      console.log("---company list get---");

      let loadingMoreHidden = pSize >(response.data && response.data.length||0) ? false : true;
      let dataList =
        pIndex == 1 ? response.data : that.data.dataList.concat(response.data);
      console.log(loadingMoreHidden);
      that.setData({
        dataList,
        loadingMoreHidden,
      });
    });
  },
  getSearchInfo: function (e) {
    if (e.detail.value) {
      this.setData({
        locationInfo: e.detail.value,
      });
    }
  },
  /**
   * 查找劳务公司
   */
  searchServiceCompany: function () {
    let that = this;
    let pIndex = that.data.pageIndex;
    let pSize = that.data.pageSize;
    //省份
    let Province =
      that.data.locationInfo && that.data.locationInfo[0]
        ? `&Province=${that.data.locationInfo[0]}`
        : "";
    //城市
    let city =
      that.data.locationInfo && that.data.locationInfo[1]
        ? `&City=${that.data.locationInfo[1]}`
        : "";
    //关键词
    let name = that.data.name ? `&Name=${that.data.name}` : "";
    //获取区/县
    wxRequest({
      url: `${API_SC_SEARCH}?PageIndex=${pIndex}&PageSize=${pSize}` + name,
      method: "GET",
    }).then((response) => {
      console.log("---service company list get---");
      //console.log(response)
      let loadingMoreHidden = pSize >(response.data && response.data.length||0) ? false : true;
      let dataList =
        pIndex == 1 ? response.data : that.data.dataList.concat(response.data);
      that.setData({
        dataList,
        loadingMoreHidden,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 1,
      name: "",
    });
    this.getListByActiveTab();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loadingMoreHidden) {
      this.setData({
        pageIndex: (this.data.pageIndex += 1),
      });
      this.getListByActiveTab();
    }
  },
  getListByActiveTab: function () {
    if (this.data.activeTab === 0) {
      this.searchCompany();
    } else if (this.data.activeTab === 1) {
      this.searchServiceCompany();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
