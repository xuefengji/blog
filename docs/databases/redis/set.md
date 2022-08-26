# Set 类型

Set 是无序不重复集合

## sadd

添加元素

**语法**：

```shell
sadd key member[member.....]
```

```shell
127.0.0.1:6379> sadd myset "hello"     # set 中添加元素
(integer) 1
127.0.0.1:6379> sadd myset "redis"
(integer) 1
127.0.0.1:6379> smembers myset        # 查看指定 set 的所有值
1) "hello"
2) "redis"
127.0.0.1:6379> sismember myset hello    # 判断某一个是不是在 set 中存在
(integer) 1
127.0.0.1:6379> sismember myset other
(integer) 0
```

## scard

获取当前 Set 中的元素个数

**语法**：

```shell
scard key
```

```shell
127.0.0.1:6379> scard myset
(integer) 2
```

## srem

移除 Set 中的某一个值

**语法**：

```shell
srem key member[member....]
```

```shell
127.0.0.1:6379> srem myset hello   # 移除 set 集合中的指定元素
(integer) 1
127.0.0.1:6379> scard myset
(integer) 1
127.0.0.1:6379> smembers myset
1) "redis"
```

## srandmember 

随机获取 Set 中的元素

**语法**:

```shell
srandmember key [count]
```

```shell
127.0.0.1:6379> sadd myset value1 value2 value3
(integer) 3
127.0.0.1:6379> SRANDMEMBER myset      # 随机抽选一个元素
"redis"
127.0.0.1:6379> SRANDMEMBER myset 
"world"
127.0.0.1:6379> SRANDMEMBER myset 2    # 随机抽选指定个数的元素
1) "value2"
2) "redis"
```

## spop

删除随机的元素

**语法**:

```shell
spop key
```

```shell
127.0.0.1:6379> spop myset     # 随机删除一个元素
"redis"
127.0.0.1:6379> spop myset
"value2"
127.0.0.1:6379> smembers myset
1) "value3"
2) "world"
3) "value1"
```

## smove

将一个指定的值移动到另外一个 Set 集合中

**语法**:

```shell
smove source destination member
```

```shell
127.0.0.1:6379> sadd myset hello world redis other
(integer) 4
127.0.0.1:6379> sadd myset1 set1
(integer) 1
127.0.0.1:6379> smove myset myset1 redis
(integer) 1
127.0.0.1:6379> smembers myset
1) "hello"
2) "world"
3) "other"
127.0.0.1:6379> smembers myset1
1) "set1"
2) "redis"

```

## sdiff/sinter/sunion

查看两个 Set 的 差集、交集、并集

应用：微博等共同关注（并集）

**语法**：

```shell
sdiff key[key....]
sinter key[key....] 
sunion key[key....]
```

```shell
127.0.0.1:6379> sadd key1 a b c
(integer) 3
127.0.0.1:6379> sadd key2 c d e
(integer) 3
127.0.0.1:6379> sdiff key1 key2      # 查看差集
1) "b"
2) "a"
127.0.0.1:6379> sinter key1 key2     # 查看交集
1) "c"
127.0.0.1:6379> sunion key1 key2     # 查看并集
1) "b"
2) "a"
3) "c"
4) "e"
5) "d"
```

（完）