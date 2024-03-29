# 常用目录操作命令

## 目录管理

+  Linux 的目录结构为树状结构，最顶级的目录为根目录 /

+ 其他目录通过挂载可以将它们添加到树中，通过解除挂载可以移除它们

### 绝对路径：

路径的写法，由根目录 / 写起，例如：`/usr/share/doc` 这个目录

### 相对路径：

+ 路径的写法，不是由 / 写起

+ 例如由 `/usr/share/doc` 要到 `/usr/share/man` 底下时，可以写成：`cd ../man` 这就是相对路径的写法啦

## 处理目录的常用命令

接下来我们就来看几个常见的处理目录的命令吧：

- ls: 列出目录
- cd：切换目录
- pwd：显示目前的目录
- mkdir：创建一个新的目录
- rmdir：删除一个空的目录
- cp: 复制文件或目录
- rm: 移除文件或目录
- mv: 移动文件与目录，或修改文件与目录的名称

你可以使用 *man [命令]* 来查看各个命令的使用文档，如 ：man cp

### ls （列出目录）

在 Linux 系统当中，`ls` 命令可能是最常被运行的

**语法**：

```shell
[root@www ~]# ls [-aAdfFhilnrRSt] 目录名称
```

**选项与参数**：

- -a ：全部的文件，连同隐藏文件( 开头为 . 的文件) 一起列出来(常用)
- -l ：长数据串列出，包含文件的属性与权限等等数据(常用)

将目录下的所有文件列出来(含属性与隐藏档)

```shell
[root@www ~]# ls -al ~
```

### cd （切换目录）

cd 是 Change Directory 的缩写，这是用来变换工作目录的命令

**语法**：

```shell
cd [相对路径或绝对路径]
```

**示例**：

```shell
# 切换到用户目录下
[root@VM-16-7-centos /]# cd home  

# 使用 mkdir 命令创建 kuangstudy 目录
[root@VM-16-7-centos home]# mkdir kuangstudy

# 进入 kuangstudy 目录
[root@VM-16-7-centos home]# cd kuangstudy

# 回到上一级
[root@VM-16-7-centos kuangstudy]# cd ..

# 回到根目录
[root@VM-16-7-centos kuangstudy]# cd /

# 表示回到自己的家目录，亦即是 /root 这个目录
[root@VM-16-7-centos kuangstudy]# cd ~
```

### pwd ( 显示目前所在的目录 )

`pwd` 是 **Print Working Directory** 的缩写，也就是显示目前所在目录的命令

**语法**：

```shell
[root@VM-16-7-centos kuangstudy]#pwd [-P]
```

**选项与参数**：

-P ：显示出确实的路径，而非使用连接(link) 路径

**示例**：

```shell
# 单纯显示出目前的工作目录
[root@VM-16-7-centos ~]# pwd
/root

# 如果是链接，要显示真实地址，可以使用 -P参数
[root@VM-16-7-centos /]# cd bin
[root@VM-16-7-centos bin]# pwd -P
/usr/bin
```

### mkdir （创建新目录）

如果想要创建新的目录的话，可以使用 `mkdir` (make directory)

**语法**：

```shell
mkdir [-mp] 目录名称
```

**选项与参数**：

- -m ：配置文件的权限，直接配置，不需要看默认权限 (umask) 
- -p ：可以将所需要的目录(包含上一级目录)递归创建起来

**示例**：

```shell
# 进入我们用户目录下
[root@VM-16-7-centos /]# cd /home

# 创建一个 test 文件夹
[root@VM-16-7-centos home]# mkdir test

# 创建多层级目录
[root@VM-16-7-centos home]# mkdir test1/test2/test3/test4
mkdir: cannot create directory ‘test1/test2/test3/test4’:
No such file or directory  # <== 没办法直接创建此目录啊！

# 加了这个 -p 的选项，可以自行帮你创建多层目录！
[root@VM-16-7-centos home]# mkdir -p test1/test2/test3/test4

# 创建权限为 rwx--x--x 的目录。
[root@VM-16-7-centos home]# mkdir -m 711 test2
[root@VM-16-7-centos home]# ls -l
drwxr-xr-x 2 root root  4096 Mar 12 21:55 test
drwxr-xr-x 3 root root  4096 Mar 12 21:56 test1
drwx--x--x 2 root root  4096 Mar 12 21:58 test2
```

