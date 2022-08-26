# Zset 类型

+ 有序集合
+ 在 Set 的基础上增加了一个值



## zadd

添加有序的成员

**语法**:

```shell
zadd key score member[score menber....]
```

```shell
127.0.0.1:6379> zadd myset 1 one 2 two
(integer) 2
127.0.0.1:6379> zget myset
(error) ERR unknown command 'zget', with args beginning with: 'myset' 
127.0.0.1:6379> zrange myset 0 -1
1) "one"
2) "two"
```

## zrangebyscore/zrevrange

zrangebyscore：根据 score 进行升序

zrevrange：降序

**语法**：

```shell
zrangebyscore key min max [withscores] [limit offest count]
zrevrange key start stop [withscores]
```

```shell
127.0.0.1:6379> zadd salary 2500 xiaohong 5000 zhangsan 500 lisi 
(integer) 3
127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf     # 显示全部的用户按从小到大排序
1) "lisi"
2) "xiaohong"
3) "zhangsan"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf withscores # 显示全部的用户按从小到大排序并且附带成绩
1) "lisi"
2) "500"
3) "xiaohong"
4) "2500"
5) "zhangsan"
6) "5000"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf 2500 withscores   # 显示小于2500 的升序排列
1) "lisi"
2) "500"
3) "xiaohong"
4) "2500"
127.0.0.1:6379> ZREVRANGE salary 0 -1      # 按从大到小降序
1) "zhangsan"
2) "lisi"
```

## zrem/zcard

移除元素/查看元素个数

**语法**:

```shell
zrem key member[member....]
zcard key
```

```shell
127.0.0.1:6379> zrange salary 0 -1
1) "lisi"
2) "xiaohong"
3) "zhangsan"
127.0.0.1:6379> zrem salary xiaohong      # 移除有序集合中的指定元素
(integer) 1
127.0.0.1:6379> zrange salary 0 -1
1) "lisi"
2) "zhangsan"
127.0.0.1:6379> zcard salary       # 获取有序集合中的元素个数
(integer) 2

```

## zcount

获取指定区间的元素个数

**语法**：

```shell
zcount key min max
```

```shell
127.0.0.1:6379> zadd myset 1 hello 2 world 3 redis
(integer) 3
127.0.0.1:6379> zcount myset 1 2    # 获取指定区间的元素个数
(integer) 2
127.0.0.1:6379> zcount myset 1 3
(integer) 3
```



::: tip 应用案例：

- Set 排序存储班级成绩表，工资表排序
- 普通消息，1 代表重要消息 ，2 代表带权重进行判断
- 排行榜应用实现，取 Top N 测试

:::

（完）