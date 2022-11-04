# Python 反射机制

## 什么是反射机制

反射就是一种基于字符串的事件驱动，通过字符串的形式：
+ 导入模块
+ 去模块寻找指定函数，并执行
+ 去对象（模块）中操作（查找/获取/删除/添加）成员

**有四个内置函数**：
+ hasattr()
+ getattr()
+ setattr()
+ delattr()

## 如何使用反射机制

场景：需要根据用户输入 url 的不同，调用不同的函数，实现不同的操作

`commons.py` 中定义了 3 个函数：
```python
# commons.py

def login():
    print("这是一个登陆页面！")

def logout():
    print("这是一个退出页面！")

def home():
    print("这是网站主页面！")
```
要实现输入不同的 url 调用不同的函数，一般我们的思路：
```python
# visit.py

import commons

def run():
    inp = input("请输入您想访问页面的url：  ").strip()
    if inp == "login":
        commons.login()
    elif inp == "logout":
        commons.logout()
    elif inp == "home":
        commons.home()
    else:
        print("404")

if __name__ == '__main__':
    run()
```
上述代码可以解决场景中的问题，但是如果 commons 中有成千上百个函数，难道 visit 中要写成千上百个 elif ？

显然这种代码是不合理的？那怎么办？

思路：
+ 观察 `visit.py` 中的代码发现用户输入的 url 字符串和相应调用的函数名好像
+ 如果能用这个字符串直接调用函数就好了
+ 但是字符串是不能用来调用函数的，这就可以使用到 Python 的反射机制

修改 visit 的代码：
```python
# visit.py
   import commons 
   
   def run():
       inp = input("请输入您想访问页面的url：  ").strip()
       func = getattr(commons,inp)
       func() 
   
   if __name__ == '__main__':
       run()
```
`func = getattr(commons,inp)`
+ 通过 `getattr()` 函数，从 commons 模块里，查找到和 inp 字符串“外形”相同的函数名，并将其返回，然后赋值给 func 变量
+ 变量 func 此时就指向那个函数，`func()` 就可以调用该函数

`getattr()` 函数的使用方法：
```python
getattr(commons,inp)
接收 2 个参数，前面的是一个类或者模块，后面的是一个字符串
```
但上述代码有个问题，就是如果输入的 url 在 commons 中没有同名函数，就会报错，那怎么办？

可以使用 `hasattr()` 来进行判断

再次修改 visit 的代码：
```python
# visit.py
   import commons 
   
   def run():
       inp = input("请输入您想访问页面的url：  ").strip()
       if hasattr(commons,inp):
           func = getattr(commons,inp)
           func()
       else:
           print("404")
   
   if __name__ == '__main__':
       run()
```
## 动态导入模块

### 为什么要动态导入模块

+ 上述例子中的是所有处理函数都是在 commons 模块中，但实际中有可能处理函数处于不同的模块中
+ 原则上是需要在 visit 中逐个导入每个视图模块
+ 如果模块比较多，那在 visit 中就会有一堆的 import 语句

解决方法：

使用 Python 内置的 `__import__(字符串参数)` 动态地导入同名的模块

再修改一下 `visit.py` 的代码：
```python
# visit.py

def run():
    inp = input("请输入您想访问页面的url：  ").strip()
    modules, func = inp.split("/")
    obj = __import__(modules)
    if hasattr(obj, func):
        func = getattr(obj, func)
        func()
    else:
        print("404")

if __name__ == '__main__':
    run()
```
**注意**：输入的时候要同时提供模块名和函数名字，并用斜杠分隔

但如果不同的模块在不同的包中呢？那上述的代码就有问题了，可以修改下 run 函数
```python
def run():
    inp = input("请输入您想访问页面的url：  ").strip()
    modules, func = inp.split("/")
    obj = __import__("lib." + modules, fromlist=True)      #注意字符串的拼接
    if hasattr(obj, func):
        func = getattr(obj, func)
        func()
    else:
        print("404")
```
::: tip 注意
+ `__import__()` 默认只会导入最开头的圆点左边的目录，也就是 lib
+ 需传入 **`fromlist=True`**
:::

（完）