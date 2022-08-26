# Jenkins 容器中搭建 Python+Pytest+Allure 环境

## 前言

需要了解 Docker 中搭建 Jenkins 环境，可参考 [Jenkins 应用安装](/basic-skills/docker/jenkins)

## 搭建 Python+Pytest+Allure 环境

### 前期准备

Jenkins 容器开启

使用 root 权限进入 Jenkins 容器中
```shell script
docker exec -it -uroot myjenkins /bin/bsah
```
更新容器的软件包
```shell script

# 获取最新的软件包
apt-get update

# 升级已安装的软件包
apt-get upgrade

# 提前安装，以便接下来的配置操作
apt-get -y install gcc automake autoconf libtool make
apt-get -y install make*
apt-get -y install zlib*
apt-get -y install openssl libssl-dev
apt-get install sudo
```

### 安装 Python 环境

#### 下载 Python

```shell script
cd /usr/local/src
wget https://www.python.org/ftp/python/3.9.10/Python-3.9.10.tgz
tar -zxvf Python-3.9.10.tgz
mv Python-3.9.10 py3.9
```

::: tip 注意

如果容器中没有 wget 命令，可以使用 apt-get 命令安装即可

:::

#### make 编译安装

在 `/usr/local/src/py3.9` 安装目录下执行下面的命令
```shell script
cd py3.9
./configure --prefix=/usr/local/src/py3.6
make && make install
```

#### 添加软连接

添加 Python3 的软连接
```shell script
ln -s /usr/local/src/py3.9/bin/python3.9 /usr/bin/python3
```
添加 pip3 的软连接
```shell script
ln -s /usr/local/src/py3.9/bin/pip3 /usr/bin/pip3
```

#### 验证 Python3 环境
```shell script
root@92d5bc74c71d:/usr/local/src/py3.9# python3
Python 3.9.10 (main, Apr 23 2022, 06:54:19) 
[GCC 10.2.1 20210110] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> ^Z
[2]+  Stopped                 python3
root@92d5bc74c71d:/usr/local/src/py3.9# pip3

Usage:   
  pip3 <command> [options]

```
#### 安装相应的库

将 Python 项目中生成的 requirement.txt 复制到容器的 `/usr/local/src` 目录下
```shell script
docker cp requirement.txt jenkins1:/usr/local/src 
```
通过 requirement.txt 安装
```shell script
pip3 install -r requirement.txt
```

### 安装 Allure 环境

#### 下载 Allure 安装包

官网下载：https://github.com/allure-framework/allure2/releases

自己可以选择一个 tgz 版本进行下载

#### 将压缩包传送到容器内
+ 下载完成后，先将下载的安装包传送到服务器上
```shell script
rz -b
```
+ 将服务器上的安装包复制到容器内，并解压
```shell script
docker cp allure-2.17.3.tgz myjenkins:/usr/local/src

tar -zxvf allure-2.17.3.tgz
```
+ 给该文件赋予最高权限
```shell script
mv allure-2.17.3 allure
chmod -R 777 allure
```

#### 配置 allure 和 py 环境变量

```shell script
cat >> /root/.bashrc << "EOF" 
export PATH=/usr/local/src/allure/bin:$PATH 
export PATH=/usr/local/src/py3.6/bin:$PATH 
EOF
```

重新加载环境
```shell script
source /root/.bashrc
```

验证环境
```shell script
allure --version
python3 --version
```

### 配置 JDK 环境

查看 JDK 环境

```shell script
export

root@92d5bc74c71d:/usr/local/src# export
declare -x COPY_REFERENCE_FILE_LOG="/var/jenkins_home/copy_reference_file.log"
declare -x HOME="/root"
declare -x HOSTNAME="92d5bc74c71d"
declare -x JAVA_HOME="/opt/java/openjdk"
declare -x JENKINS_HOME="/var/jenkins_home"
declare -x JENKINS_INCREMENTALS_REPO_MIRROR="https://repo.jenkins-ci.org/incrementals"
declare -x JENKINS_SLAVE_AGENT_PORT="50000"
declare -x JENKINS_UC="https://updates.jenkins.io"
declare -x JENKINS_UC_EXPERIMENTAL="https://updates.jenkins.io/experimental"
declare -x JENKINS_VERSION="2.328"
declare -x LANG="C.UTF-8"
declare -x OLDPWD="/usr/local/src/allure-2.17.3"
declare -x PATH="/usr/local/src/py3.9/bin:/usr/local/src/allure/bin:/opt/java/openjdk/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
declare -x PWD="/usr/local/src"
declare -x REF="/usr/share/jenkins/ref"
declare -x SHLVL="1"
declare -x TERM="xterm"

```

这里可以看到很多容器本身自带的环境变量
+ Jenkins 的版本
+ JDK 的安装路径

配置 JDK 环境变量
```shell script
cat >> /root/.bashrc<< "EOF" 
export PATH=$JAVA_HOME/bin:$PATH 
EOF
```
重新加载环境
```shell script
source /root/.bashrc
```

（完）