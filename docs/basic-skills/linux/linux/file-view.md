# 常用文件查看命令

Linux 系统中使用以下命令来查看文件的内容：

+ cat 由第一行开始显示文件内容
+ tac 从最后一行开始显示，可以看出 tac 是 cat 的倒着写
+ nl  显示的时候，顺道输出行号
+ more 一页一页的显示文件内容
+ less 与 more 类似，但是比 more 更好的是，可以往前翻页
+ head 只看头几行
+ tail 只看尾巴几行

你可以使用 man [命令]来查看各个命令的使用文档，如 ：man cp。

## cat 

由第一行开始显示文件内容

**语法**：
```shell script
cat [-AbEnTv]
```

**选项与参数**：
+ -A ：相当於 -vET 的整合选项，可列出一些特殊字符而不是空白而已
+ -b ：列出行号，仅针对非空白行做行号显示，空白行不标行号
+ -E ：将结尾的断行字节 $ 显示出来
+ -n ：列印出行号，连同空白行也会有行号，与 -b 的选项不同
+ -T ：将 [tab] 按键以 ^I 显示出来
+ -v ：列出一些看不出来的特殊字符

**示例**：
```shell script
# 查看网络配置: 文件地址 /etc/sysconfig/network-scripts/
[root@VM-16-7-centos ~]# cat /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
BOOTPROTO=dhcp
ONBOOT=yes
```

## tac

tac 与 cat命令刚好相反，文件内容从最后一行开始显示，可以看出 tac 是 cat 的倒着写！如：

```shell script
[root@VM-16-7-centos ~]# tac /etc/sysconfig/network-scripts/ifcfg-eth0
ONBOOT=yes
BOOTPROTO=dhcp
DEVICE=eth0
```

## nl  

显示行号

**语法**：
```shell script
nl [-bnw] 文件
```
**选项与参数**：
+ -b ：指定行号指定的方式，主要有两种：
    + -b a ：表示不论是否为空行，也同样列出行号(类似 cat -n)
    + -b t ：如果有空行，空的那一行不要列出行号(默认值)
+ -n ：列出行号表示的方法，主要有三种：
    + -n ln ：行号在荧幕的最左方显示
    + -n rn ：行号在自己栏位的最右方显示，且不加 0 
    + -n rz ：行号在自己栏位的最右方显示，且加 0 
+ -w ：行号栏位的占用的位数

**示例**：
```shell script
[root@VM-16-7-centos ~]# nl /etc/sysconfig/network-scripts/ifcfg-eth0
1DEVICE=eth0
2BOOTPROTO=dhcp
3ONBOOT=yes
```

## more  

一页一页翻动

在 more 这个程序的运行过程中，你有几个按键可以按的：

+ 空白键 (space)：代表向下翻一页
+ Enter     ：代表向下翻『一行』
+ /字串     ：代表在这个显示的内容当中，向下搜寻『字串』这个关键字
+ :f      ：立刻显示出档名以及目前显示的行数
+ q       ：代表立刻离开 more ，不再显示该文件内容
+ b 或 [ctrl]-b ：代表往回翻页，不过这动作只对文件有用，对管线无用。

```shell script
[root@VM-16-7-centos etc]# more /etc/csh.login
....(中间省略)....
--More--(28%) # 重点在这一行喔！你的光标也会在这里等待你的命令
```

## less   

一页一页翻动，以下实例输出 /etc/man.config 文件的内容：

less 运行时可以输入的命令有：
+ 空白键  ：向下翻动一页
+ [pagedown]：向下翻动一页
+ [pageup] ：向上翻动一页
+ /字串 ：向下搜寻『字串』的功能
+ ?字串 ：向上搜寻『字串』的功能
+ n ：重复前一个搜寻 (与 / 或 ? 有关！)
+ N ：反向的重复前一个搜寻 (与 / 或 ? 有关！)
+ q ：离开 less 这个程序；

```shell script
[root@VM-16-7-centos etc]# more /etc/csh.login
....(中间省略)....
:   # 这里可以等待你输入命令！
```

## head  

取出文件前面几行

**语法**：
```shell script
head [-n number] 文件
```
**选项与参数**：

-n 后面接数字，代表显示几行的意思

默认显示前面 10 行，若要显示前 20 行，需要指定行数：

```shell script
[root@VM-16-7-centos etc]# head -n 20 /etc/csh.login

```

## tail  

取出文件后面几行

**语法**：
```shell script
tail [-n number] 文件
```
**选项与参数**：

-n ：后面接数字，代表显示几行的意思

默认显示最后 10 行！若要显示最后 20 行，需要指定行数：
```shell script
[root@VM-16-7-centos etc]# tail -n 20 /etc/csh.login
```

