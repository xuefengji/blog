# Jenkins 安装

## 安装前准备

+ 需要安装的软件
  + Java 8 (JRE 或 JDK 都可以)
+ 机器要求
  + 256 MB 内存，建议大于 512 MB
  + 10 GB 的硬盘空间

## 安装 Jenkins

**安装步骤**：

+ 下载地址：https://www.jenkins.io/download/

+ 选择 .war 文件下载
+ 下载完成后，进入下载目录，运行 ` java -jar jenkins.war --httpPort=8080  `
+ 打开浏览器进入链接 ` http://localhost:8080 `
+ 能成功打开链接时，即说明安装成功

## Jenkins 版本升级

**升级步骤**：

+ 根据上面的步骤下载想要升级的 war 包
+ 使用 `http://jenkinsIP:port/exit` 停止 Jenkins 服务
+ 找到 war 包路径，替换最新的 war 包
+ 使用 ` java -jar jenkins.war ` 启动 Jenkins服务

