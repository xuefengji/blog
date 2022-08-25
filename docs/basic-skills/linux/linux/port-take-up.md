# 查看端口占用情况

## losf 命令

**语法格式**：

```
lsof -i:端口号
```

示例：

```
# lsof -i:8000
COMMAND   PID USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
nodejs  26993 root   10u  IPv4 37999514      0t0  TCP *:8000 (LISTEN)
```

![img](./images/lsof.png)

**注意**：losf -i 需要 root 用户的权限来执行

**其他常用的命令**：

```
lsof -i:8080：查看8080端口占用
lsof abc.txt：显示开启文件abc.txt的进程
lsof -c abc：显示abc进程现在打开的文件
lsof -c -p 1234：列出进程号为1234的进程所打开的文件
lsof -g gid：显示归属gid的进程情况
lsof +d /usr/local/：显示目录下被进程开启的文件
lsof +D /usr/local/：同上，但是会搜索目录下的目录，时间较长
lsof -d 4：显示使用fd为4的进程
lsof -i -U：显示所有打开的端口和UNIX domain文件
```

## netstat 命令

**语法格式**：

```
netstat -tnlp | grep 端口号
```

**常见参数**：

| 参数 | 说明                             |
| ---- | -------------------------------- |
| -t   | 显示 tcp 相关协议的端口情况      |
| -u   | 显示 udp 相关协议的端口情况      |
| -n   | 不显示别名，显示 IP 地址         |
| -l   | 仅列出除与 listen 状态的服务状态 |
| -p   | 显示建立相关链接的程序名         |
| -a   | 显示所有的端口信息               |

示例：

```
# netstat -tunlp | grep 8000
tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN      26993/nodejs  
```

