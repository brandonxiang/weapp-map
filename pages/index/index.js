import qmap from '../../libs/qmap-wx.js'
var markersData = []

Page({
    data: {
        markers: [],
        latitude: '40.056892',
        longitude: '116.308022',
        placeData: {},
        QMap: {},
    },

    makertap: function (e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(markersData, id);
        that.changeMarkerColor(markersData, id);
    },
    onLoad: function () {
        var that = this
        that.setData({
            QMap: new qmap.QMapWX({
                key: 'EZ6BZ-3GE3K-PJ5J7-AEPW5-IOMCO-E4F6J'
            })
        })

        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                that.setData({ latitude: latitude, longitude: longitude })
            }
        })
    },

    onSearch: function () {
        var that = this;
        var fail = function (data) {
            console.log(data)
        }

        var success = function (data) {
            markersData = data.wxMarkerData;
            that.setData({
                markers: markersData
            });
            that.setData({
                latitude: markersData[0].latitude
            });
            that.setData({
                longitude: markersData[0].longitude
            });
        }

        this.data.QMap.search({
            keyword: "酒店",
            fail: fail,
            success: success,
            iconPath: '../../image/marker_red.png',

            iconTapPath: '../../image/marker_red.png'
        })
    },
    onSuggest:function(e){
        var that = this
        var fail = function (data) {
            console.log(data)
        };
        var success = function (data) {
            var sugData = '';
            for (var i = 0; i < data.data.length; i++) {
                sugData = sugData + data.data[i].title + '\n';
            }
            that.setData({
                sugData: sugData
            });
        }
        this.data.QMap.suggestion({
            keyword: e.detail.value,
            region: '深圳',
            fail: fail,
            success: success
        });
    },
    onRegeo: function(){
      var that = this
      var fail = function (data) {
          console.log(data)
      };
      var success = function (data) {
          const wxMarkerData = data.wxMarkerData;
          that.setData({
              markers: wxMarkerData
          });
          that.setData({
              latitude: wxMarkerData[0].latitude
          });
          that.setData({
              longitude: wxMarkerData[0].longitude
          });
          that.setData({
              placeData: {
                  address: '地址：' + wxMarkerData[0].address + '\n'
              }
          })
      }
      this.data.QMap.regeocoding({
          fail: fail,
          success: success,
          iconPath: '../../image/marker_red.png',
          iconTapPath: '../../image/marker_red.png'
      });
    },
    showSearchInfo: function (data, i) {
        var that = this;
        that.setData({
            placeData: {
                title: '名称：' + data[i].title + '\n',
                address: '地址：' + data[i].address + '\n',
                telephone: '电话：' + data[i].telephone
            }
        });
    },
    changeMarkerColor: function (data, i) {
        var that = this;
        var markers = [];
        for (var j = 0; j < data.length; j++) {
            if (j == i) {
                // 此处需要在相应路径放置图片文件
                data[j].iconPath = "../../image/marker_yellow.png";
            } else {
                // 此处需要在相应路径放置图片文件
                data[j].iconPath = "../../image/marker_red.png";
            }
            markers.push(data[j]);
        }
        that.setData({
            markers: markers
        });
    }
})
