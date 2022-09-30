// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:{},
    shoplist:[],
    page:1,
    pageSize:10,
    total:0,
    isLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      query:options
    }),
    this.getShopList()
  },
  getShopList (cb) {
    this.setData({
      isLoading:true
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method:'GET',
      data:{
        _page:this.data.page,
        _limit:this.data.pageSize
      },
      success:(res) => {
        this.setData({
          shoplist:[...this.data.shoplist,...res.data], // 新旧数组拼接
          total:res.header['X-Total-Count'] - 0  // 字符串转为数字
        })
      },
      complete:() => {
        wx.hideLoading(),
        this.setData({
          isLoading:false
        })
        cb && cb()
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.name,
    })

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
    this.setData({
      page:1,
      total:0,
      shoplist:[]
    })
    this.getShopList(() => {
      wx.stopPullDownRefresh()
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("触底了")
    // 判断数据是否加载完毕
    if(this.data.page * this.data.pageSize >= this.data.total) {
      wx.showToast({
        title: '数据加载完毕！',
      })
      return
    } 
    // 节流
    if(this.data.isLoading == true) return
    this.setData({
      page:this.data.page + 1
    })
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})