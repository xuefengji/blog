# 基本命令

## 操作数据库

+ Redis 默认有 16 个数据库，为 DB 0~DB 15，可以通过 conf 文件查看
+ 默认使用第 0 个

```
# Set the number of databases. The default database is DB 0, you can select
# a different one on a per-connection basis using SELECT <dbid> where
# dbid is a number between 0 and 'databases'-1
databases 16
```

### 切换数据库

**语法**:

```shell
select n
```

```shell
127.0.0.1:6379> select 2
OK
```

### 查看数据库大小

数据库大小与 key 的数量有关

**语法**:

```shell
dbsize
```

```shell
127.0.0.1:6379[2]> DBSIZE
(integer) 0
```

## 键值操作

::: tip 注意

不同数据库之间数据是不能互通的

:::

```shell
127.0.0.1:6379[2]> set name redis   # 设置键 name
OK
127.0.0.1:6379[2]> keys *			# 查看所有键值
1) "name"
127.0.0.1:6379[2]> DBSIZE           # 查看数据库大小
(integer) 1
127.0.0.1:6379[2]> flushdb         # 清除当前数据库数据
OK
127.0.0.1:6379[2]> get name
(nil)
127.0.0.1:6379[2]> select 0
OK
127.0.0.1:6379> set name 123
OK
127.0.0.1:6379> flushall         # 清除所有数据库数据
OK
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> 
```

+ exists key：判断键是否存在
+ del key：删除键值对
+ move key db：将键值对移动到指定数据库
+ expire key second：设置键值对的过期时间
+ type key：查看 value 的数据类型

```shell
127.0.0.1:6379> keys * # 查看当前数据库所有key
(empty list or set)
127.0.0.1:6379> set name qinjiang # set key
OK
127.0.0.1:6379> set age 20
OK
127.0.0.1:6379> keys *
1) "age"
2) "name"
127.0.0.1:6379> move age 1 # 将键值对移动到指定数据库
(integer) 1
127.0.0.1:6379> EXISTS age # 判断键是否存在
(integer) 0 # 不存在
127.0.0.1:6379> EXISTS name
(integer) 1 # 存在
127.0.0.1:6379> SELECT 1
OK
127.0.0.1:6379[1]> keys *
1) "age"
127.0.0.1:6379[1]> del age # 删除键值对
(integer) 1 # 删除个数


127.0.0.1:6379> set age 20
OK
127.0.0.1:6379> EXPIRE age 15 # 设置键值对的过期时间

(integer) 1 # 设置成功 开始计数
127.0.0.1:6379> ttl age # 查看key的过期剩余时间
(integer) 13
127.0.0.1:6379> ttl age
(integer) 11
127.0.0.1:6379> ttl age
(integer) 9
127.0.0.1:6379> ttl age
(integer) -2 # -2 表示key过期，-1表示key未设置过期时间

127.0.0.1:6379> get age # 过期的key 会被自动delete
(nil)
127.0.0.1:6379> keys *
1) "name"

127.0.0.1:6379> type name # 查看value的数据类型
string

```

**关于 TTL 命令**: 

Redis 的 key，通过 TTL 命令返回 key 的过期时间，一般来说有3种：

+ 当前 key 没有设置过期时间，所以会返回 -1
+ 当前 key 有设置过期时间，而且 key 已经过期，所以会返回 -2
+ 当前 key 有设置过期时间，且 key 还没有过期，故会返回 key 的正常剩余时间
+ 关于重命名 RENAME 和 RENAMENX

RENAME key newkey 修改 key 的名称
RENAMENX key newkey 仅当 newkey 不存在时，将 key 改名为 newkey 

## 参考文档

[命令](https://www.redis.net.cn/order/)

（完）