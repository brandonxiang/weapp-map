import amapFile from '../../libs/amap-wx.js'

Page({
    data: {

    },
    onLoad: function () {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({ key: 'ea889682997a181fd6678d9aaf23693a' });
        myAmapFun.getWeather({
            success: function (data) {
                console.log(data)
                const weatherData = '城市：' + data.city.data + '\n'
                +'日期：' + data.liveData.reporttime + '\n'
                + '温度：' + data.temperature.data + '\n'
                +'天气：' + data.weather.data + '\n'
                +'风力：' + data.windpower.data + '\n';
                that.setData({
                    weatherData: weatherData
                });
                //成功回调
            },
            fail: function (info) {
                //失败回调
                console.log(info)
            }
        })
    }
})
