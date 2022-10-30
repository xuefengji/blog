# list 类型

+ 基本的数据类型
+ list 可应用在栈、队列、阻塞队列中
+ 所有的 list 命令都是以 l 开头的

## lpush/rpush

为 list 添加值

**语法**：

```shell
lpush key value[value,value....]
rpush key value[value,value....]
```

```shell
127.0.0.1:6379> lpush list one   # 将一个值或多个值，插入列表的头部（左边）
(integer) 1
127.0.0.1:6379> lpush list teo
(integer) 2
127.0.0.1:6379> lpush list three
(integer) 3
127.0.0.1:6379> lrange list 0 -1   # 获取 list 中的所有值
1) "three"
2) "teo"
3) "one"
127.0.0.1:6379> lrange list 0 1     # 通过区间获取具体的值
1) "three"
2) "teo"
127.0.0.1:6379> rpush list right   # 将一个值或多个值，插入列表的尾部（右边）
(integer) 4
127.0.0.1:6379> lrange list 0 -1
1) "three"
2) "teo"
3) "one"
4) "right"
```

::: tip 注意

+ lpush 方式插入的值获取时最后插入的先显示
+ rpush 方式插入的值获取时最后插入的后显示

:::

## lpop/rpop 

移除 list 中的值

**语法**：

```shell
lpop key [count]
rpop key [count]
```

```shell
127.0.0.1:6379> lrange list 0 -1
1) "three"
2) "teo"
3) "one"
4) "right"
127.0.0.1:6379> lpop list      # 移除列表的第一个元素
"three"
127.0.0.1:6379> rpop list     # 移除列表的最后一个元素
"right"
127.0.0.1:6379> lrange list 0 -1
1) "teo"
2) "one"

```

## lindex

根据下标获取值

**语法**：

```shell
lindex key index
```

```shell
127.0.0.1:6379> lrange list 0 -1
1) "teo"
2) "one"
127.0.0.1:6379> lindex list 1     # 通过下标获得某一个值
"one"
127.0.0.1:6379> lindex list 0
"teo"
127.0.0.1:6379> 

```

## llen

获取列表长度

**语法**:

```shell
llen key
```

```shell
127.0.0.1:6379> lpush list one
(integer) 1
127.0.0.1:6379> lpush list two three
(integer) 3
127.0.0.1:6379> lrange list 0 -1
1) "three"
2) "two"
3) "one"
127.0.0.1:6379> llen list     # 返回列表长度
(integer) 3
```

## lrem

移除指定值

**语法**：

```shell
lrem key count value
```

```shell
127.0.0.1:6379> lpush list one two three three one
(integer) 5
127.0.0.1:6379> lrange list 0 -1
1) "one"
2) "three"
3) "three"
4) "two"
5) "one"
127.0.0.1:6379> lrem list 1 one  # 移除 list 集合中指定个数的 value，精确匹配
(integer) 1
127.0.0.1:6379> lrange list 0 -1
1) "three"
2) "three"
3) "two"
4) "one"
127.0.0.1:6379> lrem list 2 three
(integer) 2
127.0.0.1:6379> lrange list 0 -1
1) "two"
2) "one"
```

## ltrim

截取 list

**语法**：

```shell
ltrim key start stop
```

```shell
127.0.0.1:6379> rpush mylist "hello"
(integer) 1
127.0.0.1:6379> rpush mylist "hell1" "hello2" "hello3"
(integer) 4
127.0.0.1:6379> lrange mylist 0 -1
1) "hello"
2) "hell1"
3) "hello2"
4) "hello3"
127.0.0.1:6379> ltrim mylist 1 2   # 通过下标截取指定的长度
OK
127.0.0.1:6379> lrange mylist 0 -1
1) "hell1"
2) "hello2"
```

::: warning 注意

使用 ltrim 截取时，会改变 list 中的值，只剩下截取的元素了

:::

## rpoplpush

移除列表的最后一个元素，将他移动到新的列表中

**语法**:

```shell
rpoplpush source destination
```

```shell
127.0.0.1:6379> rpush mylist "hello" "hello1" "hello2"
(integer) 3
127.0.0.1:6379> rpoplpush mylist otherlist #移除列表的最后一个元素，将他移动到新的列表中
"hello2"
127.0.0.1:6379> lrange mylist 0 -1  # 查看原来的列表
1) "hello"
2) "hello1"
127.0.0.1:6379> lrange otherlist 0 -1    # 查看目标列表中确实存在数值
1) "hello2"
```

## lset

将列表中指定下标的值替换为另一个值

**语法**:

```shell
lset key index value
```

```shell
127.0.0.1:6379> exists list    # 判断列表是否存在
(integer) 0
127.0.0.1:6379> lpush list value1
(integer) 1
127.0.0.1:6379> lrange list 0 0
1) "value1"
127.0.0.1:6379> lset list 0 items     # 如果 list 存在则更新下标的值，不存在则报错
OK
127.0.0.1:6379> lrange list 0 0
1) "items"
127.0.0.1:6379> lset list 1 other      # 如果 list 的下标不存在则报错
(error) ERR index out of range

```

## linsert

将某个具体的值插入到列表中某个元素的前面或后面

**语法**:

```shell
LINSERT key BEFORE|AFTER pivot value
```

```shell
127.0.0.1:6379> rpush mylist "hello" "world"
(integer) 2
127.0.0.1:6379> linsert mylist before "world" "other"   # 在 world 前插入
(integer) 3
127.0.0.1:6379> lrange mylist 0 -1
1) "hello"
2) "other"
3) "world"
127.0.0.1:6379> linsert mylist after "world" "other1"   # 在 world 后插入
(integer) 4
127.0.0.1:6379> lrange mylist 0 -1
1) "hello"
2) "other"
3) "world"
4) "other1"
```

::: tip 总结

- list实际上是一个链表，before Node after，left，right 都可以插入值
- **如果 key 不存在，则创建新的链表**
- 如果 key 存在，新增内容
- 如果移除了所有值，空链表，也代表不存在
- 在两边插入或者改动值，效率最高！修改中间元素，效率相对较低

:::

（完）