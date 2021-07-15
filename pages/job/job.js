import {
  
  API_JOB_DETAIL
} from '../../apis/job.js'
import {
  wxRequest
} from "../../apis/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    jobObj:null,
    DEFAULT_IMAGE:'../../images/job.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    });
    let that = this
    wxRequest({
        url: `${API_JOB_DETAIL}?id=${options.id}`,
        method: "GET"
      }).then(response => {
        console.log("---job get---")
        console.log(response)
       
        that.setData({
          jobObj: response.data,
         
        })
      })
    //  this.getHabitIcon(options);
  },
  toCompany:function(e){
   
    if(e.target.dataset.id &&e.target.dataset.name){
      wx.navigateTo({
      url: '/pages/company/company?id='+e.target.dataset.id,
    })
    }
  },
  phoneCall: function (e) {
    if(!e.currentTarget.dataset.replyPhone){
      return 
    }
    wx.makePhoneCall({
    phoneNumber: e.currentTarget.dataset.replyPhone,
    
    success: function () {
    console.log("成功拨打电话")
    
    },
    
    })
    
    },
    
});
