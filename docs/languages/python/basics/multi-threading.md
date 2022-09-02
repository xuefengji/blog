# 多线程

之前了解了进程，接下来了解下线程

## 什么是线程

+ 是计算机中可以被 CPU 调度的最小单元
+ 一个进程可以有多个线程
+ 多线程可以共享进程的资源

类比：

+ 一个工厂，至少有一个车间，一个车间至少有一个工人，最终是工人在工作
+ 一个程序，至少有一个进程，一个进程中至少有一个线程，最终是线程在工作

## 为什么需要多线程

提高代码执行效率

## 如何创建多线程

有两种方式来创建线程：

+ 一种是继承 Thread 类，并重写它的 run() 方法
+ 另一种是在实例化 `threading.Thread` 对象的时候，将线程要执行的任务函数作为参数传入线程

### 方式一：继承 Thread 类

```python
import threading

class MyThread(threading.Thread):
    def __init__(self, thread_name):
        # 注意：一定要显式的调用父类的初始化函数。
        super(MyThread, self).__init__(name=thread_name)

    def run(self):
        print("%s正在运行中......" % self.name)

if __name__ == '__main__':    
    for i in range(10):
        MyThread("thread-" + str(i)).start()
```

### 方式二：实例化 `threading.Thread` 对象

```python
import threading
import time

def show(arg):
    time.sleep(1)
    print('thread '+str(arg)+" running....")

if __name__ == '__main__':
    for i in range(10):
        t = threading.Thread(target=show, args=(i,))
        t.start()
```

### Thread 源码

我们来看下 Thread 这个类的源码：

```python
def __init__(self, group=None, target=None, name=None,
                 args=(), kwargs=None, *, daemon=None):
```

**参数说明**：

- group：是预留的，用于将来扩展
- target：是一个可调用对象，在线程启动后执行
- name：是线程的名字，默认值为 “Thread-N“，N 是一个数字
- args 和 kwargs：分别表示调用 target 时的参数列表和关键字参数

Thread 类定义了以下常用方法与属性：

| 方法与属性                   | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| start()                      | 启动线程，等待 CPU 调度                                      |
| run()                        | 线程被 CPU 调度后自动执行的方法                              |
| getName()、setName() 和name  | 用于获取和设置线程的名称                                     |
| setDaemon()                  | 设置为后台线程或前台线程（默认是False，前台线程）<br />如果是后台线程，主线程执行过程中，后台线程也在进行，主线程执行完毕后，后台线程不论成功与否，均停止<br />如果是前台线程，主线程执行过程中，前台线程也在进行，主线程执行完毕后，等待前台线程执行完成后，程序才停止 |
| ident                        | 获取线程的标识符<br />线程标识符是一个非零整数，只有在调用了 start() 方法之后该属性才有效，否则它只返回None |
| is_alive()                   | 判断线程是否是激活的（alive）<br />从调用 start() 方法启动线程，到 run() 方法执行完毕或遇到未处理异常而中断这段时间内，线程是激活的 |
| isDaemon() 方法和 daemon属性 | 是否为守护线程                                               |
| join([timeout])              | 调用该方法将会使主调线程堵塞，直到被调用线程运行结束或超时<br />参数 timeout 是一个数值类型，表示超时时间，如果未提供该参数，那么主调线程将一直堵塞到被调线程结束 |

（完）