
var markersData = []
Page({
  data: {
    markers: [],
    latitude: '40.056892',
    longitude: '116.308022',
    placeData: {},
    QMap:{},
  },

  makertap: function (e) {
      var that = this;
      var id = e.markerId;
      // that.showSearchInfo(markersData, id);
      // that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    var that = this
    // that.setData({BMap:new bmap.BMapWX({
    //     ak: 'TGCPu8MSHKem10tW90avn9jsVvM5Nrbf'
    // })})

    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            that.setData({latitude:latitude,longitude:longitude})
        }
    })
  }
})
