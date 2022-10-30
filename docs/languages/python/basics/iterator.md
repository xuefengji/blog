# 迭代器

**迭代：**通过 for 循环遍历对象的每一个元素的过程

**判断对象是否可迭代：**通过 collections 模块中的 iterable 

```
>>> from collections import Iterable
>>> isinstance('abc', Iterable)         # str是否可迭代
True
>>> isinstance([1,2,3], Iterable)       # list是否可迭代
True
>>> isinstance(123, Iterable)           # 整数是否可迭代
False
```

**迭代器：**

​	**定义：**一种可被遍历的对象，并且能作用于 next() 函数

​	**特点：**从集合的第一个元素开始访问，只能往后遍历不能回溯

​	**基本方法：**

+ iter()
+ next()

```
>>> lis=[1,2,3,4]
>>> it = iter(lis)     # 使用Python内置的iter()方法创建迭代器对象
>>> next(it)           # 使用next()方法获取迭代器的下一个元素
1
>>> next(it)
2
>>> next(it)
3
>>> next(it)
4
>>> next(it)            # 当后面没有元素可以next的时候，弹出错误
Traceback (most recent call last):
  File "<pyshell#6>", line 1, in <module>
    next(it)
StopIteration
```

类实现成为迭代器：实现 `__iter__()` 和 `__next__()` 方法 

**迭代器(Iterator)和可迭代(Iterable)的区别**：

- 凡是可作用于 for 循环的对象都是可迭代类型；
- 凡是可作用于 next() 函数的对象都是迭代器类型；
- list、dict、str 等是可迭代的但不是迭代器，因为 next() 函数无法调用它们，可通过 iter() 函数将它们转换成迭代器。
- Python的 for 循环本质上就是通过不断调用 next() 函数实现的

**总结：**

+  表示的是一个元素流，可以被 next() 函数调用并不断返回下一个元素 
+ 通过 next() 取值，节省内存和空间 

（完）