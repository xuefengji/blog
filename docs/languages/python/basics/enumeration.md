# 枚举

## 什么是枚举

- Python 中枚举是一种类，存放在 enum 模块
- 枚举类型可以给一组标签赋予一组特定的值


## 枚举的特点

- 枚举类中不能存在相同的标签名
- 枚举是可迭代的 
- 不同的枚举标签可以对应相同的值，但它们都会被视为该值对应第一个标签的别名
- 如果要限制定义枚举时，不能定义相同值的成员，可以使用装饰器 `@unique`（需要导入 unique 模块） 
- 枚举成员之间不能进行大小比较，可进行等值和同一性比较 
- 枚举成员为单例，不可实例化，不可更改

> 枚举的意义重在标签而不在于数值，最好全部使用大写

## 枚举类

> Python 中所有枚举类型都是 enum 模块下的 Enum 类的子类

```python
from enum import Enum
class Color(Enum):
    YELLOW = 1
    GREEN = 2
    BLACK = 3
    RED = 4
```
如果让标签的值唯一，需要 `@unique` 装饰器修饰类
```python
from enum import Enum, unique

@unique
class Color(Enum):
    YELLOW = 1
    GREEN = 2
    BLACK = 3
    RED = 4
```

### 枚举类型、名称、值获取

> 获取枚举类型中的数值：`class.value`
> 获取枚举类型中的标签：`class.name`
> 获取数值的标签：`class(value).name`

```python
from enum import Enum, unique

class Color(Enum):
    YELLOW = 1
    GREEN = 2
    BLACK = 3
    RED = 4

print(Color.YELLOW.value)
print(Color.YELLOW.name)
print(Color.YELLOW)
print(Color['YELLOW'])
print(Color(1).name)
print(type(Color.YELLOW.value))
print(type(Color.YELLOW.name))
print(type(Color.YELLOW))
print(type(Color['YELLOW']))
```
结果：
```python
1                # 枚举的值
YELLOW           # 枚举的标签
Color.YELLOW     # 通过枚举标签获取枚举类型
Color.YELLOW     # 通过枚举标签获取枚举类型
YELLOW           # 通过值获取标签名
<class 'int'>    # 枚举值的值类型
<class 'str'>    # 枚举标签的类型
<enum 'Color'>   # 通过枚举标签获取枚举类型
<enum 'Color'>   # 通过枚举标签获取枚举类型
```

> 遍历枚举

使用 `for..in..`

```python
for color in Color:
    print(color)
```
结果：
```python
Color.YELLOW
Color.GREEN
Color.BLACK
Color.RED
```
如果枚举中有标签的值重复时，在遍历时，默认结果中不会显示重复值的标签名
```python
class Color(Enum):
    YELLOW = 1
    GREEN = 2
    BLACK = 3
    RED = 4
    WHITE = 1  
for color in Color:
    print(color)
```
结果，没有显示 WHITE 这个标签：
```python
Color.YELLOW
Color.GREEN
Color.BLACK
Color.RED
```
如果想要输出这个重复值的标签时，可以通过迭代`__members__`来显示所有成员标签
```python
for color in Color.__members__:
    print(color)
```
结果：
```python
YELLOW
GREEN
BLACK
RED
WHITE
```

> 枚举的比较运算

+ 枚举类型之间可以进行等值比较，但直接比较会返回 False
```python
print(Color.YELLOW==1)           # False
print(Color.YELLOW.value == 1)   # True
```

+ 枚举类型之间不支持大小操作符比较
+ 枚举类型可以进行`is`比较
```python
print(Color.YELLOW is Color.YELLOW)   # True
```
+ 不同枚举类中的枚举类型进行比较都会返回 False

::: tip 总结
+ Enum：不限制枚举类型数值的数据类型
+ IntEnum：限制枚举类型数值必须为整型
+ 枚举是单例模式，不能实例化
+ `@unique`：标签值唯一
:::

（完）