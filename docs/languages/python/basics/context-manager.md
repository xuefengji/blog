# Context Manager 上下文管理器

## 什么是上下文管理器

简单一句话：

同时包含 `__enter__()` 和`__exit__()` 方法的对象就是上下文管理器

### `__enter__()`

- 进入上下文管理器自动调用的方法
- 该方法会在 `with ... as ...` 代码块执行之前执行
- 如果 with 语句有 as 子句，且该方法有返回值，那么该方法的返回值会被赋值给 as 子句后的变量，最常见的 `with open('file_path', 'w') as file: `
- 如果 with 语句没有 as 子句，上下文管理器的`__enter__`方法还是正常执行，只是这个返回值并没有赋给一个变量，with 下面的代码块也不能使用这个返回值
- 该方法可以返回多个值，因此在 as 子句后面也可以指定多个变量（多个变量必须由“()”括起来组成元组）

### `__enter__(exc_type, exc_value, exc_traceback)`

- 退出上下文管理器自动调用的方法，会返回一个布尔类型的值
- 该方法会在 `with ... as ... `代码块执行之后执行
- 如果` with ... as ... `代码块成功执行结束，程序自动调用该方法，且三个参数都为 None
- 如果 `with ... as ...` 代码块执行时发生异常，通过 `sys.exc_info()` 得到异常信息，三个参数值分别是：异常类型、异常信息、异常回溯信息类型（type(e)，str(e)，`e.__traceback__`）

## 为什么要使用上下文管理器

日常场景中，在操作了一些资源，比如文件、数据库连接等，操作完成后不管成功与否，最重要的就是**关闭资源**，通常我们的代码会这么写：

```python
f = open('file.txt', 'w')
try:
    f.write("Hello")
finally:
    f.close()
```

但 `close()`是必须要操作的，就没必要显示地调用，Python 提供了一种更优雅的方式，使用 with 语句：

```python
with open('file.txt', 'w') as f:
    f.write("Hello")
```

在退出 with 语句下的代码块之后，f  对象会自动执行自己的 close 方法，实现资源的释放，简洁优雅

**执行顺序**：

+ 先执行 open() 的 `__enter__()` 方法，将返回值赋值给 f
+ 执行 `f.write("hello") `
+ 最后执行 open() 的 `__exit__()`方法

### 上下文管理器原理

```python
with EXPR as VAR:
    BLOCK
```

上述代码执行过程等价于：

```python
ContextManager = EXPR
VAR = ContextManager.__enter__()
try:
    BLOCK
finally:
    ContextManager.__exit__()
```

f  对象就是把自己的 close 方法定义在了它的 `__exit__` 方法内部，实现了代码块执行完之后自动关闭自身

## 自定义上下文管理器

>基于类实现

只需要给对象添加一个 `__enter__` 和一个 `__exit__` 方法

```python
import sys

class Resource:
    def __init__(self, name):
        self.name = name
        print("== 初始化方法 ==")

    def __enter__(self):
        print(f"进入上下文管理器自动调用：name is {self.name}")
        # 可以返回任意类型的值
        return {"name": self.name}

    def __exit__(self, exc_type=None, exc_val=None, exc_tb=None):
        print(f"退出上下文管理器自动调用：", sys.exc_info(), exc_type, exc_val, exc_tb)
        if exc_tb is None:
            print("没有异常时关闭资源")
        else:
            print("遇到异常时关闭资源")
```

通过 with...as 调用上下文管理器（也称为：使用 with ... as ... 管理资源）

```python
with Resource("TEST") as f:
    print(f)
```

结果：

```python
== 初始化方法 ==
进入上下文管理器自动调用：name is TEST
{'name': 'TEST'}
退出上下文管理器自动调用： (None, None, None) None None None
没有异常时关闭资源
```

无异常时，`__exit__` 中的三个值都是 None

with 有异常时：

```python
with Resource("异常小菠萝") as r:
    print('[with代码块] 异常之前的代码')
    raise Exception("抛出了 Exception")
    print('[with代码块] ~~~~~~~~异常之后的代码')
```

结果：

```python
== 初始化方法 ==
进入上下文管理器自动调用：name is 异常TEST
[with代码块] 异常之前的代码
退出上下文管理器自动调用： (<class 'Exception'>, Exception('抛出了 Exception'), <traceback object at 0x00000215E3F57140>) <class 'Exception'> 抛出了 Exception <traceback object at 0x00000215E3F57140>
遇到异常时关闭资源
Traceback (most recent call last):
  File "G:\test\test_one.py", line 206, in <module>
    raise Exception("抛出了 Exception")
Exception: 抛出了 Exception
```

代码块抛出异常的时候，可以看到 `__exit__()`方法的三个参数值的确来源于 `sys.exc_info()` 

**`__exit()__` 返回 True**：

```python
import sys

class Resource:
    def __init__(self, name):
        self.name = name
        print("== 初始化方法 ==")

    def __enter__(self):
        print(f"进入上下文管理器自动调用：name is {self.name}")
        # 可以返回任意类型的值
        return {"name": self.name}

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"退出上下文管理器自动调用：", sys.exc_info(), exc_type, exc_val, exc_tb)
        if exc_tb is None:
            print("没有异常时关闭资源")
        else:
            print("遇到异常时关闭资源")
            return True

    # 再次运行
with Resource("异常TEST") as r:
    print('[with代码块] 抛出异常之前的代码')
    raise Exception
    print('[with代码块] 抛出异常之后的代码')
```

结果：

```python
== 初始化方法 ==
进入上下文管理器自动调用：name is 异常TEST
[with代码块] 抛出异常之前的代码
退出上下文管理器自动调用： (<class 'Exception'>, Exception(), <traceback object at 0x0000011A654B7180>) <class 'Exception'>  <traceback object at 0x0000011A654B7180>
遇到异常时关闭资源
```

没有抛出异常

::: tip 小结

- 无论 with 代码块是否有异常，最终都会自动调用 `__exit__()` 方法
- 当抛出异常时，`__exit__() `默认返回 None，会重新抛出异常到外面，让` with ... as ... `以外的代码来处理异常
- 反之，如果返回 True，就会忽略异常，不再对异常进行处理

:::

> 基于生成器实现

+ 通过装饰器 `contextlib.contextmanager`，来定义自己所需的基于生成器的上下文管理器
+ 该装饰器将生成器中的代码通过 yield 语句分成两部分，yield 之前的代码为`__enter__`方法，yield 之后的代码为`__exit__`方法
+ yield 的返回值即`__enter__`方法的返回值，用于赋给 as 后的变量

```python
from contextlib import contextmanager

@contextmanager
def open_file(filename, mode):
    print('进入')
    f = open(filename, mode)
    try:
        yield f
    finally:
        print('退出')
        f.close()
        
        
with open_file('file.txt', 'w') as f:
    print("正在写入...")
    f.write('Hello')
```

这里使用 `try/finally` 是确保 yield 的过程中就算出现异常，文件也能正常关闭，当然这里也能处理异常，使用 `try/except/finally` 即可

::: tip 小结

- 基于生成器的上下文管理器时，不再用定义 `__enter__()` 和 `__exit__()` 方法
- 但需要加上装饰器 @contextmanager

:::

## 参考资料

[Context Managers](https://realpython.com/python-with-statement/)



（完）