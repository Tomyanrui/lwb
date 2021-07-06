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
    jobObj:null
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
});
