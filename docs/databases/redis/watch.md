# watch 监控

**悲观锁**：

很悲观，认为什么时候都会出现问题，无论做什么都会加锁

**乐观锁**：

- 很乐观，认为什么时候都不会出现问题，所以不会上锁
- 更新数据的时候去判断一下，在此期间是否有人修改过这个数据
- 获取 version
- 更新的时候比较 version

## watch

Redis 使用 `watch` 监控指定的数据，相当于乐观锁加锁

**语法**:

```shell
watch key[key....]
```

### 正常执行事务

```shell
127.0.0.1:6379> set money 100            # 设置余额 100
OK 
127.0.0.1:6379> set use 0               # 支出使用 0
OK
127.0.0.1:6379> watch money              # 监视 money（上锁）
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> decrby money 20
QUEUED
127.0.0.1:6379(TX)> incrby use 20
QUEUED
127.0.0.1:6379(TX)> exec                  # 监视值没有被中途修改，事务正常执行
1) (integer) 80
2) (integer) 20

```

### 修改监视值执行事务

启动两个客户端模拟插队线程

线程 1：

```shell
127.0.0.1:6379> watch money
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> decrby money 20
QUEUED
127.0.0.1:6379(TX)> incrby use 20
QUEUED
```

线程 2：

```shell
127.0.0.1:6379> set money 1000             # 设置 money 的值为 1000，改变了 money 的值
OK
```

回到线程 1 ，执行事务

```shell
127.0.0.1:6379(TX)> exec           # 监视的值 money 被改变，执行事务失败
(nil)
127.0.0.1:6379> get money         # money 的值被线程 2 修改了
"1000"
127.0.0.1:6379> get use
"20"
```

执行失败的事务，可以先使用 `unwatch` 解锁在操作

```shell
127.0.0.1:6379> unwatch               # 解锁
OK
127.0.0.1:6379> watch money          # 获取最新的值，再次监控
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> decrby money 1
QUEUED
127.0.0.1:6379(TX)> incrby use 1
QUEUED
127.0.0.1:6379(TX)> exec                # 对比监视的值是否发生变化，没有变化则执行成功
1) (integer) 999
2) (integer) 21
```

（完）