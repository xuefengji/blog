# kill/killall/pkill

## kill

+ 用于删除执行中的程序或工作
+ kill 可将指定的信息送至程序，预设的信息为 SIGTERM(15)，可将指定程序终止
+ 若仍无法终止该程序，可使用 SIGKILL(9) 信息尝试强制删除程序
+ 程序或工作的编号可利用 ps 指令或 jobs 指令查看

### 语法:

```bash
kill [-s <信息名称或编号>][程序]
或
kill [-l <信息编号>]
```

**参数说明**：

- -l <信息编号> ：若不加 <信息编号> 选项，则 -l 参数会列出全部的信息名称
- -s <信息名称或编号> ：指定要送出的信息。
- [程序] ：可以是程序的 PID 或是 PGID，也可以是工作编号

可以使用 `kill -l` 列出所有可用信号

常用的信号：

- 1 (HUP)：重新加载进程
- 9 (KILL)：杀死一个进程
- 15 (TERM)：正常停止一个进程

### 示例

#### 显示信号

```bash
# kill -l
1) SIGHUP     2) SIGINT     3) SIGQUIT     4) SIGILL     5) SIGTRAP
6) SIGABRT     7) SIGBUS     8) SIGFPE     9) SIGKILL    10) SIGUSR1
11) SIGSEGV    12) SIGUSR2    13) SIGPIPE    14) SIGALRM    15) SIGTERM
16) SIGSTKFLT    17) SIGCHLD    18) SIGCONT    19) SIGSTOP    20) SIGTSTP
21) SIGTTIN    22) SIGTTOU    23) SIGURG    24) SIGXCPU    25) SIGXFSZ
26) SIGVTALRM    27) SIGPROF    28) SIGWINCH    29) SIGIO    30) SIGPWR
31) SIGSYS    34) SIGRTMIN    35) SIGRTMIN+1    36) SIGRTMIN+2    37) SIGRTMIN+3
38) SIGRTMIN+4    39) SIGRTMIN+5    40) SIGRTMIN+6    41) SIGRTMIN+7    42) SIGRTMIN+8
43) SIGRTMIN+9    44) SIGRTMIN+10    45) SIGRTMIN+11    46) SIGRTMIN+12    47) SIGRTMIN+13
48) SIGRTMIN+14    49) SIGRTMIN+15    50) SIGRTMAX-14    51) SIGRTMAX-13    52) SIGRTMAX-12
53) SIGRTMAX-11    54) SIGRTMAX-10    55) SIGRTMAX-9    56) SIGRTMAX-8    57) SIGRTMAX-7
58) SIGRTMAX-6    59) SIGRTMAX-5    60) SIGRTMAX-4    61) SIGRTMAX-3    62) SIGRTMAX-2
63) SIGRTMAX-1    64) SIGRTMAX
```

#### 杀死进程

```bash
# kill 12345
```

#### 强制杀死进程

```bash
# kill -KILL 123456
```

#### 发送 SIGHUP 信号，可以使用一下信号

```bash
# kill -HUP pid
```

#### 彻底杀死进程

```bash
# kill -9 123456
```

#### 杀死指定用户所有进程

```bash
//方法一 过滤出 hnlinux 用户进程 
#kill -9 $(ps -ef | grep hnlinux) 
//方法二
#kill -u hnlinux 
```

## killall

+ 用于杀死一个进程，与 kill 不同的是它会杀死指定名字的所有进程
+ kill 命令杀死指定进程 PID，需要配合 ps 使用，而 killall 直接对进程对名字进行操作，更加方便

### 语法

```bash
 killall [选项]  name
```

**参数说明**：

name ： 进程名

选项包含如下几个参数：

- -e | --exact ： 进程需要和名字完全相符
- -I | --ignore-case ：忽略大小写
- -g | --process-group ：结束进程组
- -i | --interactive ：结束之前询问
- -l | --list ：列出所有的信号名称
- -q | --quite ：进程没有结束时，不输出任何信息
- -r | --regexp ：将进程名模式解释为扩展的正则表达式
- -s | --signal ：发送指定信号
- -u | --user ：结束指定用户的进程
- -v | --verbose ：显示详细执行过程
- -w | --wait ：等待所有的进程都结束
- -V |--version ：显示版本信息
- --help ：显示帮助信息

### 示例

```bash
# killall -9 php-fpm          //结束所有的 php-fpm 进程
```

## pkill

pkill 用于杀死一个进程，与 kill 不同的是它会杀死指定名字的所有进程，类似于 killall命令

### 语法

```bash
  pkill [选项]  name
```

**参数说明**：

name ： 进程名

选项包含如下几个参数：

- -P 指定父进程号发送信号
- -g 指定进程组
- -t 指定开启进程的终端
- -o 仅向找到的最小（起始）进程号发送信号 -n 仅向找到的最大（结束）进程号发送信号

### 示例

```
# pkill -9  php-fpm          //结束所有的 php-fpm 进程
```