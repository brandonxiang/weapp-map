# weapp-map

A map demo for qq map,  baidu map, amap on the weapp platform

- **search**	进行search检索，检索周边POI信息
- **suggestion** 进行suggestion检索，根据内容进行模糊检索匹配，输入补全
- **regeocoding** 进行regeocoding检索，根据经纬度获得对应的地理描述信息


## 微信小程序笔记一：地图与BAT的接口SDK

>源码github地址在此，记得点星：
https://github.com/brandonxiang/weapp-map

## 引言

在小程序内测时，我第一时间关注到小程序地图和导航服务。小程序貌似将服务限制为腾讯地图为底图，[wechat-weapp-mapdemo](https://github.com/giscafer/wechat-weapp-mapdemo)非常直观地阐述了小程序地图服务的使用。显然，小程序会保护腾讯地图服务。当时，我觉得确实没什么可以扩展的开源项目，因为小程序对加载第三方库存在阻碍，很多工作没法开展。

从1月9日起，小程序正式发布，我也在高德地图和百度地图上看到对应的小程序API。因此，我在这里试用一下它们的SDK服务，作一个横向的对比。

## 相关文档

[高德地图小程序SDK](http://lbs.amap.com/api/wx/summary/)
[高德地图小程序SDK demo](https://github.com/amap-demo/wx-regeo-poiaround-weather)
[百度地图小程序SDK](http://lbsyun.baidu.com/index.php?title=wxjsapi)
[百度地图小程序SDK](https://github.com/baidumapapi/wxapp-jsapi)

## 概述

SDK的产生主要是高德地图和百度地图发现小程序地图服务的缺陷，很多功能还不完善。它们分别提供一些兴趣点搜素等辅助性的功能。两者由于存在一个竞争的关系，所以它们的文档、接口、甚至实现都非常相似。

## 功能

### 百度地图
- **search**	进行search检索，检索周边POI信息
- **suggestion** 进行suggestion检索，根据内容进行模糊检索匹配，输入补全
- **regeocoding** 进行regeocoding检索，根据经纬度获得对应的地理描述信息
- **weather** 进行weather检索，查询指定地点的天气信息

### 高德地图

- **getRegeo** 根据用户定位，返回用户位置地址描述信息
- **getPoiAround** 根据用户定位，返回用户所在位置附近多个poi信息
- **getWeather** 根据用户定位，返回用户所在位置附近天气信息

### 两者异同

两者都存在搜索poi等功能，但是高德地图并没有提供关键字搜索，只是对周围poi进行搜索。这样的操作，从用户的角度来说，是没有意义的。我相信后续版本将火速更新。两者都有反地址编码的功能，但是都是仅限于用户当前位置，这也是受限制的。与其说，它们是SDK，还不如说它们是接口调用的demo。何况高德地图小程序SDK还不给源码，只给个min文件。suggestion只不过是个提示，后续功能还待开发，功能非常鸡肋。

## 腾讯地图小程序SDK

在完成两个地图SDK的对比后，我特意留意一下腾讯地图并没有发布小程序SDK。

于是，参照百度小程序SDK，我将把对应功能进行编写腾讯地图接口。希望腾讯的员工能看到我的开源代码[qmap-wx.js](https://github.com/brandonxiang/weapp-map/blob/master/libs/qmap-wx.js)。

转载，请表明出处。[总目录跨平台快速开发](http://www.jianshu.com/p/0348e33fb9d0)
