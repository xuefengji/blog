# 元类

在了解元类之前，需要学习 Python 中的类，以及使用类创建对象的过程，才能更好的理解

可参考 [类与实例](/languages/python/python/类与实例.md)

## 什么是元类

学过类的都知道，实例对象是由类创建的，那有没有想过类是由谁创建的？

::: danger type

类默认是由 type 创建的 

:::

**使用 type 查看类的类型**：

```python
class Foo:
    v1 = 123

    def func(self):
        return 666

print(Foo)
print(type(Foo))

结果：
<class '__main__.Foo'>
<class 'type'>
 
```

可以看到我们创建类的类型为 **type**

对比上面的传统模式，可以使用 **type** 方式来创建类

### **type 方式创建类**：

**语法**：

```python
type(name, base,dict)

name: 需要创建的类名
base：继承的类
dict：类中的成员

源码：
    def __init__(cls, what, bases=None, dict=None): # known special case of type.__init__
        """
        type(object_or_name, bases, dict)
        type(object) -> the object's type
        type(name, bases, dict) -> a new type
        # (copied from class doc)
        """
        pass
```

示例：

```python
# 创建类
Fa = type("Foo",(object,),{'v1':123,'func':lambda self:666})
print(Fa)
# 根据类创建对象
obj = Fa()
# 调用实例中的方法
print(obj.func())

结果：
<class '__main__.Foo'>
666
```

可以看到，type 是可以来创建一个类的

::: danger 什么是元类

+ 创建类的就叫**元类**

+ type 就是一个内置的元类

:::



## 为什么要使用元类

作用：指定类由谁创建



## 如何自定义元类创建类

既然类默认是由 type 创建的，那我们是否可以自定义一个元类来创建类？

例如：

新建 MyType 元类，继承于 type
```python
class MyType(type):
    def __new__(cls, *args, **kwargs):
        print("__new__")
        new_cls = super().__new__(cls, *args, **kwargs)
        print(new_cls)
        return new_cls

    def __init__(self,*args, **kwargs):
        print('__init__')
        super().__init__(*args, **kwargs)

```
使用 MyType 创建 Foo 类
```python
class Foo(metaclass=MyType):
    pass

print(Foo)

结果：
<class '__main__.Foo'>
```
::: tip 理解上述代码
+ Python 中一切皆为对象，类也是对象
+ Foo 由 MyType 创建，而 MyType 是一个类，可以理解创建 Foo 类即为创建 MyType 的一个实例对象
+ MyType 既然为类，在创建对象时，就会先执行 `__new__` 函数创建一个对象，然后再执行 `__init__` 进行初始化
:::

理解了上面的代码，再来思考下，那如何实例化元类创建的类呢？

+ Foo 是由 MyType 创建的一个类，既然是类，那就可以创建实例对象
+ 但上述的理解，Foo 是 MyType 的实例对象，那执行 Foo() 时，实际上是在实例对象后加上 () 
+ 在 Python 中，如果在实例对象后添上 () 时，需要执行类中的 `__call__` 函数
+ 由此就需要在 MyType 中实现 `__call__` 函数
+ 在类实例化时，需要执行 `__new__` 和 `__init__`，因此需要在 `__call__` 函数中实现这两个方法
```python
class MyType(type):
    def __new__(cls, *args, **kwargs):
        # print("__new__")
        new_cls = super().__new__(cls, *args, **kwargs)
        # print(new_cls)
        return new_cls

    def __init__(self,*args, **kwargs):
        # print('__init__')
        super().__init__(*args, **kwargs)

    def __call__(self, *args, **kwargs):
        empty_object = self.__new__(self)
        self.__init__(empty_object,*args, **kwargs)
        return empty_object

class Foo(metaclass=MyType):
    def __init__(self,name):
        self.name = name

v1 = Foo("ALEX")
print(v1.name)

结果：
ALEX
```

（完）