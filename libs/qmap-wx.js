/**
 * @file 微信小程序JSAPI
 * @author 项伟平 2017.01.14
 * @github brandonxiang
 */

class QMapWX {

    constructor(param) {
        this.key = param["key"];
    }

    getWXLocation(type, success, fail, complete) {
        type = type || 'gcj02',
        success = success || function () {};
        fail = fail || function () {};
        complete = complete || function () {};
        wx.getLocation({
            type: type,
            success: success,
            fail: fail,
            complete:complete
        });
    }

    /**
     * POI周边检索
     *
     * @param {Object} param 检索配置
     * 参数对象结构可以参考
     * http://lbs.qq.com/webservice_v1/guide-search.html
     */
    search(param) {
        var that = this;
        param = param || {};
        let searchparam = {
            keyword: param["keyword"] || '生活服务$美食&酒店',

            orderby: param["orderby"] || '_distance',
            page_size: param["page_size"] || 10,
            page_index: param["page_index"] || 1,
            output: param["output"] || 'json',
            key: that.key||param["key"],
            callback:param["callback"]
        };
        const distance = param["distance"]|| "1000"
        if(param["filter"]){
          searchparam["filter"] = param["filter"]
        }
        let otherparam = {
            iconPath: param["iconPath"],
            iconTapPath: param["iconTapPath"],
            width: param["width"],
            height: param["height"],
            alpha: param["alpha"] || 1,
            success: param["success"] || function () {},
            fail: param["fail"] || function () {}
        };
        let type = 'gcj02';
        let locationsuccess = function (result) {
            searchparam["boundary"] = "nearby(" + result["latitude"] + "," + result["longitude"]+","+distance+")";
            wx.request({
                url: 'http://apis.map.qq.com/ws/place/v1/search',
                data: searchparam,
                header: {
                    "content-type": "application/json"
                },
                method: 'GET',
                success(data) {
                  console.log(data)
                    let res = data["data"];
                    if (res["status"] === 0) {
                        let poiArr = res["data"];
                        // outputRes 包含两个对象，
                        // originalData为百度接口返回的原始数据
                        // wxMarkerData为小程序规范的marker格式
                        let outputRes = {};
                        outputRes["originalData"] = res;
                        outputRes["wxMarkerData"] = [];
                        for (let i = 0; i < poiArr.length; i++) {
                            outputRes["wxMarkerData"][i] = {
                                id: i,
                                latitude: poiArr[i]["location"]["lat"],
                                longitude: poiArr[i]["location"]["lng"],
                                title: poiArr[i]["title"],
                                iconPath: otherparam["iconPath"],
                                iconTapPath: otherparam["iconTapPath"],
                                address: poiArr[i]["address"],
                                telephone: poiArr[i]["tel"],
                                alpha: otherparam["alpha"],
                                width: otherparam["width"],
                                height: otherparam["height"]
                            }
                        }
                        otherparam.success(outputRes);
                    } else {
                        otherparam.fail({
                            errMsg: res["errMsg"],
                            statusCode: res["statusCode"]
                        });
                    }
                },
                fail(data) {
                    otherparam.fail(data);
                }
            });
        }
        let locationfail = function (result) {
            otherparam.fail(result);
        };
        let locationcomplete = function (result) {
        };
        if (!searchparam["location"]) {
            that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
        } else {
            let longitude = searchparam.location.split(',')[1];
            let latitude = searchparam.location.split(',')[0];
            let errMsg = 'input location';
            let res = {
                errMsg: errMsg,
                latitude: latitude,
                longitude: longitude
            };
            locationsuccess(res);
        }
    }

    /**
     * sug模糊检索
     *
     * @param {Object} param 检索配置
     * 参数对象结构可以参考
     * http://lbsyun.baidu.com/index.php?title=webapi/place-suggestion-api
     */
    suggestion(param) {
        var that = this;
        param = param || {};
        let suggestionparam = {
            query: param["query"] || '',
            region: param["region"] || '全国',
            city_limit: param["city_limit"] || false,
            output: param["output"] || 'json',
            ak: that.ak,
            sn: param["sn"] || '',
            timestamp: param["timestamp"] || '',
            ret_coordtype: 'gcj02ll'
        };
        let otherparam = {
            success: param["success"] || function () {},
            fail: param["fail"] || function () {}
        };
        wx.request({
            url: 'https://api.map.baidu.com/place/v2/suggestion',
            data: suggestionparam,
            header: {
                "content-type": "application/json"
            },
            method: 'GET',
            success(data) {
                let res = data["data"];
                if (res["status"] === 0) {
                    otherparam.success(res);
                } else {
                    otherparam.fail({
                        errMsg: res["message"],
                        statusCode: res["status"]
                    });
                }
            },
            fail(data) {
                otherparam.fail(data);
            }
        });
    }

