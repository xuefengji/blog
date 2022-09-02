# 作用域

**定义**：作用域指的是变量的有效范围

**注意**：Python 中没有块级作用域

```python
>>> if True:            # if语句块没有作用域
    x = 1   
>>> x
1
>>> def func():         # 函数有作用域
    a = 8   
>>> a
Traceback (most recent call last):
  File "<pyshell#3>", line 1, in <module>
    a
NameError: name 'a' is not defined
```

+ if 中的 x 能被外部访问
+ 函数中的 a 不能被外部访问

**作用域层：**

+ 局部作用域（local）
+ 闭包函数外的函数中（enclosing）
+ 全局作用域（global）
+ 内建作用域（built-in）

```python
x = int(2.9)  # 内建作用域，查找int函数

global_var = 0  # 全局作用域
def outer():
    out_var = 1  # 闭包函数外的函数中
    def inner():
        inner_var = 2  # 局部作用域
```

查找变量的顺序： **`L –> E –> G –>B`** 

```python
a = 1

def func():
    print(a)

1
```

**全局变量和局部变量**：

**定义**：

+ 函数内部定义的变量有局部作用域，被叫做局部局部变量，函数外的叫全局变量

+ 局部变量是相对的，也可能是更小范围的全局变量

+ 局部变量只能在其被声明的函数内部访问，而全局变量可以在整个程序范围内访问 

```python
a = 1               # 全局变量

def func():
    b = 2           # 局部变量
    print(a)        # 可访问全局变量a,无法访问它内部的c

    def inner():
        c = 3       # 更局部的变量
        print(a)    # 可以访问全局变量a
        print(b)    # b对于inner函数来说，就是外部变量
        print(c)
```

**global 和 nonlocal 关键字**：

+ global

  看个栗子：

  ```python
  total = 0                        # total是一个全局变量
  
  def plus( arg1, arg2 ):
      total = arg1 + arg2          # total在这里是局部变量.
      print("函数内局部变量total=  ", total)
      print("函数内的total的内存地址是: ", id(total))
      return total
  
  plus(10, 20)
  print("函数外部全局变量total= ", total)
  print("函数外的total的内存地址是: ", id(total))
  ```

  上面栗子中两个 total 是不一样的，但想在函数内部访问全局变量中的 total ，使用关键字：global

  ```python
  total = 0                        # total是一个全局变量
  
  def plus( arg1, arg2 ):
      global total    # 使用global关键字申明此处的total引用外部的total
      total = arg1 + arg2          
      print("函数内局部变量total=  ", total)
      print("函数内的total的内存地址是: ", id(total))
      return total
  
  plus(10, 20)
  print("函数外部全局变量total= ", total)
  print("函数外的total的内存地址是: ", id(total))
  
  -----------------------
  函数内局部变量total=   30
  函数内的total的内存地址是:  503494624
  函数外部全局变量total=  30
  函数外的total的内存地址是:  503494624
  ```

+ nonlocal 

  还是先看个栗子：

  ```python
  a = 1
  print("函数outer调用之前全局变量a的内存地址： ", id(a))
  
  def outer():
      a = 2
      print("函数outer调用之时闭包外部的变量a的内存地址： ", id(a))
      def inner():
          a = 3
          print("函数inner调用之后闭包内部变量a的内存地址： ", id(a))
      inner()
      print("函数inner调用之后，闭包外部的变量a的内存地址： ", id(a))
  outer()
  print("函数outer执行完毕，全局变量a的内存地址： ", id(a))
  ```

  理解了之前的知识，知道这 3 个 a 都是各自的，但想 inner 内想访问 outer 中的 a 咋办？

  对于 inner 来说 outer 中的 a 相当于全局变量，使用 global，来试下：

  ```python
  a = 1
  print("函数outer调用之前全局变量a的内存地址： ", id(a))
  def outer():
      a = 2
      print("函数outer调用之时闭包外部的变量a的内存地址： ", id(a))
      def inner():
          global a   # 注意这行
          a = 3
          print("函数inner调用之后闭包内部变量a的内存地址： ", id(a))
      inner()
      print("函数inner调用之后，闭包外部的变量a的内存地址： ", id(a))
  outer()
  print("函数outer执行完毕，全局变量a的内存地址： ", id(a))
  
  --------------------------
  函数outer调用之前全局变量a的内存地址：  494384192
  函数outer调用之时闭包外部的变量a的内存地址：  494384224
  函数inner调用之后闭包内部变量a的内存地址：  494384256
  函数inner调用之后，闭包外部的变量a的内存地址：  494384224
  函数outer执行完毕，全局变量a的内存地址：  494384256
  ```

  纳尼？竟然用的是全局的 a，只想用个 outer 中的 a ,使用 nonlocal 试试

  ```python
  a = 1
  print("函数outer调用之前全局变量a的内存地址： ", id(a))
  def outer():
      a = 2
      print("函数outer调用之时闭包外部的变量a的内存地址： ", id(a))
      def inner():
          nonlocal  a   # 注意这行
          a = 3
          print("函数inner调用之后闭包内部变量a的内存地址： ", id(a))
      inner()
      print("函数inner调用之后，闭包外部的变量a的内存地址： ", id(a))
  outer()
  print("函数outer执行完毕，全局变量a的内存地址： ", id(a))
  
  -----------------
  函数outer调用之前全局变量a的内存地址：  497726528
  函数outer调用之时闭包外部的变量a的内存地址：  497726560
  函数inner调用之后闭包内部变量a的内存地址：  497726592
  函数inner调用之后，闭包外部的变量a的内存地址：  497726592
  函数outer执行完毕，全局变量a的内存地址：  497726528
  ```

  这下终于好了！

**Python 中的一些规则**：

+ 函数内部修改变量时，必须在之前声明了这个变量

  ```python
  a = 10
  def test():
      a += 1
      print(a)
  test()
  ```

  你以为的答案：11

  实际上的：**报错**

  纳尼？简直不敢相信

  **原因**：a +=1 实际上是 a=a+1，python 中规定，修改一个变量之前这个变量必须被声明，栗子中没有声明变量就修改，与语法不符，所以报错

+  **Python 函数的作用域取决于其函数代码块在整体代码中的位置，而不是调用时机的位置** 

  ```python
  name ='jack'
  
  def f1():
      print(name)
  
  def f2():
      name = 'eric'
      f1()
  
  f2()
  ```

  你以为的：'eric'

  实际上的：'jack'

  不玩了不玩了，要疯了，说好的内部没有往外找呢

  **原因**： f1 是定义在 f2 外部的，对于 f1 来说它的外部就是全局，符合 Python 查找变量的规则

（完）