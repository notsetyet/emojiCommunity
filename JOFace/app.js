
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.globalData.myDevice = wx.getSystemInfoSync()

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    myDevice: null,
    userInfo: null,
    systemInfo: null,
    bgPic: null,
    scale: 1,
    rotate: 0,
    hat_center_x: 0,
    hat_center_y: 0,
    currentHatId: 1,
    chooseID: 0 //口罩还是帽子
  },
  initUserInfo: function (res, localInfo) {
    var info = {
      nickName: localInfo.nickName,
      avatar: localInfo.avatar
    }
    // 1.去公共的app.js中调用globalData，在里面赋值。(在全局变量赋值)
    this.globalData.userInfo = info;//{phone:xxx,token:xxxx}

    // 2.在本地“cookie”中赋值
    wx.setStorageSync("userInfo", info);

  },
  logoutUserInfo: function () {
    wx.removeStorageSync('userInfo');
    this.globalData.userInfo = null;
  },
  getSystemInfo: function (cb) {
    var that = this
    if (that.globalData.systemInfo) {
      typeof cb == "function" && cb(that.globalData.systemInfo)
    } else {
      wx.getSystemInfo({
        success: function (res) {
          that.globalData.systemInfo = res
          typeof cb == "function" && cb(that.globalData.systemInfo)
        }
      })
    }
  },
})
