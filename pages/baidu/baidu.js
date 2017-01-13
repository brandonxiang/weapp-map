var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({
    data: {
        markers: [],
        latitude: '40.056892',
        longitude: '116.308022',
        placeData: {},
        BMap:{},

        //ui
        sise: 'mini'
    },
    makertap: function (e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
        that.changeMarkerColor(wxMarkerData, id);
    },
    onLoad: function () {
        var that = this
        that.setData({BMap:new bmap.BMapWX({
            ak: 'TGCPu8MSHKem10tW90avn9jsVvM5Nrbf'
        })})

        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                that.setData({latitude:latitude,longitude:longitude})
            }
        })
    },
    weather: function () {
        wx.navigateTo({
            url: '../bdweather/bdweather'
        })
    },
    onSearch: function () {
        var that = this;
        var fail = function (data) {
            console.log(data)
        };
        var success = function (data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData
            });
            that.setData({
                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
        }
        // 发起POI检索请求 
        this.data.BMap.search({
            "query": '酒店',
            fail: fail,
            success: success,
            // 此处需要在相应路径放置图片文件 
            iconPath: '../../image/marker_red.png',
            // 此处需要在相应路径放置图片文件 
            iconTapPath: '../../image/marker_red.png'
        });
    },
    showSearchInfo: function (data, i) {
        var that = this;
        console.log(data)
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