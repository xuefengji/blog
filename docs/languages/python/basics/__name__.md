# `__name__ =__main__` 

先来看个例子：

`test_one.py`：

```python
PI = 3.14

def main():
    print "PI:", PI

main()
```

`test_two.py`：从 `test_one.py` 中引入 PI

```python
from const import PI

def calc_round_area(radius):
    return PI * (radius ** 2)

def main():
    print "round area: ", calc_round_area(2)

main()
```

运行 `test_two.py`：

```python
PI: 3.14
round area:  12.56
```

发现 `test_one.py` 中的函数被执行了，这是为什么呢？

**原因**：

Python 是从上至下，边解释边执行，在模块被导入时，会将模块中的代码先执行

那如果希望被引入的模块中的函数不执行，可以使用`if __name__=='__main__'`

修改下 `test_one.py` 中的代码：

```python
PI = 3.14

def main():
    print "PI:", PI

if __name__ == "__main__":
    main()
```

再次执行 `test_two.py` 时，就不会执行 `test_one.py` 中的函数了：

```python
PI: 3.14
```

## `__name__`

+ 是内置变量
+ 表示当前模块的名字

**`if __name__ == '__main__'` 的作用**：

+ 如果作为脚本直接运行，`if __name__ == '__main__'` 前后的代码都会被执行
+ 如果作为模块被调用，`if __name__ == '__main__'` 前的代码都会被执行

::: tip 运行原理

+ 每个 Python 文件都会包含内置的变量 `__name__`
+ 当该模块直接执行时，`__name__ == '__main__'`
+ 如果作为模块被引入到其他模块，`__name__ == 模块名称`（不包含后缀`.py`）
+ `__main__`始终指当前执行模块的名称（包含后缀`.py`）

:::

（完）