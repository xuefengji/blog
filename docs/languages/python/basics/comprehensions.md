# 推导式

## 列表推导式

 一种快速生成列表的方式 

```
lis = [x * x for x in range(1, 10)]

print(lis)
------------------------------------
结果：[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

**运行过程：**

+ 首先执行 for 循环，对每一个 x，代入 x*x 中进行运算 
+ 将运算结果逐一添加到一个新列表内，循环结束，得到最终列表 

相当于：

```
lis = []
for i in range(1, 10):
    lis.append(i*i)

print(lis)
```

**用法：**

+ 增加条件语句

  条件语句在最后面

  ```
  >>> [x * x for x in range(1, 11) if x % 2 == 0]
  [4, 16, 36, 64, 100]
  ```

+ 嵌套循环

  ```
  >>> [a + b for a in ‘123' for b in ‘abc']
  ['1a', '1b', '1c', '2a', '2b', '2c', '3a', '3b', '3c']
  ```

+ 更多语法

  ```
  >>> dic = {"k1":"v1","k2":"v2"}
  >>> a = [k+":"+v for k,v in dic.items()]
  >>> a
  ['k1:v1', 'k2:v2']
  ```

## 字典推导式

与列表推导式类似，使用 {} 生成

```
>>> dic = {x: x**2 for x in (2, 4, 6)}
>>> dic
{2: 4, 4: 16, 6: 36}
>>> type(dic)
<class 'dict'>
```

**注意：** `x: x**2`的写法，中间的冒号，表示左边的是key右边的是value 

## 集合推导式

同样使用 {} 生成

```
>> a = {x for x in 'abracadabra' if x not in 'abc'}
>>> a
{'d', 'r'}
>>> type(a)
<class 'set'>
```

**面试题：**

```
result = [lambda x: x + i for i in range(10)]
print(result[0](10))
```

你以为的：10

实际上的：19，且result`[0~9](10) `都是19

**原因：**

由于列表内返回的是匿名函数，即在循环结束后是：

```
result = [lambda x: x + i,lambda x: x + i.....]
```

使用 result`[0](10)` 调用时，此时需要找 i 的值，由于此时循环已完成，值为 9，所以值为 19

（完）