# DockerFile

## 什么是 DockerFile

+ 用来构建 docker 镜像的构建文件
+ 就是命令脚本

## 构建步骤

+ 编写一个 DockerFile 文件
+ docker build 构建成为一个镜像
+ docker run 运行镜像
+ docker push 发布镜像（DockerHub 、阿里云仓库)

## DockerFile 构建过程

+ 每个保留关键字(指令）都是必须是大写字母
+ 执行从上到下顺序
+ `#`表示注释
+ 每一个指令都会创建提交一个新的镜像层，并提交

## DockerFile 优势

+ DockerFile 是面向开发的，以后要发布项目，做镜像，就需要编写 DockerFile 文件
+ Docker 镜像逐渐成企业交付的标准，必须要掌握
+ DockerFile 构建镜像文件，定义了一切的步骤，源代码
+ Dockerfile 的体积小，容易进行快速迁移部署
+ 环境构建流程记录在 DockerFile 中，能够直观的看到镜像构建的顺序和逻辑
+ Docker Images 通过 DockerFile 构建生成的镜像，最终发布和运行产品
+ Docker 容器，镜像运行起来提供服务

## 常用指令

| 指令 |	说明 |
|-------------------|-------------------|
| FROM	| 指明当前的镜像基于哪个镜像构建 |
| ARG	| 定义构建镜像过程中使用的变量 |
| LABEL	| 标记镜像信息，添加元数据|
| EXPOSE	| 暴露 Docker 容器在运行时监听指定的网络端口 |
| ENV	| 指定环境变量 |
| ENTRYPOINT	| 指定镜像的默认入口命令 |
| VOLUME	| 创建一个数据卷挂载点 |
| USER	| 指定运行容器时的用户名或 UID |
| WORKDIR	| 配置工作目录 |
| RUN	| 运行指定命令 |
| CMD	| 启动容器时指定默认执行的命令 |
| ADD	| 添加内容到镜像 |
| COPY	| 复制内容到镜像 |
| ONBUILD	| 创建子镜像时指定自动执行的操作指令 |
| STOPSIGNAL | 	指定退出的信号值 |
| HEALTHCHECK |	配置启动容器如何进行健康检查 |
| SHELL 	| 指定默认 shell 类型 |


## 示例

构建含有 ifconfig 、vim 命令的 centos

DockerFile 内容：
```shell script
FROM centos
MAINTAINER snowji<123456789@qq.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install net-tools   

EXPOSE 80

CMD echo $MYPATH
CMD echo "-----end-----"
CMD /bin/bash
```
build 结束后，进入容器使用 `ifconfig` 命令
```shell script
[root@1afccfd13f3d local]# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 127.0.0.1  netmask 255.255.0.0  broadcast 127.0.0.2
        ether 02:42:xx:xx:00:03  txqueuelen 0  (Ethernet)
        RX packets 7  bytes 586 (586.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
可以使用 `ifconfig` 命令查看网络信息

（完）