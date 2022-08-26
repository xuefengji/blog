# Hyperloglog 基数统计

+ Redis 2.8.9 版本就更新了 Hyperloglog 数据结构
+ Redis Hyperloglog 基数统计的算法
+ 底层使用 String 数据类型

## 什么是基数

数据集中不重复的元素的个数

比如：{1, 3, 5, 7, 5, 7, 8}

那这个数据集的基数就是 5

## 命令

### pfadd/pfcount/pfmerge

pfadd：添加指定元素到 HyperLogLog 中

pfcount：统计指定元素的基数数量

pfmerge：合并 2 组 HyperLogLog 中的元素，取并集

**语法**：

```shell
pfadd key element [element......]
pfcount key [key.....]
pfmerge destkey sourcekey [sourcekey.....]
```

```shell
127.0.0.1:6379> pfadd mykey a b c d e f j  # 创建第一组元素 mykey
(integer) 1
127.0.0.1:6379> pfcount mykey     # 统计 mykey 元素的基数数量
(integer) 7
127.0.0.1:6379> pfadd mykey2 i j a z c x b     # 创建第二组元素 mykey2
(integer) 1
127.0.0.1:6379> pfcount mykey2
(integer) 7
127.0.0.1:6379> pfmerge mykey3 mykey mykey2   # 合并 mykey 和 mykey2 =》mykey3
OK
127.0.0.1:6379> pfcount mykey3   # 查看并集的基数数量
(integer) 10
```

## 应用场景

网页的访问量（UV）：一个用户多次访问，也只能算作一个人

传统方式：

+ 存储用户的id,然后每次进行比较
+ 当用户变多之后这种方式及其浪费空间，而我们的目的只是**计数**

+ Hyperloglog 就能帮助我们利用最小的空间完成

**Hyperloglog 优点**：

+ 占用的内存是固定的

+  2^64 个不同元素的基数，只需要 12 KB 内存
+  HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身

**Hyperloglog 缺点**：

+ 会有 0.81% 的错误率

+ 如果允许容错，那么一定可以使用 Hyperloglog 

+ 如果不允许容错，就使用 Set 或者自己的数据类型即可 



## 参考文档

[官方文档](https://www.redis.net.cn/tutorial/3513.html)

（完）