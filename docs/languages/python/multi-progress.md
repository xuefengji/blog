# 进程

## 什么是多任务

同一时间有多个任务执行，表现形式为：

+ 并发：单核 cpu 交替执行多任务
+ 并行：多核 cpu 同时执行多任务

##  什么是进程

+ 概念

进程是系统分配资源的最小单位，比如打开一个 QQ 软件，这是一个进程；再比如打开一个微信软件，这也是一个进程。

+ 作用

多进程可以开启多个任务，使单 CPU 实现多任务并发

## 创建多进程的步骤

+ 创建进程对象
+ 指定进程任务
+ 开启进程

## 多进程实现

### 函数不带参数

```python
import multiprocessing
import time
import os


def sin():
    print(os.getpid())  //获取当前进程 id
    print(os.getppid()) //获取父进程 id
    for i in range(3):
        time.sleep(1)
        print("唱歌......")


def dance():
    print(os.getpid())  // 获取当前进程 id
    print(os.getppid()) //获取父进程 id
    for i in range(3):
        time.sleep(1)
        print("跳舞......")


if __name__ == '__main__':
    process1 = multiprocessing.Process(target=sin)  //创建多进程
    process2 = multiprocessing.Process(target=dance) 
    process1.start()   //启动多进程
    process2.start()
6596
13816
5688
13816
唱歌......
跳舞......
唱歌......
跳舞......
唱歌......
跳舞......

由上可以看出，两个进程的父进程 id 是同一个
```

### 函数带参

+ 使用 args 传参：需要注意 args 中的参数必须与函数中的一一对应

  ```python
  import multiprocessing
  import time
  import os
  
  
  def sin(num):
      print(os.getpid())  //获取当前进程 id
      print(os.getppid()) //获取父进程 id
      for i in range(num):
          time.sleep(1)
          print("唱歌......")
  
  
  def dance(num):
      print(os.getpid())  // 获取当前进程 id
      print(os.getppid()) //获取父进程 id
      for i in range(num):
          time.sleep(1)
          print("跳舞......")
  
  
  if __name__ == '__main__':
      process1 = multiprocessing.Process(target=sin,args=(3,))  //创建多进程
      process2 = multiprocessing.Process(target=dance, args=(3,)) 
      process1.start()   //启动多进程
      process2.start()
      
      
  结果：
  15392
  15104
  1836
  15104
  唱歌......
  跳舞......
  唱歌......
  跳舞......
  唱歌......
  跳舞......
  ```

  

+ 使用 kwargs 传参

  ```python
  import multiprocessing
  import time
  import os
  
  
  def sin(num):
      print(os.getpid())  //获取当前进程 id
      print(os.getppid()) //获取父进程 id
      for i in range(num):
          time.sleep(1)
          print("唱歌......")
  
  
  def dance(num):
      print(os.getpid())  // 获取当前进程 id
      print(os.getppid()) //获取父进程 id
      for i in range(num):
          time.sleep(1)
          print("跳舞......")
  
  
  if __name__ == '__main__':
      process1 = multiprocessing.Process(target=sin,kwargs={"num":3})  //创建多进程
      process2 = multiprocessing.Process(target=dance, kwargs={"num":3}) 
      process1.start()   //启动多进程
      process2.start()
      
      
  结果：
  5688
  18800
  12920
  18800
  唱歌......
  跳舞......
  唱歌......
  跳舞......
  唱歌......
  跳舞......
  ```


::: danger 注意

问题：如果不在 `__name__ == '__main__' ` 中创建进程并执行时，会报错

原因：不同系统支持多进程的机制不一样

+ Win：默认支持 spawn
+ Linux ：默认支持 fork 机制
+ Mac :  支持 spawn 和 fork ，Python 3.8 之后默认支持 spawn

解决：可以设置支持的机制

```python
multiprocessing.set_start_method('fork')
```

:::

进程守护：主进程会在所有的子进程结束后再结束

（完）