### rmdir ( 删除空的目录 )

**语法**：

```shell
rmdir [-p] 目录名称
```

**选项与参数**：

-p ：连同上一级『空的』目录也一起删除

**示例**：

```shell
# 看看有多少目录存在
[root@VM-16-7-centos home]# ls -l
drwxr-xr-x 2 root root  4096 Mar 12 21:55 test
drwxr-xr-x 3 root root  4096 Mar 12 21:56 test1
drwx--x--x 2 root root  4096 Mar 12 21:58 test2

# 可直接删除掉，没问题
[root@VM-16-7-centos home]# rmdir test

# 因为尚有内容，所以无法删除！
[root@VM-16-7-centos home]# rmdir test1
rmdir: failed to remove ‘test1’: Directory not empty

# 利用 -p 这个选项，立刻就可以将 test1/test2/test3/test4 依次删除。
[root@VM-16-7-centos home]# rmdir -p test1/test2/test3/test4
```

::: tip 注意

+  `rmdir` 仅能删除空的目录

+ 非空目录可以使用 `rm` 命令来删除

:::

### cp ( 复制文件或目录 )

**语法**：

```shell 
[root@www ~]# cp [-adfilprsu] 来源档(source) 目标档(destination)
[root@www ~]# cp [options] source1 source2 source3 .... directory
```

**选项与参数**：

- -a：相当於 -pdr 的意思，至於 pdr 请参考下列说明(常用)
- -p：连同文件的属性一起复制过去，而非使用默认属性(备份常用)
- -d：若来源档为连结档的属性(link file)，则复制连结档属性而非文件本身
- -r：递归持续复制，用於目录的复制行为(常用)
- -f：为强制(force) 的意思，若目标文件已经存在且无法开启，则移除后再尝试一次
- -i：若目标档(destination) 已经存在时，在覆盖时会先询问动作的进行(常用)
- -l：进行硬式连结(hard link) 的连结档创建，而非复制文件本身
- -s：复制成为符号连结档 (symbolic link)，亦即『捷径』文件
- -u：若 destination 比 source 旧才升级 destination 

**示例**：

```shell
# 找一个有文件的目录，我这里找到 root目录
[root@VM-16-7-centos home]# cd /root
[root@VM-16-7-centos ~]# ls
install.sh
[root@VM-16-7-centos ~]# cd /home

# 复制 root目录下的install.sh 到 home目录下
[root@VM-16-7-centos home]# cp /root/install.sh /home
[root@VM-16-7-centos home]# ls
install.sh

# 再次复制，加上-i参数，增加覆盖询问？
[root@VM-16-7-centos home]# cp -i /root/install.sh /home
cp: overwrite ‘/home/install.sh’? y # n不覆盖，y为覆盖
```

### rm ( 移除文件或目录 )

**语法**：

```shell
rm [-fir] 文件或目录
```

**选项与参数**：

- -f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
- -i ：互动模式，在删除前会询问使用者是否动作
- -r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！

**示例**：

```shell
# 将刚刚在 cp 的实例中创建的 install.sh删除掉！
[root@VM-16-7-centos home]# rm -i install.sh
rm: remove regular file ‘install.sh’? y
# 如果加上 -i 的选项就会主动询问喔，避免你删除到错误的档名！

# 尽量不要在服务器上使用 rm -rf /
```

### mv  ( 移动文件与目录，或修改名称 )

**语法**：

```shell
[root@www ~]# mv [-fiu] source destination
[root@www ~]# mv [options] source1 source2 source3 .... directory
```

**选项与参数**：

- -f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖
- -i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖
- -u ：若目标文件已经存在，且 source 比较新，才会升级 (update)

**示例**：

```shell
# 复制一个文件到当前目录
[root@VM-16-7-centos home]# cp /root/install.sh /home

# 创建一个文件夹 test
[root@VM-16-7-centos home]# mkdir test

# 将复制过来的文件移动到我们创建的目录，并查看
[root@VM-16-7-centos home]# mv install.sh test
[root@VM-16-7-centos home]# ls
test
[root@VM-16-7-centos home]# cd test
[root@VM-16-7-centos test]# ls
install.sh

# 将文件夹重命名，然后再次查看！
[root@VM-16-7-centos test]# cd ..
[root@VM-16-7-centos home]# mv test mvtest
[root@VM-16-7-centos home]# ls
mvtest
```