# Loop Controller

**界面**

右键 Add-->Logic Controller-->Loop Controller，添加 Loop Controller

![loop](./images/loop.png)

参数说明：

**Loop Count**：循环次数

+ Infinite：无限循环
+ 自定义次数：可自定义要循环的次数

**循环次数与线程组循环次数的关系**：

可以理解为**父子关系**

例子：

线程组的线程数设置为 2 ，循环次数设置为 1，循环控制器的循环次数设置为 3，为了查看结果方便，新增了个计数器

![loop1](./images/loop1.png)

上图结果可以看出，1 个线程会循环执行 3 次后，再去执行其他线程

如果循环控制器选择 Infinite 选项，线程会永远交替执行

![loop2](./images/loop3.png)

（完）