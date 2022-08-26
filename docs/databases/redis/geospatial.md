# geospatial 地理位置

## geoadd

添加地址位置

**语法**：

```shell
geoadd key longitude latitude member[longitude latitude member......]
```

```shell
127.0.0.1:6379> geoadd china:city 116.40 39.90 beijing 121.47 31.23 shanghai 106.50 29.53 chongqing 114.05 22.52 shenzhen 
(integer) 4
127.0.0.1:6379> geoadd china:city 120.16 30.24 hangzhou 108.96 34.26 xian
(integer) 2
```

::: tip 注意

+ 有效的经度从 -180 度到 180 度
+ 有效的纬度从 -85.05112878 度到 85.05112878 度
+ 当坐标位置超出上述指定范围时，该命令将会返回一个错误

:::

## geopos

获得当前位置：一定是一个坐标值

**语法**：

```shell
geopos key member[member.....]
```

```shell
127.0.0.1:6379> geopos china:city beijing    #获取指定的城市的经度和纬度
1) 1) "116.39999896287918091"
   2) "39.90000009167092543"
127.0.0.1:6379> geopos china:city beijing chongqing
1) 1) "116.39999896287918091"
   2) "39.90000009167092543"
2) 1) "106.49999767541885376"
   2) "29.52999957900659211"
```

## geodist

查看两地之间的距离

单位：

+ m 表示单位为米
+ km 表示单位为千米
+ mi 表示单位为英里
+ ft 表示单位英尺

**语法**：

```shell
geodist key member1 member2 [M|KM|FT|MI]
```

```shell
127.0.0.1:6379> geodist china:city beijing shanghai km     # 查看上海到北京的直线距离
"1067.3788"
127.0.0.1:6379> geodist china:city beijing chongqing km   # 查看重庆到北京的直线距离
"1464.0708"
127.0.0.1:6379> geodist china:city beijing chongqing m
"1464070.8051"
```

## georadius

以给定你的经纬度为中心，找出某一半径内的元素

**语法**：

```shell
georadius key longitude latitude radius M|KM|FT|MI [withcoord] [withdist] [COUNT count [ANY]] [ASC|DESC] [STORE key] [STOREDIST key]
```

```shell
127.0.0.1:6379> georadius china:city 110 30 1000 km   #以110、30 这个经纬度为中心，寻找方圆1000km内的城市
1) "chongqing"
2) "xian"
3) "shenzhen"
4) "hangzhou"
127.0.0.1:6379> georadius china:city 110 30 500 km
1) "chongqing"
2) "xian"
127.0.0.1:6379> georadius china:city 110 30 500 km withdist   #显示到中间距离的位置
1) 1) "chongqing"
   2) "341.9374"
2) 1) "xian"
   2) "483.8340"
127.0.0.1:6379> georadius china:city 110 30 500 km withcoord # 显示他人的定位信息
1) 1) "chongqing"
   2) 1) "106.49999767541885376"
      2) "29.52999957900659211"
2) 1) "xian"
   2) 1) "108.96000176668167114"
      2) "34.25999964418929977"
127.0.0.1:6379> georadius china:city 110 30 500 km withcoord withdist count 1 # 筛选指定的结果
1) 1) "chongqing"
   2) "341.9374"
   3) 1) "106.49999767541885376"
      2) "29.52999957900659211"
127.0.0.1:6379> georadius china:city 110 30 500 km withcoord withdist count 2
1) 1) "chongqing"
   2) "341.9374"
   3) 1) "106.49999767541885376"
      2) "29.52999957900659211"
2) 1) "xian"
   2) "483.8340"
   3) 1) "108.96000176668167114"
      2) "34.25999964418929977"
```

应用：附近的人

## georadiusbymember

找出位于指定元素周围的其他元素

**语法**：

```shell
georadiusbymember key member radius M|KM|FT|MI [withcoord] [withdist] [COUNT count [ANY]] [ASC|DESC] [STORE key] [STOREDIST key]
```

```shell
127.0.0.1:6379> GEORADIUSBYMEMBER china:city beijing 1000 km
1) "beijing"
2) "xian"
127.0.0.1:6379> GEORADIUSBYMEMBER china:city shanghai 400 km
1) "hangzhou"
2) "shanghai"
```

## geohash

返回一个或多个位置元素 11 个字符的 Geohash 字符串

**语法**:

```shell
geohash key member[member.....]
```

```shell
# 将二维的经纬度转为一维的字符串，如果两个字符串越接近，那么则距离越近
127.0.0.1:6379> GEOHASH china:city beijing chongqing
1) "wx4fbxxfke0"
2) "wm5xzrybty0"
```

## 底层原理

+ geo 的底层实现原理就是 Zset 

+ 可以使用 Zset 命令操作 geo

```shell
127.0.0.1:6379> zrange china:city 0 -1
1) "chongqing"
2) "xian"
3) "shenzhen"
4) "hangzhou"
5) "shanghai"
6) "beijing"
127.0.0.1:6379> zrem china:city beijing
(integer) 1
127.0.0.1:6379> zrange china:city 0 -1
1) "chongqing"
2) "xian"
3) "shenzhen"
4) "hangzhou"
5) "shanghai"

```

::: warning 应用
+ 朋友的定位
+ 附近的人
+ 打车的距离

:::



## 参考文档

[官方文档](https://www.redis.net.cn/order/3685.html)

（完）