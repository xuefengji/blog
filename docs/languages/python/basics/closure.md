# 闭包

**定义：** 

在一个内部函数中，对外部作用域的变量进行引用，(并且一般外部函数的返回值为内部函数)，那么内部函数就被认为是闭包 

**闭包格式：**

```python
def 外层函数(参数):
    def 内层函数():
        print("内层函数执行", 参数)

    return 内层函数


内层函数的引用 = 外层函数("传入参数")
内层函数的引用()
```

 外层函数中的参数，不一定要有，据情况而定，但是一般情况下都会有并在内函数中使用到 

举个例子：

```python 
def add():
    a = 1
    def add_one(b):
         return a + b
    return add_one

add_one = add()
print(add_one(1))
```

上面的结果：2

**原理：**

+ 内函数中引用外函数的临时变量，此时会将该临时变量与内函数进行绑定，在内存中保留
+ 外函数结束了，但临时变量还在，可以被内函数引用

**内函数修改外函数的值**:使用 nonlocal 关键字

```python
def func(a, b):
    def line(x):
        nonlocal a
        a = 3
        return a * x - b

    return line


line = func(2, 3)
print(line(5))

```

结果为：12

**闭包的用途**:

​    Python 中主要用于装饰器

（完）