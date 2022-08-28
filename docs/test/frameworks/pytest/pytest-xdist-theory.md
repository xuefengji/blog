# pytest-xdist 分布式测试的原理

## 分布式结构

+ xdist 的分布式类似于一主多从的结构，master 机负责下发命令，控制 slave 机
+ slave 机根据 master 机的命令执行特定测试任务
+ 在 xdist 中，主是 master，从是 workers
 
## 原理简介

+ xdist 会产生一个或多个 workers，workers 都通过 master 来控制
+ 每个 worker 负责执行完整的测试用例集，然后按照 master 的要求运行测试，而 master 机不执行测试任务
 
## pytest-xdist 分布式测试的流程

### 第一步：创建worker

+ master 会在总测试会话（test session）开始前产生一个或多个 worker
+ master 和 worker 之间是通过 execnet 和网关来通信的
+ 实际编译执行测试代码的 worker 可能是本地机器也可能是远程机器
 
### 第二步：收集测试项用例

+ 每个 worker 类似一个迷你型的 Pytest 执行器
+ worker 会执行一个完整的 test collection 过程【收集所有测试用例的过程】
+ 然后把测试用例的 ids 返回给 master
+ master 是不会执行任何测试用例集的

**注意**：

为什么上面通过分布式测试的结果截图是没有输出用例的 print 内容，因为主机并不执行测试用例，pycharm 相当于一个 master

### 第三步：master 检测 workers 收集到的测试用例集

+ master 接收到所有 worker 收集的测试用例集之后，master 会进行一些完整性检查，以确保所有 worker 都收集到一样的测试用例集（包括顺序）
+ 如果检查通过，会将测试用例的 ids 列表转换成简单的索引列表，每个索引对应一个测试用例的在原来测试集中的位置
+ 这个方案可行的原因是：所有的节点都保存着相同的测试用例集
+ 并且使用这种方式可以节省带宽，因为 master 只需要告知 workers 需要执行的测试用例对应的索引，而不用告知完整的测试用例信息
 
### 第四步：测试用例分发

`--dist-mode` 选项:

each：master 将完整的测试索引列表分发到每个 worker

load：master 将大约 25% 的测试用例以轮询的方式分发到各个 worker，剩余的测试用例则会等待 workers 执行完测试用例以后再分发

**注意**:
可以使用 `pytest_xdist_make_scheduler` 这个 hook 来实现自定义测试分发逻辑

### 第五步：测试用例的执行

+ workers 重写了 `pytest_runtestloop`：Pytest 的默认实现是循环执行所有在 test session 这个对象里面收集到的测试用例
+ 但是在 xdist 里, workers 实际上是等待 master 为其发送需要执行的测试用例
+ 当 worker 收到测试任务, 就顺序执行 `pytest_runtest_protocol` 
+ 值得注意的一个细节是：workers 必须始终保持至少一个测试用例在的任务队列里, 以兼容 `pytest_runtest_protocol（item, nextitem）hook` 的参数要求，为了将 nextitem 传给 hook
+ worker 会在执行最后一个测试项前等待 master 的更多指令
+ 如果它收到了更多测试项, 那么就可以安全的执行 `pytest_runtest_protocol`，因为这时 nextitem 参数已经可以确定
+ 如果它收到一个 `shutdown` 信号, 那么就将 nextitem 参数设为 None, 然后执行 `pytest_runtest_protocol`
 
### 第六步：测试用例再分发（--dist-mode=load）

+ 当 workers 开始/结束执行时，会把测试结果返回给 master，这样其他 Pytest hook 比如：`pytest_runtest_protocol` 就可以正常执行
+ master 在 worker 执行完一个测试后，基于测试执行时长以及每个 work 剩余测试用例综合决定是否向这个 worker 发送更多的测试用例
 
### 第七步：测试结束
+ 当 master 没有更多执行测试任务时，它会发送一个 “shutdown” 信号给所有 worker
+ 当 worker 将剩余测试用例执行完后退出进程
+ master 等待所有 worker 全部退出
+ 此时仍需要处理诸如 `pytest_runtest_logreport` 等事件

## 参考资料

[pytest-xdist](https://www.jianshu.com/p/4c3ffa2)

（完）