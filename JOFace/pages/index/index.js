// pages/index/index.js
var api = require("../../config/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
      'text': '动态'
    },
    {
      'text': '推荐'    
    },
    {
      'text': '新作'      
    },    
    ],
    newsList: [],
    minId: 0,
    maxId: 0
  },
  /**
   * 分页获取动态列表
   */
  getNews: function (roll) {
    var condition = {};
    if (roll) {
      condition["minId"] = this.data.minId;
    }
    wx.request({
      url: api.News,
      data: condition,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res);
        if (res.statusCode == 200) {
          console.log(res.data)
          var resultLength = res.data.length;
          console.log(resultLength)
          if (resultLength > 0) {
            this.setData({
              minId: res.data[resultLength - 1].id
            });
            if (!this.data.maxId) {
              this.setData({
                maxId: res.data[0].id
              });
            }
            this.setData({
              newsList: this.data.newsList.concat(res.data)
            });
          } else {
            wx.showToast({
              title: '已经到底了',
              icon: 'none'
            })
          }

        } else {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          })
        }
      }
    })

  },
  /**
   * 获取最新的动态
   */
  getLatestNews: function () {
    if (!this.data.maxId) {
      this.getNews();
      return
    }
    wx.request({
      url: api.News,
      data: {
        maxId: this.data.maxId
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // 把最新的数据插入到最前面
        if (res.statusCode == 200) {
          var result = res.data.results.reverse();
          if (result.length <= 0) {
            wx.showToast({
              title: '没有新数据了',
              icon: 'none'
            })
            return
          }
          this.setData({
            newsList: result.concat(this.data.newsList),
            maxId: result[0].id
          })
        }
      },
      complete: (res) => {
        wx.stopPullDownRefresh();
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNews(false);
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
    this.getLatestNews();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getNews(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})