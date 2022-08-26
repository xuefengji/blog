# property 属性

## 什么是 property 属性

对象中的某个函数，可以通过 `对象.xxxx` 的方式调用

**作用**：
+ 使用 property 来创建只读属性
+ property 会将方法转换为相同名称的只读属性,可以与所定义的属性配合使用，这样可以防止属性被修改



## 为什么要使用 property 属性

+ 调用函数方便
+ 防止属性被随意修改


## 使用方式

### @property 装饰器

```python
class Basic:
    def __init__(self):
        self.__name = "alex"
    @property
    def get_name(self):
        return self.__name

    @get_name.setter
    def get_name(self,value):
        self.__name = value

if __name__ == '__main__':
    b = Basic()
    print(b.get_name)
    b.get_name = "hello"
    print(b.get_name)
    
    
结果：
alex
hello
```

::: warning 注意

+  `@get_name.setter` 只能在新式类(Python 3)中使用
+  新式类中设置 `property` 属性的值，必须使用 `@get_name.setter` 修饰
+  `@property` 与 `@get_name.setter` 修饰的函数名必须相同
+  `@property` 修饰的函数必须在 `@get_name.setter` 修饰的函数前
:::

### property() 函数

```python
class Pepole:

    def __init__(self):
        self.age = 18

    def set_setter(self,value):
        if value > 100:
            raise ValueError
        if value <= 0:
            raise ValueError
        self.age = value

    def get_setter(self):
        return self.age

    BAP = property(get_setter,set_setter)

if __name__ == '__main__':
    B = Pepole()
    print(B.BAP)
    B.set_setter(80)
    print(B.BAP)

结果：
18
80
```
::: warning 注意
`property()` 函数中的参数分别是：
+ 第一个参数是方法名，调用 实例.属性 时自动执行的方法

+ 第二个参数是方法名，调用 实例.属性 ＝ XXX 时自动执行的方法

+ 第三个参数是方法名，调用 del 实例.属性 时自动执行的方法

+ 第四个参数是字符串，调用 实例.属性 `.__doc__` 时的描述信息

  :::

（完）