# String 类型

## append

**语法**：
```shell
append key value
```
```shell
127.0.0.1:6379> set key1 v1
OK
127.0.0.1:6379> APPEND key1 "hello"
(integer) 7
127.0.0.1:6379> get key1
"v1hello"
127.0.0.1:6379> 
```
::: tip 注意
如果 append 的键不存在，会新建值然后赋值
:::

## strlen

**语法**：
```shell
STRLEN key 
```
```shell
127.0.0.1:6379> STRLEN key1
(integer) 7
127.0.0.1:6379> 
```

## incr/decr

**语法**：
```shell
incr key
decr key
incrby key value
decrby key value
```
```shell
127.0.0.1:6379> set views 0
OK
127.0.0.1:6379> incr views   # 自增1 
(integer) 1
127.0.0.1:6379> incr views
(integer) 2
127.0.0.1:6379> decr views  # 自减1
(integer) 1
127.0.0.1:6379> decr views
(integer) 0
127.0.0.1:6379> incrby views 10   # 按步长自增
(integer) 10
127.0.0.1:6379> incrby views 10
(integer) 20
127.0.0.1:6379> decrby views 5    # 按步长自减
(integer) 15
127.0.0.1:6379> 
```

## getrange/setrange

**语法**：
```shell
getrange key start end
```
```shell
127.0.0.1:6379> set key1 "hello,redis"
OK
127.0.0.1:6379> get key1
"hello,redis"
127.0.0.1:6379> getrange key1 0 3   # 截取字符串 [0,3]
"hell"
127.0.0.1:6379> getrange key1 0 -1  # 截取全部字符串
"hello,redis"
127.0.0.1:6379> set key2 abcdefg   
OK
127.0.0.1:6379> get key2
"abcdefg"
127.0.0.1:6379> setrange key2 1 xx   # 替换指定位置开始的字符串
(integer) 7 
127.0.0.1:6379> get key2
"axxdefg"
```

## setex/setnx

**语法**：
```shell
setex(set with expire) key seconds value               # 设置过期时间
setnx(set if not exist)  key value             # 不存在在设置(在分布式锁中会常常使用)
```
```shell
127.0.0.1:6379> setex key3 30 "hello"  # 设置 key3 的值 30 秒后过期
OK
127.0.0.1:6379> ttl key3
(integer) 24
127.0.0.1:6379> setnx mykey "redis"   #  如果 mykey 不存在，创建 mykey
(integer) 1
127.0.0.1:6379> keys *
1) "mykey"
2) "key1"
3) "key3"
4) "key2"
127.0.0.1:6379> ttl keys3
(integer) -2
127.0.0.1:6379> setnx mykey "mongodb"
OK
127.0.0.1:6379> get mykey
"mongodb"
127.0.0.1:6379> 
```

## 批量 set/get

**语法**：
```shell
MSET key1 value1 [key2 value2..]
MGET key1 [key2..]
```
```shell
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3  # 同时设置多个值
OK
127.0.0.1:6379> keys *
1) "k1"
2) "k3"
3) "k2"
127.0.0.1:6379> mget k1 k2 k3    # 同时获取多个值
1) "v1"
2) "v2"
3) "v3"
127.0.0.1:6379> msetnx k1 v1 k4 v4  # msetnx 是一个原子性操作，要么一起成功，要么一起失败
(integer) 0
127.0.0.1:6379> 
```

## 设置对象

**语法**：
```shell
set user:1 {name:zhangsan,age:3}  # 设置一个user:1 对象，值为 json 字符串来保存一个对象
```
```shell
127.0.0.1:6379> mset user:1:name  zhangsan 
OK
127.0.0.1:6379> mget user:1:name
1) "zhangsan"
127.0.0.1:6379> 
```
## getset

**语法**：
```shell
getset key value     # 先 get 在 set，返回key的上一个值
```

```shell
127.0.0.1:6379> getset db redis   # 不存在值，返回 nil
(nil)
127.0.0.1:6379> get db
"redis"
127.0.0.1:6379> getset db mongodb   # 存在值，则返回原来的值，并设置新的值
"redis"
127.0.0.1:6379> get db
"mongodb"
```

::: tip 总结
String 类型中的 value 除了是字符串还可以是数字，使用场景：
+ 计数器
+ 统计多单位的数量：uid:123666：follow 0
+ 粉丝数
+ 对象存储缓存
:::

（完）