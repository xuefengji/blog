# Linux 链接

Linux 链接分两种，一种被称为硬链接（Hard Link），另一种被称为符号链接（Symbolic Link）

## 硬链接

### 什么是硬链接

+ 硬链接指通过索引节点来进行连接
+ 在 Linux 的文件系统中，保存在磁盘分区中的文件不管是什么类型都给它分配一个编号，称为索引节点号(Inode Index)
+ 在 Linux 中，多个文件名指向同一索引节点是存在的

### 为什么要使用硬链接

允许一个文件拥有多个有效路径名，这样用户就可以建立硬连接到重要文件，以防止“误删”的功能

例如：

A 是 B 的硬链接（A 和 B 都是文件名）

+ A 的目录项中的 inode 节点号与 B 的目录项中的 inode 节点号相同
+ 一个 inode 节点对应两个不同的文件名，两个文件名指向同一个文件，A 和 B 对文件系统来说是完全平等的
+ 删除其中任何一个都不会影响另外一个的访问
+ 当所有硬链接被删除后，文件才会被真正删除

### 语法

使用 ln 命令
```shell script
[root@VM-16-7-centos home]# ln f1 f2
```

## 软链接

### 什么是软链接

+ 软链接文件有类似于 Windows 的快捷方式
+ 实际上是一个特殊的文件
+ 包含的有另一文件的位置信息

例如：

A 是 B 的软链接（A 和 B 都是文件名）

+ A 的目录项中的 inode 节点号与 B 的目录项中的 inode 节点号不相同
+ A 和 B 指向的是两个不同的 inode，继而指向两块不同的数据块
+ A 的数据块中存放的只是 B 的路径名（可以根据这个找到 B 的目录项）
+ A 和 B 之间是“主从”关系，如果 B 被删除了，A 仍然存在（因为两个是不同的文件），但指向的是一个无效的链接

### 语法

使用 ln -s 命令
```shell script
[root@VM-16-7-centos home]# ln -s f1 f2
```

## 示例
```shell script
[root@VM-16-7-centos /]# cd /home
[root@VM-16-7-centos home]# touch f1 # 创建一个测试文件f1
[root@VM-16-7-centos home]# ls
f1
[root@VM-16-7-centos home]# ln f1 f2     # 创建f1的一个硬连接文件f2
[root@VM-16-7-centos home]# ln -s f1 f3   # 创建f1的一个符号连接文件f3
[root@VM-16-7-centos home]# ls -li       # -i参数显示文件的inode节点信息
397247 -rw-r--r-- 2 root root     0 Mar 13 00:50 f1
397247 -rw-r--r-- 2 root root     0 Mar 13 00:50 f2
397248 lrwxrwxrwx 1 root root     2 Mar 13 00:50 f3 -> f1
```
+ 硬连接文件 f2 与原文件 f1 的 inode 节点相同，均为 397247
+ 软连接文件的 inode 节点不同

```shell script
# echo 字符串输出 >> f1 输出到 f1文件
[root@VM-16-7-centos home]# echo "I am f1 file" >>f1
[root@VM-16-7-centos home]# cat f1
I am f1 file
[root@VM-16-7-centos home]# cat f2
I am f1 file
[root@VM-16-7-centos home]# cat f3
I am f1 file
[root@VM-16-7-centos home]# rm -f f1
[root@VM-16-7-centos home]# cat f2
I am f1 file
[root@VM-16-7-centos home]# cat f3
cat: f3: No such file or directory
```
结论：

+ 删除符号连接 f3,对 f1,f2 无影响
+ 删除硬连接 f2，对 f1,f3 也无影响
+ 删除原文件 f1，对硬连接 f2 没有影响，导致符号连接 f3 失效
+ 同时删除原文件 f1,硬连接 f2，整个文件会真正的被删除