# 事务

## 什么是 Redis 事务

**事务的本质**：

+ Redis 事务的本质是一组命令的集合
+ 一个事务中的所有命令都会被序列化
+ 事务执行过程中，会按照顺序执行

**事务特性**：

+ 一次性
+ 顺序性
+ 排他性

::: warning 注意

+ Redis 单条命令是保证原子性的，但是事务不保证原子性
+ Redis 事务没有隔离级别的概念

:::

## Redis 事务操作过程

+ 开启事务（multi）
+ 命令入队
+ 执行事务（exec）

事务中的命令在加入时都没有被执行，直到提交时才会开始执行(exec)一次性完成

### 正常执行事务

```shell
127.0.0.1:6379> multi               # 开启事务
OK
127.0.0.1:6379(TX)> set k1 v1
QUEUED
127.0.0.1:6379(TX)> set k2 v2
QUEUED
127.0.0.1:6379(TX)> get k2
QUEUED
127.0.0.1:6379(TX)> set k3 v3
QUEUED
127.0.0.1:6379(TX)> exec                 # 执行事务
1) OK
2) OK
3) "v2"
4) OK
```

### 取消事务

```shell
127.0.0.1:6379> multi                    # 开启事务
OK
127.0.0.1:6379(TX)> set k1 v1
QUEUED
127.0.0.1:6379(TX)> set k2 v2
QUEUED
127.0.0.1:6379(TX)> set k4 v4
QUEUED
127.0.0.1:6379(TX)> discard            # 取消事务
OK
127.0.0.1:6379> get k4                # 事务队列中命令都不会被执行
(nil)
```

## 事务错误

### 命令语法错误(编译时异常)

事务中所有的命令都不会被执行

```shell
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> set k1 v1
QUEUED
127.0.0.1:6379(TX)> set k2 v2
QUEUED
127.0.0.1:6379(TX)> set k3 v3
QUEUED
127.0.0.1:6379(TX)> getset k3                # 错误的命令
(error) ERR wrong number of arguments for 'getset' command
127.0.0.1:6379(TX)> set k4 v4
QUEUED
127.0.0.1:6379(TX)> set k5 v5
QUEUED
127.0.0.1:6379(TX)> exec                # 执行事务报错
(error) EXECABORT Transaction discarded because of previous errors.
127.0.0.1:6379> get k5                      # 所有的命令都不会被执行
(nil)
```

### 命令执行时错误(运行时异常)

其他命令可以正常执行

这就是事务不保证原子性的原因

```shell
127.0.0.1:6379(TX)> set k1 "v1"
QUEUED
127.0.0.1:6379(TX)> multi
(error) ERR MULTI calls can not be nested
127.0.0.1:6379(TX)> incr k1                 # 会执行失败
QUEUED
127.0.0.1:6379(TX)> set k2 v2
QUEUED
127.0.0.1:6379(TX)> set k3 v3
QUEUED
127.0.0.1:6379(TX)> get k3
QUEUED
127.0.0.1:6379(TX)> exec
1) OK
2) OK
3) OK
4) OK
5) OK
6) (error) ERR value is not an integer or out of range    # 第一条命令执行报错，其他命令执行成功
7) OK
8) OK
9) "v3"
127.0.0.1:6379> get k2
"v2"
127.0.0.1:6379> get k3
"v3"
```

（完）