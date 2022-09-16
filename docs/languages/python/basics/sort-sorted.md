

# sort 与 sorted

## sort

`sort()` 是 Python 中列表的方法

**语法**：

```python
list.sort(key=None, reverse=False)
```

| 参数    | 描述                                                |
| ------- | --------------------------------------------------- |
| key     | 按指定值进行排序                                    |
| reverse | 排序方式：<br />Ture：倒序<br />False（默认）：升序 |

```python
a = [1, 6, 8, 11, 9, 1, 8, 6, 8, 7, 8]
b = a.sort(reverse=False)
print(a)
print(b)

结果：
[1, 1, 6, 6, 7, 8, 8, 8, 8, 9, 11]
None
```

从上面的结果中发现：

+ 原列表 a 发生了变化
+ `a.sort(reverse=False)`无返回值

## sorted

`sorted()` 是 Python 的内置函数

**语法**：

```python
sorted(iterable=None, key=None, reverse=False)
```

| 参数     | 描述                                                |
| -------- | --------------------------------------------------- |
| iterable | 需要排序的可迭代对象                                |
| key      | 按指定值进行排序                                    |
| reverse  | 排序方式：<br />Ture：倒序<br />False（默认）：升序 |

```python
a = [1, 6, 8, 11, 9, 1, 8, 6, 8, 7, 8]
b = sorted(a)
print(a)
print(b)

结果：
[1, 6, 8, 11, 9, 1, 8, 6, 8, 7, 8]
[1, 1, 6, 6, 7, 8, 8, 8, 8, 9, 11]
```

从上面的结果中发现：

+ 原列表 a 没有发生变化
+ `sorted(a)`返回一个新列表

::: 总结

+ `sort()` 无返回值，会直接修改原列表
+ `sorted()` 会返回一个新的列表

:::

（完）