    /**
     * rgc检索（坐标->地点描述）
     *
     * @param {Object} param 检索配置
     * 参数对象结构可以参考
     * http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
     */
    regeocoding(param) {
        var that = this;
        param = param || {};
        let regeocodingparam = {
            coordtype: param["coordtype"] || 'gcj02ll',
            pois: param["pois"] || 0,
            output: param["output"] || 'json',
            ak: that.ak,
            sn: param["sn"] || '',
            timestamp: param["timestamp"] || '',
            ret_coordtype: 'gcj02ll'
        };
        let otherparam = {
            iconPath: param["iconPath"],
            iconTapPath: param["iconTapPath"],
            width: param["width"],
            height: param["height"],
            alpha: param["alpha"] || 1,
            success: param["success"] || function () {},
            fail: param["fail"] || function () {}
        };
        let type = 'gcj02';
        let locationsuccess = function (result) {
            regeocodingparam["location"] = result["latitude"] + ',' + result["longitude"];
            wx.request({
                url: 'https://api.map.baidu.com/geocoder/v2/',
                data: regeocodingparam,
                header: {
                    "content-type": "application/json"
                },
                method: 'GET',
                success(data) {
                    let res = data["data"];
                    if (res["status"] === 0) {
                        let poiObj = res["result"];
                        // outputRes 包含两个对象，
                        // originalData为百度接口返回的原始数据
                        // wxMarkerData为小程序规范的marker格式
                        let outputRes = {};
                        outputRes["originalData"] = res;
                        outputRes["wxMarkerData"] = [];
                        outputRes["wxMarkerData"][0] = {
                            id: 0,
                            latitude: result["latitude"],
                            longitude: result["longitude"],
                            address: poiObj["formatted_address"],
                            iconPath: otherparam["iconPath"],
                            iconTapPath: otherparam["iconTapPath"],
                            desc: poiObj["sematic_description"],
                            business: poiObj["business"],
                            alpha: otherparam["alpha"],
                            width: otherparam["width"],
                            height: otherparam["height"]
                        }
                        otherparam.success(outputRes);
                    } else {
                        otherparam.fail({
                            errMsg: res["message"],
                            statusCode: res["status"]
                        });
                    }
                },
                fail(data) {
                    otherparam.fail(data);
                }
            });
        };
        let locationfail = function (result) {
            otherparam.fail(result);
        }
        let locationcomplete = function (result) {
        };
        if (!regeocodingparam["location"]) {
            that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
        } else {
            let longitude = regeocodingparam.location.split(',')[1];
            let latitude = regeocodingparam.location.split(',')[0];
            let errMsg = 'input location';
            let res = {
                errMsg: errMsg,
                latitude: latitude,
                longitude: longitude
            };
            locationsuccess(res);
        }
    }

    /**
     * 天气检索
     *
     * @param {Object} param 检索配置
     */
    weather(param) {
        var that = this;
        param = param || {};
        let weatherparam = {
            coord_type: param["coord_type"] || 'gcj02',
            output: param["output"] || 'json',
            ak: that.ak,
            sn: param["sn"] || '',
            timestamp: param["timestamp"] || ''
        };
        let otherparam = {
            success: param["success"] || function () {},
            fail: param["fail"] || function () {}
        };
        let type = 'gcj02';
        let locationsuccess = function (result) {
            weatherparam["location"] = result["longitude"] + ',' + result["latitude"];
            wx.request({
                url: 'https://api.map.baidu.com/telematics/v3/weather',
                data: weatherparam,
                header: {
                    "content-type": "application/json"
                },
                method: 'GET',
                success(data) {
                    let res = data["data"];
                    if (res["error"] === 0 && res["status"] === 'success') {
                        let weatherArr = res["results"];
                        // outputRes 包含两个对象，
                        // originalData为百度接口返回的原始数据
                        // wxMarkerData为小程序规范的marker格式
                        let outputRes = {};
                        outputRes["originalData"] = res;
                        outputRes["currentWeather"] = [];
                        outputRes["currentWeather"][0] = {
                            currentCity: weatherArr[0]["currentCity"],
                            pm25: weatherArr[0]["pm25"],
                            date: weatherArr[0]["weather_data"][0]["date"],
                            temperature: weatherArr[0]["weather_data"][0]["temperature"],
                            weatherDesc: weatherArr[0]["weather_data"][0]["weather"],
                            wind: weatherArr[0]["weather_data"][0]["wind"]
                        };
                        otherparam.success(outputRes);
                    } else {
                        otherparam.fail({
                            errMsg: res["message"],
                            statusCode: res["status"]
                        });
                    }
                },
                fail(data) {
                    otherparam.fail(data);
                }
            });
        }
        let locationfail = function (result) {
            otherparam.fail(result);
        }
        let locationcomplete = function (result) {
        }
        if (!weatherparam["location"]) {
            that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
        } else {
            let longitude = weatherparam.location.split(',')[0];
            let latitude = weatherparam.location.split(',')[1];
            let errMsg = 'input location';
            let res = {
                errMsg: errMsg,
                latitude: latitude,
                longitude: longitude
            };
            locationsuccess(res);
        }
    }
}

module.exports.QMapWX = QMapWX;
