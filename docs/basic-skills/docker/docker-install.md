# Docker 安装

## Linux 环境安装

**版本**: centos 7 

**kernel 版本**: 3.10 及以上版本，查看命令：`uname -r`

**安装步骤**：

+ 使用 sudo 或 root 权限的用户登录
+ 如果有旧版本，卸载版本，如果没有旧版本，此步骤可略过

  ```
  yum remove docker
             docker-client
             docker-client-latest
             docker-common
             docker-latest
             docker-latest-logrotate
             docker-logrotate
             docker-engine                      
  ```

+ 安装需要的软件包

  ```
  #yum-util提供yum-config-manager功能
  #另外两个是devicemapper驱动依赖的
  $ yum install -y yum-utils 
                   device-mapper-persistent-data 
                   lvm2
  
  ```

+ 设置 yum 源

  ```
  $ yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  ```

+ 安装 Docker

  + 安装最新版

    ```
    $ yum install -y docker-ce
    ```

  + 安装指定版本

    ```
    #查询版本列表
    $ yum list docker-ce --showduplicates | sort -r
    已加载插件：fastestmirror, langpacks
    已安装的软件包
    可安装的软件包
     * updates: mirrors.163.com
    Loading mirror speeds from cached hostfile
     * extras: mirrors.163.com
    docker-ce.x86_64            17.09.1.ce-1.el7.centos            docker-ce-stable
    docker-ce.x86_64            17.09.0.ce-1.el7.centos            docker-ce-stable
    ...
    #指定版本安装(这里的例子是安装上面列表中的第二个)
    $ yum install -y docker-ce-17.09.0.ce
    
    ```

+ 启动 Docker

  ```
  $ systemctl start docker.service
  ```

+ 验证是否安装成功(有 client 和 server 两部分表示安装启动成功)

  ```
  $ docker version
  Client: Docker Engine - Community
   Version:           20.10.7
   API version:       1.41
   Go version:        go1.13.15
   Git commit:        f0df350
   Built:             Wed Jun  2 11:58:10 2021
   OS/Arch:           linux/amd64
   Context:           default
   Experimental:      true
  
  Server: Docker Engine - Community
   Engine:
    Version:          20.10.7
    API version:      1.41 (minimum version 1.12)
    Go version:       go1.13.15
    Git commit:       b0f5bc3
    Built:            Wed Jun  2 11:56:35 2021
    OS/Arch:          linux/amd64
    Experimental:     false
   containerd:
    Version:          1.4.6
    GitCommit:        d71fcd7d8303cbf684402823e425e9dd2e99285d
   runc:
    Version:          1.0.0-rc95
    GitCommit:        b9ee9c6314599f1b4a7f497e1f1f856fe433d3b7
   docker-init:
    Version:          0.19.0
    GitCommit:        de40ad0
  ```

  
## 参考资料

[官方安装文档](https://docs.docker.com/engine/install/centos/)

（完）