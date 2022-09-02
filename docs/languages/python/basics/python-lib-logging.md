# 使用 logging 输出日志信息

## 关于 logging

+ logging 库是 Python 内置的常用的记录日志库
+ 开发过程中，可以通过该模块，灵活的完成日志的记录

提供 2 种记录日志的方式：

+ 使用 logging 提供的模块级别的函数（logging.basicConfig，logging.debug，logging.info…）
+ 使用 logging 模块的组件（loggers，handlers，filters，formatters）

## 日志级别

| 日志级别（level） | 描述                                              |
| ----------------- | ------------------------------------------------- |
| DEBUG             | 调试级别，一般用于问题的排查，日志的信息最为详细  |
| INFO              | 仅记录普通的信息，日志信息的详细程度仅次于 DEBUG  |
| WARNING           | 警告信息，一般这类信息不会影响程序的正常运行      |
| ERROR             | 错误信息， 出现错误信息时，程序一般已不能正常运行 |
| CRITICAL          | 更严重的错误信息，程序不能继续运行                |

**日志等级严重性**：

DEBUG < INFO < WARNING < ERROR < CRITICAL	

## 通过 logging 模块级别的函数记录日志

示例：

```python
import logging

logging.debug('debug message')  
logging.info('info message')  
logging.warning('warning message')  
logging.error('error message')  
logging.critical('critical message') 
```

输出结果：

```python
WARNING:root:warning message
ERROR:root:error message
CRITICAL:root:critical message
```

结果分析：

+ 只打印了 warning 及以上的日志信息，说明 logging **默认的日志级别是 warning**	
+ 日志会直接打印到标准输出中

### 使用 basicConfig 

示例：

```python
import logging

logging.basicConfig(level=logging.DEBUG, 
                    format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',                       # 设置日志格式
                    datefmt='%Y-%m-%d %H:%M:%S',    # 时间格式：2022-06-15 16:36:21
                    filename='test.log',    # 日志的输出路径
                    filemode='a')                      # 追加模式

logging.debug('debug message')  
logging.info('info message')  
logging.warning('warning message')  
logging.error('error message')  
logging.critical('critical message') 
```

程序运行后，日志信息会直接记录到指定的文件中（test.log），且日志级别为 DEBUG，所以所有的日志都会被输出，日志信息如下：

```python
2022-06-15 16:37:28 test1.py[line:33] DEBUG debug message
2022-06-15 16:37:28 test1.py[line:34] INFO info message
2022-06-15 16:37:28 test1.py[line:35] WARNING warning message
2022-06-15 16:37:28 test1.py[line:36] ERROR error message
2022-06-15 16:37:28 test1.py[line:37] CRITICAL critical message
```

**logging.basicConfig() 函数的参数**：

| 参数     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| filename | 设置日志输出的文件名                                         |
| filemode | 设置日志写入文件的模式                                       |
| format   | 设置日志显示格式                                             |
| datefmt  | 指定日期时间格式                                             |
| level    | 设置日志级别                                                 |
| stream   | 用指定的 stream 创建 StreamHandler<br />指定输出到 sys.stderr,sys.stdout 或者文件(f=open(‘test.log’,’w’))，默认为sys.stderr<br />若同时列出了 filename 和 stream 两个参数，则 stream 参数会被忽略 |

**format 参数中可能用到的格式化串**：

| 格式化串            | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| %(name)s            | Logger 的名字                                                |
| %(levelno)s         | 数字形式的日志级别                                           |
| %(levelname)s       | 文本形式的日志级别                                           |
| %(pathname)s        | 调用日志输出函数的模块的完整路径名，可能没有                 |
| %(filename)s        | 调用日志输出函数的模块的文件名                               |
| %(module)s          | 调用日志输出函数的模块名                                     |
| %(funcName)s        | 调用日志输出函数的函数名                                     |
| %(lineno)d          | 调用日志输出函数的语句所在的代码行                           |
| %(created)f         | 当前时间，用 UNIX 标准的表示时间的浮点数表示                 |
| %(relativeCreated)d | 输出日志信息时的，自 Logger 创建以来的毫秒数                 |
| %(asctime)s         | 字符串形式的当前时间<br />默认格式是 “2018-11-13 00:00:00,896”<br />逗号后面的是毫秒 |
| %(thread)d          | 线程 ID，可能没有                                            |
| %(threadName)s      | 线程名，可能没有                                             |
| %(process)d         | 进程 ID，可能没有                                            |
| %(message)s         | 用户输出的消息                                               |

## 通过 logging 模块的组件记录日志

使用 logging 模块级别的函数记录日志，无法实现将日志输出到多个路径下

**logging 模块中用于记录日志的 4 大组件**：

