# 函数

**作用**:

+  函数的使用可以重用代码，提高代码的重复利用率 
+  函数能封装内部实现，保护内部数据，实现对用户的透明 
+  函数使得程序模块化 

## 参数的传递

**存在的情况**:

+   Python 的函数参数传递的是实际对象的内存地址 
+  Python 的数据类型分可变数据类型和不可变数据类型 

不可变类型：

```
a = 1
def func(a):
    print("在函数内部修改之前,变量a的内存地址为：%s" % id(a))
    a = 2
    print("在函数内部修改之后,变量a的内存地址为：%s" % id(a))
    print("函数内部的a为：%s" % a)


print("调用函数之前,变量a的内存地址为：%s" % id(a))
func(a)
print("函数外部的a为：%s" % a)


结果：
调用函数之前,变量a的内存地址为：1401140288
在函数内部修改之前,变量a的内存地址为：1401140288
在函数内部修改之后,变量a的内存地址为：1401140320
函数内部的a为：2
函数外部的a为：1

```

可变类型：

```
a = [1, 2, 3]

def func(b):
    print("在函数内部修改之前,变量b的内存地址为：%s" % id(b))
    b.append(4)
    print("在函数内部修改之后,变量b的内存地址为：%s" % id(b))
    print("函数内部的b为：%s" % b)


print("调用函数之前,变量a的内存地址为：%s" % id(a))
func(a)
print("函数外部的a为：%s" % a)


结果：
调用函数之前,变量a的内存地址为：34875720
在函数内部修改之前,变量b的内存地址为：34875720
在函数内部修改之后,变量b的内存地址为：34875720
函数内部的b为：[1, 2, 3, 4]
函数外部的a为：[1, 2, 3, 4]
```

**存在差异原因**:

+  “=” 赋值语句，会创建新的变量 
+  b.append(4)  不会创建新的变量

## 参数类型

### 位置参数

**特点**:

 + 必须在调用函数时明确提供的参数
 + 位置参数必须按先后顺序，一一对应 

```
def add(a, b, c):
    return a+b+c

result = add("haha", 2,  3)
```

### 默认参数

**特点**:

+ 参数有默认值
+ 可以使用默认值，也可以自定义

```
def power(x, n = 2):
    return x**n

ret1 = power(10)   # 使用默认的参数值n=2
ret2 = power(10, 4)  # 将4传给n，实际计算10**4的值
```

**默认参数的注意点**:

+ 必须在位置参数的后面

  ```
  def power(x,n = 2):
      return x**n
  ```

  **使用的一些方式**:

  + 有多个默认参数时，通常将常用的放在前面，变化较少的放在后面

    ```
    def student(name, sex, age, classroom="101", tel="88880000", address="..."):
        pass
    ```

  + 函数调用时，尽量给实际参数提供默认参数名

    ```
    def student(name, sex, age, classroom="101", tel="88880000", address="..."):
        pass
    
    student('jack','male',17)       # 其它全部使用默认值
    student('tom','male',18,'102','666666','beijing')    # 全部指定默认参数的值
    student('mary','female',18,'102',tel='666666')  # 挑着来
    student('mary','female',18,tel='666666','beijing')   #  这是错误的参数传递方式
    student("mary","female",18,tel="666666",address="beijing")
    ```

+ 使用参数名传递参数

  位置参数指定参数名时，调用时参数可不安顺序

  ```
  def student(name, age, classroom, tel, address="..."):
      pass
  
  student(classroom=101, name="Jack", tel=66666666, age=20)
  ```

  **注意**：使用上面的方式，参数名和位置参数名必须一致

+ 默认参数尽量指向不变的对象

  举个例子：

  ```
  def func(a=[]):
      a.append("A")
      return a
  
  print(func())
  print(func())
  print(func())
  ```

  你以为的答案：

  ```
  ['A']
  ['A']
  ['A']
  ```

  实际上的答案：

  ```
  ['A']
  ['A', 'A']
  ['A', 'A', 'A']
  ```

  **原因**:

  + a 指向列表的地址，这个列表不会变
  + 每次调用时向 a 中添加数据

