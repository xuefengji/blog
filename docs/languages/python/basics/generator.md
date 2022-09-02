# 生成器

**特点：**

+  在循环的过程中不断推算出后续的元素， 不必创建完整的元素集合 
+ 节省大量空间

```
>>> g = (x * x for x in range(1, 4))
>>> g
<generator object <genexpr> at 0x1022ef630>
```

通过 next() 获取下一个返回值，无值可取时抛出异常：

```
>>> next(g)
1
>>> next(g)
4
>>> next(g)
9
>>> next(g)
Traceback (most recent call last):
  File "<pyshell#14>", line 1, in <module>
    next(g)
StopIteration
```

**获取生成器值得方法：**

+ for 循环取值

```
for i in g:
    print(i)
```

+ 使用 yield 关键字
  + 使用 yield 返回得函数会变成一个生成器
  + 调用生成器的过程中，每次遇到yield时函数会暂停并保存当前所有的运行信息，返回yield的值
  +  在下一次执行 next() 方法时从当前位置继续运行 

```
def fibonacci(n):    
    a, b, counter = 0, 1, 0
    while True:
        if counter > n:
            return
        yield a             # yield让该函数变成一个生成器
        a, b = b, a + b
        counter += 1

fib = fibonacci(10)           # fib是一个生成器
print(type(fib))
for i in fib:
    print(i, end=" ")
```

（完）	

​	  