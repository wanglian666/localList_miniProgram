// pages/concact/concact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList:[],
    isLoading:false  // 节流阀
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getColorList();
  },
  getColorList() {
    // 显示loading效果
    wx.showLoading({
      title: '数据加载中...',
    })
    this.setData({
      isLoading:true
    })
    wx.request({
      url: 'https://www.escook.cn/api/color',
      method:'GET',
      success:(res) => {
        this.setData({
          colorList:[...this.data.colorList,...res.data.data]
        })
      },
      complete:() => {
        // 隐藏loading效果
        wx.hideLoading()
        this.setData({
          isLoading:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log("触发了下拉刷新");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("触底了！");
    if(this.data.isLoading == true) return
    this.getColorList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})