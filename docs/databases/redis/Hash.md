# Hash 类型

## hset/hmset/hget/hmget/hgetall

添加和获取元素

**语法**：

```shell
hset key field value[field value,field value......]
hget key field value[field value,field value......]
hmset key field value[field value,field value......]
hmget key field [field,field....]
hgetall key 
```

```shell
127.0.0.1:6379> hset myhash field1 redis   # set 一个具体的 key-value
(integer) 1
127.0.0.1:6379> hget myhash field1                # 获取一个字段值
"redis"
127.0.0.1:6379> hmset myhash field1 hello field2 world  # 同时 set 多个具体的 key-value
OK
127.0.0.1:6379> hmget myhash field1 field2             # 获取多个字段值
1) "hello"
2) "world"
127.0.0.1:6379> hgetall myhash                             # 获取所有字段值
1) "field1"
2) "hello"
3) "field2"
4) "world"
```

## hdel

删除指定的字段

**语法**：

```shell
hdel key field[field,field.....]
```

```shell
127.0.0.1:6379> hdel myhash field1     # 删除指定的field字段，对应的 value 也被删除
(integer) 1
127.0.0.1:6379> hgetall myhash 
1) "field2"
2) "world"
```

## hlen

获取 Hash 表中的字段数量

**语法**：

```shell
hlen key
```

```shell
127.0.0.1:6379> hlen myhash
(integer) 1
127.0.0.1:6379> hmset myhash field1 hello field2 world
OK
127.0.0.1:6379> hlen myhash
(integer) 2
127.0.0.1:6379> hgetall myhash
1) "field2"
2) "world"
3) "field1"
4) "hello"
```

## hexists

判断 Hash 表中的字段是否存在

**语法**：

```shell
hexists key field
```

```shell
127.0.0.1:6379> HEXISTS myhash field1   # 判断 Hash 中指定字段是否存在
(integer) 1
127.0.0.1:6379> HEXISTS myhash field3
(integer) 0
```

## hkeys/hvals

只获得 key 或 value

**语法**:

```shell
hkeys key
hvals key
```

```shell
127.0.0.1:6379> hkeys myhash
1) "field2"
2) "field1"
127.0.0.1:6379> hvals myhash
1) "world"
2) "hello"
```

## hincrby

hincrby：按步长自增

**语法**：

```shell
hincrby key field increment
```

```shell
127.0.0.1:6379> hset myhash field3 6
(integer) 1
127.0.0.1:6379> hincrby myhash field3 1
(integer) 7
127.0.0.1:6379> hincrby myhash field3 -1
(integer) 6
```

## hsetnx

判断字段是否存在，不存在则添加

**语法**：

```shell
hsetnx key field value
```

```shell
127.0.0.1:6379> hsetnx myhsah field4 reids
(integer) 1
127.0.0.1:6379> hsetnx myhsah field4 mongodb
(integer) 0
```

::: tip 总结

+ Hash 存储变更的数据 user name age，尤其是用户信息之类的，经常变动的信息

+ **Hash 更适合于对象的存储，Sring 更加适合字符串存储**

:::

（完）