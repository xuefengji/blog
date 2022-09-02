# 单实例模式

## 什么是单实例模式

**概念**：
+ 一种常用的软件设计模式
+ 主要是确保一个类只有一个实例存在

例如：
```python
class A:
    pass

a1 = A()
a2 = A()
a3 = A()
print(id(a1))
print(id(a2))
print(id(a3))

结果：
2800308103648
2800308103456
2800308103552
```
上述代码中，实例化了 3次 A 这个对象，每个实例的地址不同，显然这不是单实例模式

## 为什么要使用单例模式

**举个例子**：

+ 某个服务器程序的配置信息存放在一个文件中，客户端通过一个 AppConfig 的类来读取配置文件的信息
+ 在程序运行期间，有很多地方都需要使用配置文件的内容，很多地方都需要创建 AppConfig 对象的实例，这就导致系统中存在多个 AppConfig 的实例对象，而这样会严重浪费内存资源，尤其是在配置文件内容很多的情况下
+ 类似 AppConfig 这样的类，我们希望在程序运行期间只存在一个实例对象

**作用**：防止一个全局使用的类频繁地创建与销毁

## 如何实现单实例模式

### 方式一：将实例赋值给变量

这是最简单实现单实例的方式

修改下上面的代码：
```python
class A:
    pass

a = A()

a1 = a
a2 = a
a3 = a
print(id(a1))
print(id(a2))
print(id(a3))

结果：
1546662907040
1546662907040
1546662907040
```
结果发现 3 个实例的地址相同

### 方式二：通过类的 `__new__` 方法

这种方式比较常用，实现很方便，推荐使用

::: danger 原理
+ 类在实例化时，会先调用 `__new__` 方法创建实例，然后对实例进行 `__init__` 初始化
+ 如果类没有指定 `__new__` 方法，就会调用 Object 的
+ 通过重写 `__new__` 方法，判断是否有实例存在，没有则创建，有则返回实例对象，从而实现单例模式
+ `__new__` 方法是个类方法
:::

```python
class A:
    def __new__(cls, *args, **kwargs):
        print('__new__ is call')
        if not hasattr(cls,"_instance"):
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        print('__init__ is call')

a1 = A()
a2 = A()
a3 = A()
print(id(a1))
print(id(a2))
print(id(a3))

结果：
__new__ is call
__init__ is call
__new__ is call
__init__ is call
__new__ is call
__init__ is call
1772512061104
1772512061104
1772512061104
```
结果可以看出实例对象地址相同

### 方式三：使用装饰器实现

此方式需要了解装饰器的一些知识，可参考 [装饰器](/languages/python/python/装饰器.md)

```python
def singleton(cls):
    _instance = {}

    def inner():
        if cls not in _instance:
            _instance[cls] = cls()
        return _instance[cls]
    return inner
    
@singleton
class Cls(object):
    def __init__(self):
        pass

cls1 = Cls()
cls2 = Cls()
print(id(cls1))
print(id(cls2))
```

结果：

```python
2323106588384
2323106588384
```



### 方式四：使用元类实现

此方式需要了解元类的一些知识，可参考 [元类](/languages/python/python/metaclass)

```python
class MyType(type):
    def __init__(self,name,base,attrs):
        self.instance = None
        super().__init__(name,base,attrs)

    def __call__(self, *args, **kwargs):
        # 判断是否有 instance
        if not self.instance:
            self.instance = self.__new__(self)
        self.__init__(self.instance,*args, **kwargs)
        return self.instance

class Foo(metaclass=MyType):
    def __init__(self):
        pass

v1 = Foo()
v2 = Foo()

print(v1)
print(v2)
```
结果：
```python
<__main__.Foo object at 0x0000015BB8167DF0>
<__main__.Foo object at 0x0000015BB8167DF0>
```

（完）