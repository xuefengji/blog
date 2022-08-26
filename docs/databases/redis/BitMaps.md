# BitMap 位图

+ 使用位存储，信息状态只有 0 和 1
+ BitMap是一串连续的 2 进制数字（0或1），每一位所在的位置为偏移(offset)
+ 在 BitMap上可执行 AND、OR、XOR、NOT 以及其它位操作

## setbit/getbit

setbit：为指定 key 的 offset 位设置值

getbit：获取 offset 位的值

**语法**：

```shell
setbit key offset value
getbit key offset
```

```shell
127.0.0.1:6379> setbit sign 0 1
(integer) 0
127.0.0.1:6379> setbit sign 1 0
(integer) 0
127.0.0.1:6379> setbit sign 2 0
(integer) 0
127.0.0.1:6379> setbit sign 3 1 
(integer) 0
127.0.0.1:6379> setbit sign 4 1
(integer) 0
127.0.0.1:6379> setbit sign 5 0
(integer) 0
127.0.0.1:6379> setbit sign 6 0
(integer) 0
127.0.0.1:6379> getbit sign 3
(integer) 1
127.0.0.1:6379> getbit sign 6
(integer) 0

```

## bitcount

统计字符串被设置为 1 的 bit 数，也可以指定统计范围按字节

**语法**：

```shell
bitcount key start end [BYTE|BIT]
```

```shell
127.0.0.1:6379> bitcount sign   # 统计打卡数
(integer) 3
```

::: warning 应用场景

+ 签到统计
+ 登录状态统计
+ 用户活跃度

:::

（完）