| 组件名称  | 功能描述                                                     |
| --------- | ------------------------------------------------------------ |
| Logger    | 日志器，提供了应用程序可一直使用的接口                       |
| Handler   | 将 logger 产生的日志发送到指定的路径下（例如可以是终端，也可以是文件） |
| Filter    | 若有多个 Logger，可根据名称过滤出指定的 Logger 来记录日志    |
| Formatter | 定义日志格式                                                 |

**logging 模块组件记录日志的大致步骤如下**：

+ logging.getLogger() 获取 logger 对象
+ logger.setLevel(logging.DEBUG) 设置日志级别
+ 创建一个或多个 handler，用于指定日志信息的输出流向
+ 创建一个或多个 formatter，指定日志的格式，并分别将 formatter 绑定到 上
+ 将 handler 绑定到 logger对象 上
+ 最后便可使用 logger 对象 记录日志

示例：

```python
import logging

# 获取 logger对象
logger = logging.getLogger()

# 创建一个 handler，用于写入日志文件
fh = logging.FileHandler('/tmp/test.log')

# 再创建一个 handler，用于输出到控制台
ch = logging.StreamHandler()

# 创建一个 formatter，两个 handler 使用相同的日志格式
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# 绑定 formatter 到 handler 上
fh.setFormatter(formatter)
ch.setFormatter(formatter)

# 绑定 handler 到 logger对象 上
logger.addHandler(fh) #logger对象可以添加多个fh和ch对象
logger.addHandler(ch)

# 设置日志级别
logger.setLevel(logging.WARNING)

logger.debug('logger debug message')
logger.info('logger info message')
logger.warning('logger warning message')
logger.error('logger error message')
logger.critical('logger critical message')
```

输出结果：

```python
终端输出：
2022-06-15 16:37:28 - root - WARNING - logger warning message
2022-06-15 16:37:28 - root - ERROR - logger error message
2022-06-15 16:37:28 - root - CRITICAL - logger critical message

文件输出：
2022-06-15 16:37:28 - root - WARNING - logger warning message
2022-06-15 16:37:28 - root - ERROR - logger error message
2022-06-15 16:37:28 - root - CRITICAL - logger critical message
```

当使用 handler 来设置日志级别时，存在如下两种情况：

+ 若 handler 设置的日志级别小于等于 logger 的日志级别时，则以 logger 的日志级别为准
+ 若 handler 设置的日志级别大于 logger 的日志级别时，则以 handler 的日志级别为准

示例：

handler 日志级别设置为 CRITICAL，logger 设置为 ERROR

```python
import logging

logger = logging.getLogger()
ch = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# handler 日志级别设置为 CRITICAL，logger 设置为 ERROR
ch.setLevel(logging.CRITICAL)
logger.setLevel(logging.ERROR)

ch.setFormatter(formatter)
logger.addHandler(ch)

logger.debug('logger debug message')
logger.info('logger info message')
logger.warning('logger warning message')
logger.error('logger error message')
logger.critical('logger critical message')

输出结果：
2022-06-15 16:37:28,279 - root - CRITICAL - logger critical message
```

### filter 组件的使用

+ filter 组件用来过滤 logger 对象
+ 一个 filter 可以直接添加到 logger 对象上，也可以添加到 handler 对象上

**示例**：

在 handler 上添加 filter

```python
import logging

logger1 = logging.getLogger('a.b.c')
logger2 = logging.getLogger('a.c')

# 定义一个 filter
filter = logging.Filter(name='a.b')

# 定义一个 handler
ch = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

# 若两个 logger对象 的日志级别相同，且都是用通过一个 handler，可以在这个 handler 上设置日志级别
ch.setLevel(logging.ERROR)

# 在 handler 上放置过滤器
ch.addFilter(filter)

logger1.addHandler(ch)
logger2.addHandler(ch)
logger1.error('logger1 error message')
logger2.error('logger2 error message')

输出结果：
2022-06-15 17:33:42,409 - a.b.c - ERROR - logger1 error message
```

在 logger 对象上添加 filter

```python
import logging

logger1 = logging.getLogger('a.b.c')
logger2 = logging.getLogger('a.c')

# 定义一个 filter
filter = logging.Filter(name='a.b')

# 定义一个 handler
ch = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)

# 若两个 logger对象 的日志级别相同，且都是用通过一个 handler，可以在这个 handler 上设置日志级别
ch.setLevel(logging.ERROR)

# 在 logger 上放置过滤器
logger1.addFilter(filter)
logger2.addFilter(filter)

logger1.addHandler(ch)
logger2.addHandler(ch)
logger1.error('logger1 error message')
logger2.error('logger2 error message')

输出结果：
2022-06-15 17:36:42,669 - a.b.c - ERROR - logger1 error message
```

+ 输出结果一致，即仅有 logger1 输出日志
+ 将 filter 添加到 logger 上，这个 filter 将直接作用于这个 logger，貌似这么意义不大，很少这样使用

（完）