## 动态参数

参数的个数不确定

 **注意：动态参数，必须放在所有的位置参数和默认参数后面** 

```
def func(name, age, sex='male', *args, **kwargs):
    pass
```

种类：

+ *args

  **特点**:

  + 一个星号表示接收任意个参数 

  + 调用时，会将实际参数打包成一个元组传入形式参数 
  +  如果参数是个列表，会将整个列表当做一个参数传入 

  ```
  def func(*args):
      for arg in args:
          print(arg)
  
  func('a', 'b', 'c')
  
  li = [1, 2, 3]
  func(li)
  
  a
  b
  c
  [1, 2, 3]
  ```

  想要将列表中的每个元素当作参数传入，可以在列表前加个*实现：

  ```
  def func(*args):
      for arg in args:
          print(arg)
  
  li = [1, 2, 3]
  func(*li)
  ```

  上述这种实现方式，同样适合元组、字符串、字典等，但字典传入的是 key 的值

+ **kwargs

  **特点**:

  +  两个星表示接受键值对的动态参数，数量任意 
  +  调用的时候会将实际参数打包成字典 

  ```
  def func(**kwargs):
      for kwg in kwargs:
          print(kwg, kwargs[kwg])
          print(type(kwg))
  
  func(k1='v1', k2=[0, 1, 2])
  
  k1 v1
  <class 'str'>
  k2 [0, 1, 2]
  <class 'str'>
  ```

  思考：如果传入的参数就是个 dict 会怎样？

  ```
  def func(**kwargs):
      for kwg in kwargs:
          print(kwg, kwargs[kwg])
  
  dic = {
      'k1': 'v1',
      'k2': 'v2'
  }
  
  func(dic)
  
  
  结果：
  Traceback (most recent call last):
    File "F:/Python/pycharm/201705/func.py", line 10, in <module>
      func(dic)
  TypeError: func() takes 0 positional arguments but 1 was given
  ```

  原因：这种传入时，将字典当作一个位置参数传入了，但函数不接受位置参数

  再次思考：那需要怎么传值，才能识别字典？

  使用两个 ** 号：将字典内的键值对传入

  ```
  def func(**kwargs):
      for kwg in kwargs:
          print(kwg, kwargs[kwg])
  
  dic = {
      'k1': 'v1',
      'k2': 'v2'
  }
  
  func(**dic)
  ```

+ 万能参数

   *args 和 **kwargs 组合起来使用 

   结合一下普通参数和万能参数 ：

  ```
  def func(a, b, c=1, *args, **kwargs):
      for arg in args:
          print(arg)
  
      for kwg in kwargs:
          print(kwg, kwargs[kwg])
  
  
  lis = ['aaa', 'bbb', 'ccc']
  dic = {
      'k1': 'v1',
      'k2': 'v2'
  }
  
  func(1, 2, *lis, **dic)
  ```

  你以为的：

  ```
  aaa
  bbb
  ccc
  k1 v1
  k2 v2
  ```

  实际上的：

  ```
  bbb
  ccc
  k1 v1
  k2 v2
  ```

  原因：根据 python 参数传递规则，aaa 被传给 默认参数 c 了

+ 关键字参数

  **特点**:

  + 使用 * 进行分割

  + `* `前是 位置参数和默认参数

  + `* `后是 关键字参数

  ```
  def student(name, age, *, sex):
      pass
  
  student(name="jack", age=18, sex='male')
  ```

  函数中有 *args 参数了，就不需要使用 * 分割

  ```
  def student(name, age=10, *args, sex, classroom, **kwargs):
      pass
  
  student(name="jack", age=18, sex='male', classroom="202", k1="v1")
  ```

（完）